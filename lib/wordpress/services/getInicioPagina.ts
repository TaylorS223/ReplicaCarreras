import type { ContentContext } from "@/lib/content/resolver";
import { getInicioPaginaContentByContext } from "@/lib/content/resolver";

export const getInicioPaginaContent = (context?: ContentContext) =>
  getInicioPaginaContentByContext(context);
