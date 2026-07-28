import type { ContentContext } from "@/lib/content/resolver";
import { getHeaderContentByContext } from "@/lib/content/resolver";

export const getHeaderContent = (context?: ContentContext) => getHeaderContentByContext(context);
