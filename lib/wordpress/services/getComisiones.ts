import type { ContentContext } from "@/lib/content/resolver";
import { getComisionesContentByContext } from "@/lib/content/resolver";

export const getComisionesContent = (context?: ContentContext) =>
  getComisionesContentByContext(context);
