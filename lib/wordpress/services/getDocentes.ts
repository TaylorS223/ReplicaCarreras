import type { ContentContext } from "@/lib/content/resolver";
import { getPersonalContentByContext } from "@/lib/content/resolver";

export const getDocentes = (context?: ContentContext) =>
  getPersonalContentByContext(context).docentes;
