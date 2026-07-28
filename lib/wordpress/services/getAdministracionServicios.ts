import type { ContentContext } from "@/lib/content/resolver";
import { getAdministracionServiciosContentByContext } from "@/lib/content/resolver";

export const getAdministracionServiciosContent = (context?: ContentContext) =>
  getAdministracionServiciosContentByContext(context);
