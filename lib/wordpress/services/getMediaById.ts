import { wpFetch } from "@/lib/wordpress/client";

type WpMedia = {
  id: number;
  source_url?: string;
};

export const getMediaById = async (id: number): Promise<WpMedia> => {
  return wpFetch<WpMedia>(`media/${id}`, { cache: "no-store" });
};
