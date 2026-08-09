import { wpFetch } from "@/lib/wordpress/client";

type WpTerm = { id: number; slug: string; name: string };

// Cache en memoria: slug → id del término
const termCache = new Map<string, number>();

const IS_DEV = process.env.NODE_ENV === "development";

export const getCarreraTermId = async (carreraSlug: string): Promise<number | null> => {
  if (termCache.has(carreraSlug)) {
    return termCache.get(carreraSlug)!;
  }

  try {
    const terms = await wpFetch<WpTerm[]>("carrera", {
      query: { slug: carreraSlug, _fields: "id,slug" },
      ...(IS_DEV ? { cache: "no-store" as const } : { next: { revalidate: 86400, tags: ["carrera-terms"] } }),
    });

    if (terms.length > 0) {
      termCache.set(carreraSlug, terms[0].id);
      return terms[0].id;
    }
  } catch (e) {
    console.error(`[getCarreraTermId] Error fetching term "${carreraSlug}":`, e);
  }

  return null;
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
