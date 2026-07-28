import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";
import type { CarreraAcfSchema, FacultadAcfSchema, WpAcfEnvelope } from "@/lib/wordpress/acf/types";

const buildAcfError = (scope: string, slug: string) =>
  new Error(`ACF payload inválido para ${scope} \"${slug}\". Se esperaba acf.content.`);

export const mapFacultadFromAcf = (
  payload: WpAcfEnvelope<FacultadAcfSchema>,
): FacultadContent => {
  const content = payload.acf?.content;

  if (!content) {
    throw buildAcfError("facultad", payload.slug);
  }

  return content;
};

export const mapCarreraFromAcf = (payload: WpAcfEnvelope<CarreraAcfSchema>): CarreraContent => {
  const content = payload.acf?.content;

  if (!content) {
    throw buildAcfError("carrera", payload.slug);
  }

  return content;
};
