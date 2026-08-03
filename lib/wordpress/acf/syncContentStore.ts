import { upsertCarreraContent } from "@/lib/content/carreras-data";
import { upsertFacultadContent } from "@/lib/content/facultades-data";
import {
  mapCarreraFromAcf,
  mapEnlacesInteresFromCpt,
  mapFacultadFromAcf,
  mapInicioPaginaFromAcf,
  mapNoticiaPost,
  mapNoticiaPostToProyecto,
  mapPersonalPostToAdministrativo,
  mapPersonalPostToComisionProfile,
  mapPersonalPostToDecanatoProfile,
  mapPersonalPostToDireccionCarreraProfile,
  mapPersonalPostToDocente,
  mapRedesSocialesFromCpt,
  mapSemestrePostsToPlanEstudios,
  mergeCarreraFromInicioPagina,
} from "@/lib/wordpress/acf/mappers";
import {
  getCarreraAcfEntry,
  getEnlacesInteres,
  getFacultadAcfEntry,
  getNoticiasCpt,
  getPersonalByTipo,
  getRedesSociales,
  getSemestres,
  resolveInicioPaginaImages,
  resolveMediaUrl,
  resolveNoticiaImages,
  resolvePersonalPostImages,
} from "@/lib/wordpress/acf/repository";
import type { CarreraAcfSchema } from "@/lib/wordpress/acf/types";
import type { FacultadContent } from "@/types/facultad-content";
import type { CarreraContent } from "@/types/carrera-content";

const withImages = async <T>(
  posts: Awaited<ReturnType<typeof getPersonalByTipo>>,
  mapper: (post: (typeof posts)[0], images: Record<string, string>) => T,
): Promise<T[]> =>
  Promise.all(
    posts.map(async (post) => {
      const images = await resolvePersonalPostImages(post);
      return mapper(post, images);
    }),
  );

export const syncPersonalFacultadFromCpt = async (
  content: FacultadContent,
): Promise<FacultadContent> => {
  const [decanatoPosts, direccionCarreraPosts, comisionesPosts, adminPosts, serviciosPosts] =
    await Promise.all([
      getPersonalByTipo("decano"),
      getPersonalByTipo("direccion-carrera"),
      getPersonalByTipo("comision"),
      getPersonalByTipo("administrativo"),
      getPersonalByTipo("servicios"),
    ]);

  const result = { ...content };

  if (decanatoPosts.length > 0) {
    result.decanato = {
      ...result.decanato,
      profiles: await withImages(decanatoPosts, mapPersonalPostToDecanatoProfile),
    };
  }

  if (direccionCarreraPosts.length > 0) {
    result.direccionCarrera = {
      ...result.direccionCarrera,
      profiles: await withImages(direccionCarreraPosts, mapPersonalPostToDireccionCarreraProfile),
    };
  }

  if (comisionesPosts.length > 0) {
    result.comisiones = {
      ...result.comisiones,
      profiles: await withImages(comisionesPosts, mapPersonalPostToComisionProfile),
    };
  }

  const todosAdminItems = [
    ...await withImages(adminPosts, mapPersonalPostToAdministrativo),
    ...await withImages(serviciosPosts, mapPersonalPostToAdministrativo),
  ];

  if (todosAdminItems.length > 0) {
    result.administracionServicios = {
      ...result.administracionServicios,
      groups: [{ title: "Personal Administrativo y de Servicios", items: todosAdminItems }],
    };
  }

  return result;
};

export const syncDocentesFromCpt = async (
  content: CarreraContent,
  facultadSlug = "arquitectura",
): Promise<CarreraContent> => {
  const [docentesPosts, semestresPosts] = await Promise.all([
    getPersonalByTipo("docentes"),
    getSemestres(),
  ]);

  let result = { ...content };

  if (docentesPosts.length > 0) {
    const docentes = await withImages(docentesPosts, mapPersonalPostToDocente);
    result = { ...result, docentes, personal: { ...result.personal, docentes } };
  }

  if (semestresPosts.length > 0) {
    result = {
      ...result,
      planEstudios: await mapSemestrePostsToPlanEstudios(semestresPosts, result.planEstudios),
    };
  }

  return result;
};

export const syncNoticiasFromCpt = async (
  content: CarreraContent,
  facultadSlug = "arquitectura",
): Promise<CarreraContent> => {
  const posts = await getNoticiasCpt();

  if (posts.length === 0) return content;

  const [noticias, proyectosItems] = await Promise.all([
    Promise.all(
      posts.map(async (post) => {
        const images = await resolveNoticiaImages(post);
        return mapNoticiaPost(post, images);
      }),
    ),
    Promise.all(posts.map((post) => mapNoticiaPostToProyecto(post, facultadSlug))),
  ]);

  return {
    ...content,
    noticias,
    proyectos: { ...content.proyectos, items: proyectosItems },
  };
};

