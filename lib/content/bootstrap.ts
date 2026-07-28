import type { ContentContext } from "@/lib/content/resolver";
import { syncContextContentFromAcf } from "@/lib/wordpress/acf";
import { isAcfSourceEnabled } from "@/lib/wordpress/source";

export const hydrateContentForContext = async (context: ContentContext) => {
  const facultadSlug = context.facultadSlug ?? "arquitectura";
  const carreraSlug = context.carreraSlug ?? "arquitectura";

  if (!isAcfSourceEnabled()) {
    return { mode: "mock" as const };
  }

  await syncContextContentFromAcf(facultadSlug, carreraSlug);

  return { mode: "acf" as const };
};
