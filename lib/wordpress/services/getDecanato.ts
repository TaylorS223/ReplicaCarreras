import type { ContentContext } from "@/lib/content/resolver";
import { getDecanatoContentByContext } from "@/lib/content/resolver";

export const getDecanatoContent = (context?: ContentContext) =>
  getDecanatoContentByContext(context);
