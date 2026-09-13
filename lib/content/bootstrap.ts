import { cache } from "react";
import { draftMode } from "next/headers";
import type { ContentContext } from "@/lib/content/resolver";
import { syncContextContentFromAcf } from "@/lib/wordpress/acf";


const hydrateBySlug = cache(async (facultadSlug: string, carreraSlug: string) => {
  const { isEnabled: isPreview } = await draftMode();

  // Siempre sincroniza desde WordPress — no hay modo mock.
  // Si falla, el error se propaga para que Next.js muestre la página de error.
  await syncContextContentFromAcf(facultadSlug, carreraSlug);

  return { mode: isPreview ? ("preview" as const) : ("acf" as const) };
});

// API pública: acepta el mismo ContentContext de antes para no romper ningún caller.
export const hydrateContentForContext = (context: ContentContext) => {
  const facultadSlug = context.facultadSlug ?? "arquitectura";
  const carreraSlug = context.carreraSlug ?? "arquitectura";
  return hydrateBySlug(facultadSlug, carreraSlug);
};