const applyInicioPaginaFromAcf = async (
  acf: CarreraAcfSchema,
  content: CarreraContent,
): Promise<CarreraContent> => {
  const images = await resolveInicioPaginaImages(acf);
  const inicioPagina = await mapInicioPaginaFromAcf(acf, images);
  return { ...content, inicioPagina };
};

export const syncFacultadContentFromAcf = async (facultadSlug: string) => {
  const entry = await getFacultadAcfEntry(facultadSlug);

  const getBase = async () => {
    if (!entry?.acf?.content) {
      const { FACULTADES_CONTENT } = await import("@/lib/content/facultades-data");
      const existing = FACULTADES_CONTENT[facultadSlug];
      if (!existing) throw new Error(`Sin contenido base para facultad "${facultadSlug}".`);
      return existing;
    }
    return mapFacultadFromAcf(entry);
  };

  let result = await getBase();
  result = await syncPersonalFacultadFromCpt(result);

  // Carga redes sociales desde el CPT redsocial
  const [redesPosts, enlacesPosts] = await Promise.all([
    getRedesSociales().catch(() => []),
    getEnlacesInteres().catch(() => []),
  ]);

  if (redesPosts.length > 0) {
    result = {
      ...result,
      footer: {
        ...result.footer,
        socialLinks: mapRedesSocialesFromCpt(redesPosts),
      },
    };
  }

  // Reemplaza el grupo "Enlaces de interés" del mock con los del CPT
  if (enlacesPosts.length > 0) {
    const enlacesGroup = mapEnlacesInteresFromCpt(enlacesPosts);
    const gruposActualizados = result.footer.groups.map((g) =>
      g.title.toLowerCase().includes("enlaces") ? enlacesGroup : g,
    );
    // Si no existía el grupo, lo añade
    const tieneEnlaces = result.footer.groups.some((g) =>
      g.title.toLowerCase().includes("enlaces"),
    );
    result = {
      ...result,
      footer: {
        ...result.footer,
        groups: tieneEnlaces ? gruposActualizados : [enlacesGroup, ...result.footer.groups],
      },
    };
  }

  // Logos acreditadora y datos de footer desde la página ACF de carrera
  const carreraEntry = await getCarreraAcfEntry(facultadSlug, "arquitectura").catch(() => null);
  if (carreraEntry?.acf) {
    const acf = carreraEntry.acf;

    // Logo navbar (campo "logo")
    if (acf.logo) {
      const logoNavbar = await resolveMediaUrl(acf.logo);
      if (logoNavbar) {
        result = {
          ...result,
          header: { ...result.header, logoAcreditadoraNavbar: logoNavbar },
        };
      }
    }

    // Logo footer
    if (acf.logoacreditadorafooter) {
      const logoFooter = await resolveMediaUrl(acf.logoacreditadorafooter);
      if (logoFooter) {
        result = {
          ...result,
          footer: { ...result.footer, logoAcreditadoraFooter: logoFooter },
        };
      }
    }

    // Correo y ubicación del footer
    if (acf.correocarrera) {
      result = {
        ...result,
        footer: { ...result.footer, email: acf.correocarrera },
      };
    }
    if (acf.ubicacion) {
      result = {
        ...result,
        footer: { ...result.footer, location: acf.ubicacion },
      };
    }
    if (acf.aliadosestrategicos) {
      result = {
        ...result,
        footer: { ...result.footer, aliadosEstrategicos: acf.aliadosestrategicos },
      };
    }
    if (acf.copyright) {
      result = {
        ...result,
        footer: { ...result.footer, copyright: acf.copyright },
      };
    }
  }

  upsertFacultadContent(facultadSlug, result);
  return result;
};

export const syncCarreraContentFromAcf = async (facultadSlug: string, carreraSlug: string) => {
  const entry = await getCarreraAcfEntry(facultadSlug, carreraSlug);

  const { CARRERAS_CONTENT } = await import("@/lib/content/carreras-data");
  const key = `${facultadSlug}:${carreraSlug}`;
  const existing = CARRERAS_CONTENT[key];

  if (!existing) throw new Error(`Sin contenido base para carrera "${key}".`);

  let base = existing;
  if (entry !== null && entry.acf) {
    if (entry.acf.content) {
      base = mapCarreraFromAcf(entry);
    } else {
      base = await mergeCarreraFromInicioPagina(entry.acf, existing);
    }
  }

  const withDocentes = await syncDocentesFromCpt(base, facultadSlug);
  const withNoticias = await syncNoticiasFromCpt(withDocentes, facultadSlug);
  const withInicio = entry !== null && entry.acf
    ? await applyInicioPaginaFromAcf(entry.acf, withNoticias)
    : withNoticias;

  upsertCarreraContent(facultadSlug, carreraSlug, withInicio);
  return withInicio;
};

export const syncContextContentFromAcf = async (facultadSlug: string, carreraSlug: string) => {
  const [facultad, carrera] = await Promise.all([
    syncFacultadContentFromAcf(facultadSlug),
    syncCarreraContentFromAcf(facultadSlug, carreraSlug),
  ]);
  return { facultad, carrera };
};
