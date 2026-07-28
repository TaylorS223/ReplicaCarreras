import { arquitecturaConfig } from "@/config/facultades/arquitectura";
import type { FacultadConfig, FacultadRegistry } from "@/lib/facultades/types";

// Este archivo es el cerebro del sistema.
// Agregar una nueva facultad = agregar un nuevo objeto aquí.
export const FACULTADES_REGISTRY: Record<string, FacultadConfig> = {
  [arquitecturaConfig.slug]: arquitecturaConfig,
};

// Alias de URL histórica o comercial -> slug canónico de facultad.
// Ejemplo: /arquitectura-internacional => /arquitectura
export const FACULTAD_ALIASES: Record<string, string> = {
  "arquitectura-internacional": "arquitectura",
};

export const getCanonicalFacultadSlug = (facultad: string): string => {
  return FACULTAD_ALIASES[facultad] ?? facultad;
};

export const getFacultadConfig = (facultad: string): FacultadConfig | null => {
  const canonicalSlug = getCanonicalFacultadSlug(facultad);
  return FACULTADES_REGISTRY[canonicalSlug] ?? null;
};

export const getFacultadSlugs = (): string[] => Object.keys(FACULTADES_REGISTRY);

export const getFacultadRegistry = (): FacultadRegistry => FACULTADES_REGISTRY;

export const getDefaultFacultadConfig = (): FacultadConfig | null => {
  const [firstKey] = Object.keys(FACULTADES_REGISTRY);
  return firstKey ? FACULTADES_REGISTRY[firstKey] : null;
};
