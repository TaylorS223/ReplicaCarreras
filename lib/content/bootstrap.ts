import { cache } from "react";
import { draftMode } from "next/headers";
import type { ContentContext } from "@/lib/content/resolver";
import { syncContextContentFromAcf } from "@/lib/wordpress/acf";
import { isAcfSourceEnabled } from "@/lib/wordpress/source";


const hydrateBySlug = cache(async (facultadSlug: string, carreraSlug: string) => {
  const { isEnabled: isPreview } = await draftMode();

  if (!isPreview && !isAcfSourceEnabled()) {
    return { mode: "mock" as const };
  }

  try {
    await syncContextContentFromAcf(facultadSlug, carreraSlug);
    return { mode: isPreview ? ("preview" as const) : ("acf" as const) };
  } catch (error) {
    // Primer intento falló — reintenta una vez más (ECONNRESET en LocalWP es transitorio)
    try {
      await syncContextContentFromAcf(facultadSlug, carreraSlug);
      return { mode: isPreview ? ("preview" as const) : ("acf" as const) };
    } catch (retryError) {
      console.warn(
        `[hydrateContentForContext] ACF sync falló para ${facultadSlug}/${carreraSlug}, usando mock como fallback.`,
        retryError,
      );
      return { mode: "mock" as const };
    }
  }
});

// API pública: acepta el mismo ContentContext de antes para no romper ningún caller.
export const hydrateContentForContext = (context: ContentContext) => {
  const facultadSlug = context.facultadSlug ?? "arquitectura";
  const carreraSlug = context.carreraSlug ?? "arquitectura";
  return hydrateBySlug(facultadSlug, carreraSlug);
};
