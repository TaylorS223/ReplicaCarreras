import type { ContentContext } from "@/lib/content/resolver";
import { getFooterContentByContext } from "@/lib/content/resolver";

export const getFooterContent = (context?: ContentContext) => getFooterContentByContext(context);
