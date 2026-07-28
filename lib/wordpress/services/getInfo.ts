import type { ContentContext } from "@/lib/content/resolver";
import {
  getInfoCardsByContext,
  getMisionVisionItemsByContext,
  getProfileContentByContext,
} from "@/lib/content/resolver";

export const getInfoCards = (context?: ContentContext) => getInfoCardsByContext(context);
export const getMisionVisionItems = (context?: ContentContext) =>
  getMisionVisionItemsByContext(context);
export const getProfileContent = (context?: ContentContext) => getProfileContentByContext(context);
