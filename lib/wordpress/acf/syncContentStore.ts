import { upsertCarreraContent } from "@/lib/content/carreras-data";
import { upsertFacultadContent } from "@/lib/content/facultades-data";
import {
  mapCarreraFromAcf,
  mapFacultadFromAcf,
  mapNoticiaPostToProyecto,
  mapPersonalPostToAdministrativo,
  mapPersonalPostToComisionProfile,
  mapPersonalPostToDecanatoProfile,
  mapPersonalPostToDireccionCarreraProfile,
  mapPersonalPostToDocente,
  mapSemestrePostsToPlanEstudios,
  mergeCarreraFromInicioPagina,
} from "@/lib/wordpress/acf/mappers";
import {
  getCarreraAcfEntry,
  getFacultadAcfEntry,
  getNoticias as getNoticiasCpt,
  getPersonalByTipo,
  getSemestres,
  resolvePersonalPostImages,
} from "@/lib/wordpress/acf/repository";
import type { FacultadContent } from "@/types/facultad-content";
import type { CarreraContent } from "@/types/carrera-content";

// Resuelve imágenes de cada post antes de mapear
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

// Carga los docentes, plan de estudios y noticias del CPT e inyecta en el contenido de carrera
export const syncDocentesFromCpt = async (
  content: CarreraContent,
  facultadSlug = "arquitectura",
): Promise<CarreraContent> => {
  const [docentesPosts, semestresPosts, noticiasPosts] = await Promise.all([
    getPersonalByTipo("docentes"),
    getSemestres(),
    getNoticiasCpt(),
  ]);

  let result = { ...content };

  if (docentesPosts.length > 0) {
    const docentes = await withImages(docentesPosts, mapPersonalPostToDocente);
    result = {
      ...result,
      docentes,
      personal: { ...result.personal, docentes },
    };
  }

  if (semestresPosts.length > 0) {
    result = {
      ...result,
      planEstudios: await mapSemestrePostsToPlanEstudios(semestresPosts, result.planEstudios),
    };
  }

  if (noticiasPosts.length > 0) {
    const items = await Promise.all(
      noticiasPosts.map((post) => mapNoticiaPostToProyecto(post, facultadSlug)),
    );
    result = {
      ...result,
      proyectos: {
        ...result.proyectos,
        items,
      },
    };
  }

  return result;
};

export const syncFacultadContentFromAcf = async (facultadSlug: string) => {
  const entry = await getFacultadAcfEntry(facultadSlug);

  if (!entry?.acf?.content) {
    const { FACULTADES_CONTENT } = await import("@/lib/content/facultades-data");
    const existing = FACULTADES_CONTENT[facultadSlug];
    if (!existing) throw new Error(`Sin contenido base para facultad "${facultadSlug}".`);
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

  const { CARRERAS_CONTENT } = await import("@/lib/content/carreras-data");
  const key = `${facultadSlug}:${carreraSlug}`;
  const existing = CARRERAS_CONTENT[key];

  if (!existing) throw new Error(`Sin contenido base para carrera "${key}".`);

  // Aplica campos planos de la página ACF si existen
  let base = existing;
  if (entry?.acf) {
    if (entry.acf.content) {
      base = mapCarreraFromAcf(entry);
    } else {
      base = await mergeCarreraFromInicioPagina(entry.acf, existing);
    }
  }

  const withDocentes = await syncDocentesFromCpt(base, facultadSlug);
  upsertCarreraContent(facultadSlug, carreraSlug, withDocentes);
  return withDocentes;
};

export const syncContextContentFromAcf = async (facultadSlug: string, carreraSlug: string) => {
  const [facultad, carrera] = await Promise.all([
    syncFacultadContentFromAcf(facultadSlug),
    syncCarreraContentFromAcf(facultadSlug, carreraSlug),
  ]);
  return { facultad, carrera };
};
