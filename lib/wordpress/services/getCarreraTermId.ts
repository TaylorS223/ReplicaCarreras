import { wpFetch } from "@/lib/wordpress/client";

type WpTerm = { id: number; slug: string; name: string };

// Cache en memoria: slug → Promise<id | null>
// Almacena la Promise (no el valor resuelto) para deduplicar llamadas concurrentes
// al mismo slug. Si 7 endpoints llaman buildCarreraFilter simultáneamente antes
// de que llegue la primera respuesta, todos reutilizan la misma Promise en vuelo
// en lugar de disparar 7 fetches idénticos a WordPress.
const termCache = new Map<string, Promise<number | null>>();

const IS_DEV = process.env.NODE_ENV === "development";

const fetchTermId = async (carreraSlug: string): Promise<number | null> => {
  try {
    const terms = await wpFetch<WpTerm[]>("carrera", {
      query: { slug: carreraSlug, _fields: "id,slug" },
      ...(IS_DEV ? { cache: "no-store" as const } : { next: { revalidate: 86400, tags: ["carrera-terms"] } }),
    });
    return terms.length > 0 ? terms[0].id : null;
  } catch (e) {
    console.error(`[getCarreraTermId] Error fetching term "${carreraSlug}":`, e);
    // Elimina del cache para permitir reintento en el próximo request
    termCache.delete(carreraSlug);
    return null;
  }
};

export const getCarreraTermId = (carreraSlug: string): Promise<number | null> => {
  if (!termCache.has(carreraSlug)) {
    termCache.set(carreraSlug, fetchTermId(carreraSlug));
  }
  return termCache.get(carreraSlug)!;
};

export const getAllCarreraTerms = async (): Promise<WpTerm[]> => {
  try {
    return await wpFetch<WpTerm[]>("carrera", {
      query: { per_page: 100, _fields: "id,slug,name" },
      ...(IS_DEV ? { cache: "no-store" as const } : { next: { revalidate: 86400, tags: ["carrera-terms"] } }),
    });
  } catch {
    return [];
  }
};
