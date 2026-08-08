import { wpFetch } from "@/lib/wordpress/client";

type WpTerm = { id: number; slug: string; name: string };

// Cache en memoria: slug → id del término
// Evita repetir la misma llamada REST durante la misma sesión del servidor
const termCache = new Map<string, number>();

/**
 * Resuelve el ID del término de la taxonomía "carrera" para un slug dado.
 * Ejemplo: getCarreraTermId("arquitectura") → 12
 *
 * El REST API de WordPress expone los términos en:
 *   GET /wp-json/wp/v2/carrera?slug=arquitectura
 */
export const getCarreraTermId = async (carreraSlug: string): Promise<number | null> => {
  if (termCache.has(carreraSlug)) {
    const cached = termCache.get(carreraSlug)!;
    console.log(`[getCarreraTermId] Cache hit: "${carreraSlug}" → ${cached}`);
    return cached;
  }

  try {
    const terms = await wpFetch<WpTerm[]>("carrera", {
      query: { slug: carreraSlug, _fields: "id,slug" },
      // En desarrollo: sin caché. En producción: 24h (los IDs raramente cambian)
      next: process.env.NODE_ENV === "development"
        ? { revalidate: 0 }
        : { revalidate: 86400, tags: ["carrera-terms"] },
    });

    console.log(`[getCarreraTermId] WP response for "${carreraSlug}":`, JSON.stringify(terms));

    if (terms.length > 0) {
      termCache.set(carreraSlug, terms[0].id);
      return terms[0].id;
    }
  } catch (e) {
    console.error(`[getCarreraTermId] Error fetching term "${carreraSlug}":`, e);
  }

  console.warn(`[getCarreraTermId] No term found for "${carreraSlug}" — no filter applied`);
  return null;
};

/**
 * Lista todos los términos de la taxonomía "carrera".
 * Usado por generateStaticParams para generar dinámicamente las rutas.
 */
export const getAllCarreraTerms = async (): Promise<WpTerm[]> => {
  try {
    return await wpFetch<WpTerm[]>("carrera", {
      query: { per_page: 100, _fields: "id,slug,name" },
      next: { revalidate: 86400, tags: ["carrera-terms"] },
    });
  } catch {
    return [];
  }
};
