/**
 * bootstrap.ts
 *
 * Hidrata el store de contenido para una carrera antes de renderizar la página.
 *
 * ## Flujo
 * 1. El layout de cada carrera llama a `hydrateContentForContext` con el slug de la carrera.
 * 2. Se invoca `syncContextContentFromAcf` que carga en paralelo:
 *    - FacultadContent (header, footer, personal: decano, dirección, comisiones, admin)
 *    - CarreraContent (hero, infoCards, misión/visión, perfil, noticias, docentes, plan de estudios)
 * 3. El store en memoria queda actualizado y los Server Components leen de él sin más peticiones.
 *
 * ## Deduplicación con React.cache
 * `hydrateBySlug` está envuelto en `cache()` de React, lo que garantiza que aunque
 * múltiples componentes llamen a esta función en el mismo request, la sincronización
 * con WordPress ocurre una sola vez por (facultadSlug, carreraSlug).
 *
 * ## Solución al bug de navbar intermitente
 * El store persiste los navItems completos (sin filtrar proyectos). El filtro de
 * visibilidad de proyectos se aplica solo al resultado de cada request en
 * syncFacultadContentFromAcf, evitando que una petición fallida a WordPress vacíe
 * los navItems de forma permanente hasta el próximo restart del servidor.
 */

import { cache } from "react";
import { draftMode } from "next/headers";
import type { ContentContext } from "@/lib/content/resolver";
import { syncContextContentFromAcf } from "@/lib/wordpress/acf";


const hydrateBySlug = cache(async (facultadSlug: string, carreraSlug: string) => {
  const { isEnabled: isPreview } = await draftMode();

  // Siempre sincroniza desde WordPress.
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
