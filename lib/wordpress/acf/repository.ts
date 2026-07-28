import { wpFetch } from "@/lib/wordpress/client";
import type {
  CarreraAcfSchema,
  FacultadAcfSchema,
  PersonalPost,
  TipoPersonalSlug,
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

// Fetch del CPT "personal" filtrado por la taxonomía "tipo_personal"
// El slug de la taxonomía debe coincidir con los términos que registraste en WP
export const getPersonalByTipo = async (
  tipo: TipoPersonalSlug,
  perPage = 100,
): Promise<PersonalPost[]> => {
  return wpFetch<PersonalPost[]>("personal", {
    query: {
      tipo_personal: tipo,
      per_page: perPage,
      _fields: "id,slug,title,acf",
    },
    cache: "no-store",
  });
};
