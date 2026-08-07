import { wpFetch } from "@/lib/wordpress/client";
import type { WpPage } from "@/lib/wordpress/types";

const IS_DEV = process.env.NODE_ENV === "development";

export const getPageBySlug = async (slug: string): Promise<WpPage | null> => {
  const pages = await wpFetch<WpPage[]>("pages", {
    query: {
      slug,
      _embed: true,
    },
    next: IS_DEV ? { revalidate: 0 } : { revalidate: 3600, tags: ["wp-pages"] },
  });

  return pages[0] ?? null;
};
