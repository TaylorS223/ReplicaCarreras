import { upsertCarreraContent } from "@/lib/content/carreras-data";
import { upsertFacultadContent } from "@/lib/content/facultades-data";
import { mapCarreraFromAcf, mapFacultadFromAcf } from "@/lib/wordpress/acf/mappers";
import { getCarreraAcfEntry, getFacultadAcfEntry } from "@/lib/wordpress/acf/repository";

export const syncFacultadContentFromAcf = async (facultadSlug: string) => {
  const entry = await getFacultadAcfEntry(facultadSlug);

  if (!entry) {
    throw new Error(`No se encontró página ACF para facultad \"${facultadSlug}\".`);
  }

  const mapped = mapFacultadFromAcf(entry);
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

  const mapped = mapCarreraFromAcf(entry);
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
