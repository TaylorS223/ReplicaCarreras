import { wpFetch } from "@/lib/wordpress/client";
import type {
  CarreraAcfSchema,
  CarruselCarreraPost,
  EnlaceInteresPost,
  FacultadAcfSchema,
  NoticiaPost,
  PersonalPost,
  RedSocialPost,
  SemestrePost,
  TipoPersonalSlug,
  WpAcfEnvelope,
  WpRestCollectionResponse,
} from "@/lib/wordpress/acf/types";

// NOTA DE RENDIMIENTO (N+1 queries en imágenes ACF):
// Los campos ACF de tipo "Image" configurados para retornar "ID" obligan a una llamada
// adicional a /media/{id} por cada imagen. Para eliminar estas N+1 calls, configura
// los campos ACF en WordPress para que retornen "URL" directamente en lugar de "ID".
// Eso elimina por completo las llamadas a resolveMediaUrl para esos campos.

// En desarrollo: no-store → cada petición va directo a WordPress (cambios visibles al instante).
// En producción: ISR con revalidate + tags → caché de 1 hora, invalidable por webhook.
const IS_DEV = process.env.NODE_ENV === "development";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wpCache = (tags: string[]): { next: any } =>
  IS_DEV
    ? { next: { revalidate: 0 } }
    : { next: { revalidate: 3600, tags } };

const getFirstOrNull = <T>(items: T[]): T | null => items[0] ?? null;

const fetchPageBySlug = async <TAcf>(slug: string) => {
  const pages = await wpFetch<WpRestCollectionResponse<WpAcfEnvelope<TAcf>>>("pages", {
    query: {
      slug,
      _fields: "id,slug,acf",
    },
    ...wpCache(["wp-pages"]),
  });

  return getFirstOrNull(pages);
};

export const getFacultadAcfEntry = async (facultadSlug: string) =>
  fetchPageBySlug<FacultadAcfSchema>(`facultad-${facultadSlug}`);

export const getCarreraAcfEntry = async (facultadSlug: string, carreraSlug: string) =>
  fetchPageBySlug<CarreraAcfSchema>(`carrera-${facultadSlug}-${carreraSlug}`);

// Mapa de tipo de personal → endpoint REST del CPT correspondiente
const TIPO_PERSONAL_ENDPOINT: Record<TipoPersonalSlug, string> = {
  decano: "decano",
  docentes: "docentes",
  comision: "comision",
  administrativo: "administracion",
  servicios: "servicios",
  "direccion-carrera": "direccion_carrera",
};

// Fetch del CPT de personal por tipo
export const getPersonalByTipo = async (
  tipo: TipoPersonalSlug,
  perPage = 100,
): Promise<PersonalPost[]> => {
  const endpoint = TIPO_PERSONAL_ENDPOINT[tipo];

  return wpFetch<PersonalPost[]>(endpoint, {
    query: {
      per_page: perPage,
      _fields: "id,slug,title,acf",
    },
    ...wpCache(["personal", `personal-${tipo}`]),
  });
};

// Fetch de todas las materias del CPT semestres
export const getSemestres = async (perPage = 100): Promise<SemestrePost[]> => {
  return wpFetch<SemestrePost[]>("semestres", {
    query: {
      per_page: perPage,
      _fields: "id,slug,title,acf,nivel",
    },
    ...wpCache(["semestres"]),
  });
};

// Fetch de todas las noticias del CPT noticias
export const getNoticias = async (perPage = 100): Promise<NoticiaPost[]> => {
  return wpFetch<NoticiaPost[]>("noticias", {
    query: {
      per_page: perPage,
      _fields: "id,slug,title,acf",
    },
    ...wpCache(["noticias"]),
  });
};

// Fetch de todas las redes sociales del CPT redsocial
export const getRedesSociales = async (): Promise<RedSocialPost[]> => {
  return wpFetch<RedSocialPost[]>("redsocial", {
    query: {
      per_page: 100,
      _fields: "id,slug,title,acf,tipo_de_red_social",
    },
    ...wpCache(["redes-sociales"]),
  });
};

