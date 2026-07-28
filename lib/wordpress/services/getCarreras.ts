import { getMockCarreras } from "@/lib/mocks/carreras";
import type { ContentContext } from "@/lib/content/resolver";

export const getCarreras = (context?: ContentContext) => {
  const carreras = getMockCarreras();
  const facultadSlug = context?.facultadSlug;

  if (!facultadSlug) {
    return carreras;
  }

  return carreras.filter((carrera) => carrera.facultadSlug === facultadSlug);
};

export const getCarreraBySlug = (slug: string, context?: ContentContext) =>
  getCarreras(context).find((carrera) => carrera.slug === slug) ?? null;
