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

// IDs reales de los términos de la taxonomía tipo_personal en WordPress
const TIPO_PERSONAL_IDS: Record<TipoPersonalSlug, number> = {
  administrativo: 3,
  comision: 6,
  decano: 5,
  "direccion-carrera": 8,
  docentes: 7,
  servicios: 4,
};

// Fetch del CPT "personal" filtrado por ID de término de la taxonomía tipo_personal
export const getPersonalByTipo = async (
  tipo: TipoPersonalSlug,
  perPage = 100,
): Promise<PersonalPost[]> => {
  const termId = TIPO_PERSONAL_IDS[tipo];

  return wpFetch<PersonalPost[]>("personal", {
    query: {
      tipo_personal: termId,
      per_page: perPage,
      _fields: "id,slug,title,acf",
    },
    cache: "no-store",
  });
};

// Resuelve un ID de media a su URL. Si ya es URL, la devuelve tal cual.
export const resolveMediaUrl = async (value: number | string | undefined): Promise<string> => {
  if (!value) return "";
  if (typeof value === "string") return value;

  try {
    const media = await wpFetch<{ source_url?: string }>(`media/${value}`, {
      cache: "no-store",
    });
    return media.source_url ?? "";
  } catch {
    return "";
  }
};

// Resuelve todas las imágenes de un post de personal en paralelo
// y devuelve un mapa campo → URL
export const resolvePersonalPostImages = async (
  post: PersonalPost,
): Promise<Record<string, string>> => {
  const imageFields: Array<[string, number | string | undefined]> = [
    ["imagendecano", post.acf?.imagendecano],
    ["imagen", post.acf?.imagen],
    ["imagencomision", post.acf?.imagencomision],
    ["imagenadministracion", post.acf?.imagenadministracion],
    ["imagenpersonalservicios", post.acf?.imagenpersonalservicios],
    ["fotodocente", post.acf?.fotodocente],
  ];

  const resolved = await Promise.all(
    imageFields.map(async ([key, val]) => [key, await resolveMediaUrl(val)] as [string, string]),
  );

  return Object.fromEntries(resolved);
};

/*
 * Resuelve los campos Image de la página Inicio (bannerimagen, imagennoticia).
 */
export const resolveInicioPaginaImages = async (
  acf: Pick<CarreraAcfSchema, "bannerimagen" | "imagennoticia">,
): Promise<Record<string, string>> => {
  const imageFields: Array<[string, number | string | undefined]> = [
    ["bannerimagen", acf.bannerimagen],
    ["imagennoticia", acf.imagennoticia],
  ];

  const resolved = await Promise.all(
    imageFields.map(async ([key, val]) => [key, await resolveMediaUrl(val)] as [string, string]),
  );

  return Object.fromEntries(resolved);
};
