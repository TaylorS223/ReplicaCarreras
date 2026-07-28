import { upsertCarreraContent } from "@/lib/content/carreras-data";
import { upsertFacultadContent } from "@/lib/content/facultades-data";
import {
  mapCarreraFromAcf,
  mapFacultadFromAcf,
  mapPersonalPostToAdministrativo,
  mapPersonalPostToComisionProfile,
  mapPersonalPostToDecanatoProfile,
  mapPersonalPostToDireccionCarreraProfile,
  mapPersonalPostToDocente,
} from "@/lib/wordpress/acf/mappers";
import {
  getCarreraAcfEntry,
  getFacultadAcfEntry,
  getPersonalByTipo,
} from "@/lib/wordpress/acf/repository";

export const syncFacultadContentFromAcf = async (facultadSlug: string) => {
  const entry = await getFacultadAcfEntry(facultadSlug);

  if (!entry) {
    throw new Error(`No se encontró página ACF para facultad \"${facultadSlug}\".`);
  }

  // Carga el personal de facultad (decanato, comisiones, administración) en paralelo
  const [decanatoPosts, comisionesPosts, adminPosts, serviciosPosts] = await Promise.all([
    getPersonalByTipo("decano"),
    getPersonalByTipo("comision"),
    getPersonalByTipo("administrativo"),
    getPersonalByTipo("servicios"),
  ]);

  const mapped = mapFacultadFromAcf(entry);

  // Sobreescribe con los datos del CPT si hay posts; de lo contrario mantiene lo de ACF page
  if (decanatoPosts.length > 0) {
    mapped.decanato = {
      ...mapped.decanato,
      profiles: decanatoPosts.map(mapPersonalPostToDecanatoProfile),
    };
  }

  if (comisionesPosts.length > 0) {
    mapped.comisiones = {
      ...mapped.comisiones,
      profiles: comisionesPosts.map(mapPersonalPostToComisionProfile),
    };
  }

  const todosAdminItems = [
    ...adminPosts.map(mapPersonalPostToAdministrativo),
    ...serviciosPosts.map(mapPersonalPostToAdministrativo),
  ];

  if (todosAdminItems.length > 0) {
    mapped.administracionServicios = {
      ...mapped.administracionServicios,
      groups: [{ title: "Personal Administrativo y de Servicios", items: todosAdminItems }],
    };
  }

  upsertFacultadContent(facultadSlug, mapped);

  return mapped;
};

export const syncCarreraContentFromAcf = async (facultadSlug: string, carreraSlug: string) => {
  const entry = await getCarreraAcfEntry(facultadSlug, carreraSlug);

  if (!entry) {
    throw new Error(
      `No se encontró página ACF para carrera \"${facultadSlug}:${carreraSlug}\".`,
    );
  }

  // Carga docentes del CPT en paralelo con los datos de la página
  const docentesPosts = await getPersonalByTipo("docentes");

  const mapped = mapCarreraFromAcf(entry);

  // Sobreescribe docentes con los del CPT si hay posts
  if (docentesPosts.length > 0) {
    const docentes = docentesPosts.map(mapPersonalPostToDocente);
    mapped.docentes = docentes;
    mapped.personal = {
      ...mapped.personal,
      docentes,
    };
  }

  upsertCarreraContent(facultadSlug, carreraSlug, mapped);

  return mapped;
};

export const syncContextContentFromAcf = async (facultadSlug: string, carreraSlug: string) => {
  const [facultad, carrera] = await Promise.all([
    syncFacultadContentFromAcf(facultadSlug),
    syncCarreraContentFromAcf(facultadSlug, carreraSlug),
  ]);

  return { facultad, carrera };
};
