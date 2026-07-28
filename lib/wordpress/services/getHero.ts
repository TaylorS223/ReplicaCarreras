import type { ContentContext } from "@/lib/content/resolver";
import { getHeroContentByContext } from "@/lib/content/resolver";

export const getHeroContent = (context?: ContentContext) => getHeroContentByContext(context);
