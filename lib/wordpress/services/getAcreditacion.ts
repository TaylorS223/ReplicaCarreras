import type { ContentContext } from "@/lib/content/resolver";
import { getAccreditationContentByContext } from "@/lib/content/resolver";

export const getAccreditationContent = (context?: ContentContext) =>
  getAccreditationContentByContext(context);
