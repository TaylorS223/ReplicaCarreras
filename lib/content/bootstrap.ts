import type { ContentContext } from "@/lib/content/resolver";
import { syncContextContentFromAcf } from "@/lib/wordpress/acf";
import { isAcfSourceEnabled } from "@/lib/wordpress/source";

export const hydrateContentForContext = async (context: ContentContext) => {
  const facultadSlug = context.facultadSlug ?? "arquitectura";
  const carreraSlug = context.carreraSlug ?? "arquitectura";

  if (!isAcfSourceEnabled()) {
    return { mode: "mock" as const };
  }

  try {
    await syncContextContentFromAcf(facultadSlug, carreraSlug);
    return { mode: "acf" as const };
  } catch (error) {
    console.warn(
      `[hydrateContentForContext] ACF sync falló para ${facultadSlug}/${carreraSlug}, usando mock como fallback.`,
      error,
    );
    return { mode: "mock" as const };
  }
};
