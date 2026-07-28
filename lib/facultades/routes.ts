import {
  FACULTADES_REGISTRY,
  getDefaultFacultadConfig,
} from "@/lib/facultades/registry";
import type { FacultadConfig } from "@/lib/facultades/types";

const ensureLeadingSlash = (path: string): string => (path.startsWith("/") ? path : `/${path}`);

export const buildFacultadPath = (facultad: string, path = ""): string => {
  const normalized = path === "/" ? "" : path;
  return `/${facultad}${ensureLeadingSlash(normalized || "")}`.replace(/\/$/, "") || `/${facultad}`;
};

export const buildCarreraPlanRoute = (config: FacultadConfig): string =>
  `/${config.slug}/carreras/${config.defaultCarreraSlug}/plan-estudios`;

export const buildDefaultFacultadRoute = (path = ""): string => {
  const defaultConfig = getDefaultFacultadConfig();
  if (!defaultConfig) {
    return "/";
  }

  return buildFacultadPath(defaultConfig.slug, path);
};

export const buildDefaultPersonalRoute = (): string => buildDefaultFacultadRoute("/personal");
export const buildDefaultProyectosRoute = (): string => buildDefaultFacultadRoute("/proyectos");

export const buildDefaultDocenteRoute = (slug: string): string =>
  `${buildDefaultPersonalRoute()}/${slug}`;

export const buildDefaultPlanEstudiosRoute = (): string => {
  const defaultConfig = getDefaultFacultadConfig();
  if (!defaultConfig) {
    return "/";
  }

  return buildCarreraPlanRoute(defaultConfig);
};

export const hasAnyFacultadRegistered = (): boolean =>
  Object.keys(FACULTADES_REGISTRY).length > 0;
