import { wpFetch } from "@/lib/wordpress/client";

type WpPageMinimal = { id: number; slug: string };

const cache = new Map<string, number>();

/**
 * Obtiene el ID de la Page de WordPress que representa una carrera.
 * Las pages de carrera siguen el patrón de slug: carrera-{facultad}-{carrera}
 * o simplemente carrera-{carrera}.
 *
 * El resultado se guarda en memoria para no repetir la llamada en la misma sesión.
 */
export const getCarreraPageId = async (
  facultadSlug: string,
  carreraSlug: string,
): Promise<number | null> => {
  const key = `${facultadSlug}:${carreraSlug}`;

  if (cache.has(key)) return cache.get(key)!;

  // Intenta primero el slug compuesto carrera-{facultad}-{carrera}
  const slugCompuesto = `carrera-${facultadSlug}-${carreraSlug}`;
  const slugSimple = `carrera-${carreraSlug}`;

  for (const slug of [slugCompuesto, slugSimple]) {
    try {
      const pages = await wpFetch<WpPageMinimal[]>("pages", {
        query: { slug, _fields: "id,slug" },
        next: { revalidate: 86400, tags: ["wp-pages"] }, // 24h — los IDs raramente cambian
      });

      if (pages.length > 0) {
        cache.set(key, pages[0].id);
        return pages[0].id;
      }
    } catch {
      // continúa con el siguiente slug
    }
  }

  return null;
};
