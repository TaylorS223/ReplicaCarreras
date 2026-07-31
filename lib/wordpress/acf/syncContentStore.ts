import { upsertCarreraContent } from "@/lib/content/carreras-data";
import { upsertFacultadContent } from "@/lib/content/facultades-data";
import {
  mapCarreraFromAcf,
  mapFacultadFromAcf,
  mapInicioPaginaFromAcf,
  mapNoticiaPost,
  mapPersonalPostToAdministrativo,
  mapPersonalPostToComisionProfile,
  mapPersonalPostToDecanatoProfile,
  mapPersonalPostToDireccionCarreraProfile,
  mapPersonalPostToDocente,
} from "@/lib/wordpress/acf/mappers";
import {
  getCarreraAcfEntry,
  getFacultadAcfEntry,
  getNoticiasCpt,
  getPersonalByTipo,
  resolveInicioPaginaImages,
  resolveNoticiaImages,
  resolvePersonalPostImages,
} from "@/lib/wordpress/acf/repository";
import type { FacultadContent } from "@/types/facultad-content";
import type { CarreraContent } from "@/types/carrera-content";

// Resuelve imágenes de cada post (pueden ser IDs numéricos) antes de mapear
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

// Carga el personal del CPT e inyecta en el contenido de facultad
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

// Carga los docentes del CPT e inyecta en el contenido de carrera
export const syncDocentesFromCpt = async (
  content: CarreraContent,
): Promise<CarreraContent> => {
  const docentesPosts = await getPersonalByTipo("docentes");

  if (docentesPosts.length === 0) {
    return content;
  }

  const docentes = await withImages(docentesPosts, mapPersonalPostToDocente);

  return {
    ...content,
    docentes,
    personal: {
      ...content.personal,
      docentes,
    },
  };
};

export const syncNoticiasFromCpt = async (
  content: CarreraContent,
): Promise<CarreraContent> => {
  const posts = await getNoticiasCpt();

  if (posts.length === 0) {
    return content;
  }

  const noticias = await Promise.all(
    posts.map(async (post) => {
      const images = await resolveNoticiaImages(post);
      return mapNoticiaPost(post, images);
    }),
  );

  return { ...content, noticias };
};

// Carga los campos ACF de inicio desde el entry de carrera ya cargado e inyecta en el contenido
const applyInicioPaginaFromAcf = async (
  acf: NonNullable<Awaited<ReturnType<typeof getCarreraAcfEntry>>["acf"]>,
  content: CarreraContent,
): Promise<CarreraContent> => {
  const images = await resolveInicioPaginaImages(acf);
  const inicioPagina = await mapInicioPaginaFromAcf(acf, images);
  return { ...content, inicioPagina };
};

export const syncFacultadContentFromAcf = async (facultadSlug: string) => {
  const entry = await getFacultadAcfEntry(facultadSlug);

  if (!entry?.acf?.content) {
    const { FACULTADES_CONTENT } = await import("@/lib/content/facultades-data");
    const existing = FACULTADES_CONTENT[facultadSlug];

    if (!existing) {
      throw new Error(`Sin contenido base para facultad "${facultadSlug}".`);
    }

    const withPersonal = await syncPersonalFacultadFromCpt(existing);
    upsertFacultadContent(facultadSlug, withPersonal);
    return withPersonal;
  }

  const mapped = mapFacultadFromAcf(entry);
  const withPersonal = await syncPersonalFacultadFromCpt(mapped);
  upsertFacultadContent(facultadSlug, withPersonal);
  return withPersonal;
};

export const syncCarreraContentFromAcf = async (facultadSlug: string, carreraSlug: string) => {
  const entry = await getCarreraAcfEntry(facultadSlug, carreraSlug);

  if (!entry?.acf?.content) {
    const { CARRERAS_CONTENT } = await import("@/lib/content/carreras-data");
    const key = `${facultadSlug}:${carreraSlug}`;
    const existing = CARRERAS_CONTENT[key];

    if (!existing) {
      throw new Error(`Sin contenido base para carrera "${key}".`);
    }

    const withDocentes = await syncDocentesFromCpt(existing);
    const withNoticias = await syncNoticiasFromCpt(withDocentes);
    const withInicio = entry?.acf
      ? await applyInicioPaginaFromAcf(entry.acf, withNoticias)
      : withNoticias;
    upsertCarreraContent(facultadSlug, carreraSlug, withInicio);
    return withInicio;
  }

  const mapped = mapCarreraFromAcf(entry);
  const withDocentes = await syncDocentesFromCpt(mapped);
  const withNoticias = await syncNoticiasFromCpt(withDocentes);
  const withInicio = await applyInicioPaginaFromAcf(entry.acf, withNoticias);
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
