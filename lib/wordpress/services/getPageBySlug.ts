import { wpFetch } from "@/lib/wordpress/client";
import type { WpPage } from "@/lib/wordpress/types";

export const getPageBySlug = async (slug: string): Promise<WpPage | null> => {
  const pages = await wpFetch<WpPage[]>("pages", {
    query: {
      slug,
      _embed: true,
    },
  });

  return pages[0] ?? null;
};
