import type { ContentContext } from "@/lib/content/resolver";
import { getDireccionCarreraContentByContext } from "@/lib/content/resolver";

export const getDireccionCarreraContent = (context?: ContentContext) =>
  getDireccionCarreraContentByContext(context);
