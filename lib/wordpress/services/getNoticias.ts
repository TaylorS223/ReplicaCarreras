import type { ContentContext } from "@/lib/content/resolver";
import type { Noticia } from "@/types/noticia";
import { getNoticiasContentByContext } from "@/lib/content/resolver";

export const getNoticias = (context?: ContentContext): Noticia[] =>
  getNoticiasContentByContext(context);
