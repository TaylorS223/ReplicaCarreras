import { FACULTADES_CONTENT } from "@/lib/content/facultades-data";
import { CARRERAS_CONTENT } from "@/lib/content/carreras-data";
import type { FacultadContent } from "@/types/facultad-content";
import type { CarreraContent } from "@/types/carrera-content";
import type { Docente } from "@/types/docente";
import type { Noticia } from "@/types/noticia";

export type ContentContext = {
  facultadSlug?: string;
  carreraSlug?: string;
};

type ResolvedKey = {
  facultadSlug: string;
  carreraSlug: string;
};

const DEFAULT_CONTEXT: ResolvedKey = {
  facultadSlug: "arquitectura",
  carreraSlug: "arquitectura",
};

const resolveContext = (context?: ContentContext): ResolvedKey => ({
  facultadSlug: context?.facultadSlug ?? DEFAULT_CONTEXT.facultadSlug,
  carreraSlug: context?.carreraSlug ?? DEFAULT_CONTEXT.carreraSlug,
});

const getFacultadContent = (context?: ContentContext): FacultadContent => {
  const { facultadSlug } = resolveContext(context);
  const content = FACULTADES_CONTENT[facultadSlug];

  if (!content) {
    throw new Error(`Sin contenido para facultad "${facultadSlug}"`);
  }

  return content;
};

const getCarreraContent = (context?: ContentContext): CarreraContent => {
  const { facultadSlug, carreraSlug } = resolveContext(context);
  const key = `${facultadSlug}:${carreraSlug}`;
  const content = CARRERAS_CONTENT[key];

  if (!content) {
    throw new Error(`Sin contenido para carrera "${key}"`);
  }

  return content;
};

export const getHeaderContentByContext = (context?: ContentContext) =>
  getFacultadContent(context).header;

export const getFooterContentByContext = (context?: ContentContext) =>
  getFacultadContent(context).footer;

export const getDecanatoContentByContext = (context?: ContentContext) =>
  getFacultadContent(context).decanato;

export const getDireccionCarreraContentByContext = (context?: ContentContext) =>
  getFacultadContent(context).direccionCarrera;

export const getComisionesContentByContext = (context?: ContentContext) =>
  getFacultadContent(context).comisiones;

export const getAdministracionServiciosContentByContext = (context?: ContentContext) =>
  getFacultadContent(context).administracionServicios;

export const getHeroContentByContext = (context?: ContentContext) =>
  getCarreraContent(context).hero;

export const getInfoCardsByContext = (context?: ContentContext) =>
  getCarreraContent(context).infoCards;

export const getMisionVisionItemsByContext = (context?: ContentContext) =>
  getCarreraContent(context).misionVision;

export const getProfileContentByContext = (context?: ContentContext) =>
  getCarreraContent(context).profile;

export const getProyectosContentByContext = (context?: ContentContext) =>
  getCarreraContent(context).proyectos;

export const getAccreditationContentByContext = (context?: ContentContext) =>
  getCarreraContent(context).accreditation;

export const getPlanEstudiosContentByContext = (context?: ContentContext) =>
  getCarreraContent(context).planEstudios;

export const getPersonalContentByContext = (context?: ContentContext) =>
  getCarreraContent(context).personal;

export const getDocenteBySlugFromContext = (
  slug: string,
  context?: ContentContext,
): Docente | undefined => getCarreraContent(context).docentes.find((docente) => docente.slug === slug);

export const getDocenteSlugsByContext = (context?: ContentContext): string[] =>
  getCarreraContent(context).docentes.map((docente) => docente.slug);

export const getInicioPaginaContentByContext = (context?: ContentContext) =>
  getCarreraContent(context).inicioPagina ?? null;

export const getNoticiasContentByContext = (context?: ContentContext): Noticia[] =>
  getCarreraContent(context).noticias;
