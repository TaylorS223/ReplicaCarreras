import { wpFetch } from "@/lib/wordpress/client";
import type {
  CarreraAcfSchema,
  FacultadAcfSchema,
  WpAcfEnvelope,
  WpRestCollectionResponse,
} from "@/lib/wordpress/acf/types";

const getFirstOrNull = <T>(items: T[]): T | null => items[0] ?? null;

const fetchPageBySlug = async <TAcf>(slug: string) => {
  const pages = await wpFetch<WpRestCollectionResponse<WpAcfEnvelope<TAcf>>>("pages", {
    query: {
      slug,
      _fields: "id,slug,acf",
    },
    cache: "no-store",
  });

  return getFirstOrNull(pages);
};

export const getFacultadAcfEntry = async (facultadSlug: string) =>
  fetchPageBySlug<FacultadAcfSchema>(`facultad-${facultadSlug}`);

export const getCarreraAcfEntry = async (facultadSlug: string, carreraSlug: string) =>
  fetchPageBySlug<CarreraAcfSchema>(`carrera-${facultadSlug}-${carreraSlug}`);