// Fetch de todos los enlaces de interés del CPT enlace_de_interes
export const getEnlacesInteres = async (): Promise<EnlaceInteresPost[]> => {
  return wpFetch<EnlaceInteresPost[]>("enlace_de_interes", {
    query: {
      per_page: 100,
      _fields: "id,slug,title,acf",
    },
    ...wpCache(["enlaces-interes"]),
  });
};

export const resolveMediaUrl = async (value: number | string | undefined): Promise<string> => {
  if (!value) return "";
  if (typeof value === "string") return value;

  try {
    const media = await wpFetch<{ source_url?: string }>(`media/${value}`, {
      ...wpCache(["wp-media"]),
    });
    return media.source_url ?? "";
  } catch {
    return "";
  }
};

// Resuelve todas las imágenes de un post de personal en paralelo
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

// Resuelve los campos Image de la página Inicio (bannerimagen, imagennoticia)
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

export const getCarruselCarrera = async (carreraSlug: string): Promise<CarruselCarreraPost | null> => {
  const bySlug = await wpFetch<CarruselCarreraPost[]>("carrusel_carrera", {
    query: { slug: carreraSlug, per_page: 1, _fields: "id,slug,title,acf" },
    ...wpCache(["carrusel"]),
  }).catch(() => [] as CarruselCarreraPost[]);

  if (bySlug.length > 0) return bySlug[0];

  const byPrefixSlug = await wpFetch<CarruselCarreraPost[]>("carrusel_carrera", {
    query: { slug: `slider-${carreraSlug}`, per_page: 1, _fields: "id,slug,title,acf" },
    ...wpCache(["carrusel"]),
  }).catch(() => [] as CarruselCarreraPost[]);

  if (byPrefixSlug.length > 0) return byPrefixSlug[0];

  const all = await wpFetch<CarruselCarreraPost[]>("carrusel_carrera", {
    query: { per_page: 1, _fields: "id,slug,title,acf" },
    ...wpCache(["carrusel"]),
  }).catch(() => [] as CarruselCarreraPost[]);

  return all[0] ?? null;
};

export const resolveCarruselImages = async (
  acf: import("@/lib/wordpress/acf/types").CarruselCarreraAcfSchema,
): Promise<Record<string, string>> => {
  const fields: Array<[string, number | string | undefined]> = [
    ["slide1_imagen_fondo",      acf.slide1_imagen_fondo],
    ["slide1_imagen_superior",   acf.slide1_imagen_superior],
    ["slide1_logo_acreditacion", acf.slide1_logo_acreditacion],
    ["slide2_imagen_fondo",      acf.slide2_imagen_fondo],
    ["slide2_imagen_superior",   acf.slide2_imagen_superior],
    ["slide3_imagen_fondo",      acf.slide3_imagen_fondo],
    ["slide3_imagen_superior",   acf.slide3_imagen_superior],
    ["slide4_imagen_fondo",      acf.slide4_imagen_fondo],
    ["slide4_imagen_superior",   acf.slide4_imagen_superior],
  ];
  const resolved = await Promise.all(
    fields.map(async ([key, val]) => [key, await resolveMediaUrl(val)] as [string, string]),
  );
  return Object.fromEntries(resolved);
};

export const getNoticiasCpt = async (perPage = 100): Promise<NoticiaPost[]> =>
  wpFetch<NoticiaPost[]>("noticias", {
    query: {
      per_page: perPage,
      orderby: "date",
      order: "desc",
      _fields: "id,slug,title,content,date,acf",
    },
    ...wpCache(["noticias"]),
  });

export const resolveNoticiaImages = async (
  post: NoticiaPost,
): Promise<Record<string, string>> => {
  const resolved = await resolveMediaUrl(post.acf?.imagennoticia);
  return { imagennoticia: resolved };
};
