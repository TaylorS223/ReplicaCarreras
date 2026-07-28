import type { ContentContext } from "@/lib/content/resolver";
import {
  getDocenteBySlugFromContext,
  getDocenteSlugsByContext,
  getPersonalContentByContext,
} from "@/lib/content/resolver";

export const getPersonalContent = (context?: ContentContext) =>
  getPersonalContentByContext(context);

export const getDocenteBySlug = (slug: string, context?: ContentContext) =>
  getDocenteBySlugFromContext(slug, context);

export const getDocenteSlugs = (context?: ContentContext) => getDocenteSlugsByContext(context);
