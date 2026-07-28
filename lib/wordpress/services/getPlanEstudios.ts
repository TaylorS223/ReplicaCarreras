import type { ContentContext } from "@/lib/content/resolver";
import { getPlanEstudiosContentByContext } from "@/lib/content/resolver";

export const getPlanEstudiosContent = (context?: ContentContext) =>
  getPlanEstudiosContentByContext(context);
