8import { draftMode } from "next/headers";
import type { ContentContext } from "@/lib/content/resolver";
import { syncContextContentFromAcf } from "@/lib/wordpress/acf";
import { isAcfSourceEnabled } from "@/lib/wordpress/source";

export const hydrateContentForContext = async (context: ContentContext) => {
  const facultadSlug = context.facultadSlug ?? "arquitectura";
  const carreraSlug = context.carreraSlug ?? "arquitectura";

  // En Draft Mode siempre forzamos sync desde ACF aunque la fuente ACF
  // no esté habilitada globalmente, para mostrar los datos más recientes de WP.
  const { isEnabled: isPreview } = await draftMode();

  if (!isPreview && !isAcfSourceEnabled()) {
    return { mode: "mock" as const };
  }

  try {
    await syncContextContentFromAcf(facultadSlug, carreraSlug);
    return { mode: isPreview ? ("preview" as const) : ("acf" as const) };
  } catch (error) {
    console.warn(
      `[hydrateContentForContext] ACF sync falló para ${facultadSlug}/${carreraSlug}, usando mock como fallback.`,
      error,
    );
    return { mode: "mock" as const };
  }
};
