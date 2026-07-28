import type { ContentContext } from "@/lib/content/resolver";
import { getProyectosContentByContext } from "@/lib/content/resolver";

export const getProyectos = (context?: ContentContext) =>
  getProyectosContentByContext(context).items;
