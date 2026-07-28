import type { ContentContext } from "@/lib/content/resolver";
import { getProyectosContentByContext } from "@/lib/content/resolver";

export const getProyectosContent = (context?: ContentContext) =>
  getProyectosContentByContext(context);
