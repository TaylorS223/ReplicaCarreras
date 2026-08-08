import { wpFetch } from "@/lib/wordpress/client";
import { getCarreraTermId } from "@/lib/wordpress/services/getCarreraTermId";
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

// En desarrollo: revalidate:0 → cada request va directo a WordPress.
// En producción: ISR con revalidate + tags → caché de 1 hora, invalidable por webhook.
const IS_DEV = process.env.NODE_ENV === "development";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wpCache = (tags: string[]): { next: any } =>
  IS_DEV
    ? { next: { revalidate: 0 } }
    : { next: { revalidate: 3600, tags } };

const getFirstOrNull = <T>(items: T[]): T | null => items[0] ?? null;

// ── Filtrado por taxonomía "carrera" ─────────────────────────────────────────
//
// Filtra los CPTs por el ID del término de la taxonomía "carrera".
// El término se resuelve una vez por slug y se cachea en memoria.

async function buildCarreraFilter(
  carreraSlug: string | undefined,
): Promise<Record<string, string | number>> {
  if (!carreraSlug) return {};

  const termId = await getCarreraTermId(carreraSlug);

  if (termId !== null) {
    return { carrera: termId };
  }

  // Sin término → no filtrar (WordPress no disponible o término no existe aún)
  return {};
}

// ── Páginas ACF ───────────────────────────────────────────────────────────────

const fetchPageBySlug = async <TAcf>(slug: string) => {
  const pages = await wpFetch<WpRestCollectionResponse<WpAcfEnvelope<TAcf>>>("pages", {
    query: { slug, _fields: "id,slug,acf" },
    ...wpCache(["wp-pages"]),
  });
  return getFirstOrNull(pages);
};

export const getFacultadAcfEntry = async (facultadSlug: string) =>
  fetchPageBySlug<FacultadAcfSchema>(`facultad-${facultadSlug}`);

export const getCarreraAcfEntry = async (facultadSlug: string, carreraSlug: string) =>
  fetchPageBySlug<CarreraAcfSchema>(`carrera-${facultadSlug}-${carreraSlug}`);

// ── CPT Personal ──────────────────────────────────────────────────────────────

const TIPO_PERSONAL_ENDPOINT: Record<TipoPersonalSlug, string> = {
  decano: "decano",
  docentes: "docentes",
  comision: "comision",
  administrativo: "administracion",
  servicios: "servicios",
  "direccion-carrera": "direccion_carrera",
};

export const getPersonalByTipo = async (
  tipo: TipoPersonalSlug,
  perPage = 100,
  carreraSlug?: string,
  _facultadSlug?: string, // reservado para compatibilidad, no usado con taxonomía
): Promise<PersonalPost[]> => {
  const endpoint = TIPO_PERSONAL_ENDPOINT[tipo];
  const carreraFilter = await buildCarreraFilter(carreraSlug);

  return wpFetch<PersonalPost[]>(endpoint, {
    query: {
      per_page: perPage,
      _fields: "id,slug,title,acf",
      ...carreraFilter,
    },
    ...wpCache(["personal", `personal-${tipo}`, ...(carreraSlug ? [`personal-${tipo}-${carreraSlug}`] : [])]),
  });
};

// ── CPT Semestres ─────────────────────────────────────────────────────────────

export const getSemestres = async (
  perPage = 100,
  carreraSlug?: string,
  _facultadSlug?: string,
): Promise<SemestrePost[]> => {
  const carreraFilter = await buildCarreraFilter(carreraSlug);

  return wpFetch<SemestrePost[]>("semestres", {
    query: {
      per_page: perPage,
      _fields: "id,slug,title,acf,nivel",
      ...carreraFilter,
    },
    ...wpCache(["semestres", ...(carreraSlug ? [`semestres-${carreraSlug}`] : [])]),
  });
};

// ── CPT Noticias ──────────────────────────────────────────────────────────────

export const getNoticias = async (perPage = 100): Promise<NoticiaPost[]> => {
  return wpFetch<NoticiaPost[]>("noticias", {
    query: { per_page: perPage, _fields: "id,slug,title,acf" },
    ...wpCache(["noticias"]),
  });
};

export const getNoticiasCpt = async (
  perPage = 100,
  carreraSlug?: string,
  _facultadSlug?: string,
): Promise<NoticiaPost[]> => {
  const carreraFilter = await buildCarreraFilter(carreraSlug);

  return wpFetch<NoticiaPost[]>("noticias", {
    query: {
      per_page: perPage,
      orderby: "date",
      order: "desc",
      _fields: "id,slug,title,content,date,acf",
      ...carreraFilter,
    },
    ...wpCache(["noticias", ...(carreraSlug ? [`noticias-${carreraSlug}`] : [])]),
  });
};

// ── CPT Redes Sociales ────────────────────────────────────────────────────────

export const getRedesSociales = async (
  carreraSlug?: string,
  _facultadSlug?: string,
): Promise<RedSocialPost[]> => {
  const carreraFilter = await buildCarreraFilter(carreraSlug);

  return wpFetch<RedSocialPost[]>("redsocial", {
    query: {
      per_page: 100,
      _fields: "id,slug,title,acf,tipo_de_red_social",
      ...carreraFilter,
    },
    ...wpCache(["redes-sociales", ...(carreraSlug ? [`redes-sociales-${carreraSlug}`] : [])]),
  });
};

// ── CPT Enlaces de Interés ────────────────────────────────────────────────────

export const getEnlacesInteres = async (
  carreraSlug?: string,
  _facultadSlug?: string,
): Promise<EnlaceInteresPost[]> => {
  const carreraFilter = await buildCarreraFilter(carreraSlug);

  return wpFetch<EnlaceInteresPost[]>("enlace_de_interes", {
    query: {
      per_page: 100,
      _fields: "id,slug,title,acf",
      ...carreraFilter,
    },
    ...wpCache(["enlaces-interes", ...(carreraSlug ? [`enlaces-interes-${carreraSlug}`] : [])]),
  });
};

// ── Media ─────────────────────────────────────────────────────────────────────

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

// ── Resolvers de imágenes ─────────────────────────────────────────────────────

export const resolvePersonalPostImages = async (
  post: PersonalPost,
): Promise<Record<string, string>> => {
  const imageFields: Array<[string, number | string | undefined]> = [
    ["imagendecano",            post.acf?.imagendecano],
    ["imagen",                  post.acf?.imagen],
    ["imagencomision",          post.acf?.imagencomision],
    ["imagenadministracion",    post.acf?.imagenadministracion],
    ["imagenpersonalservicios", post.acf?.imagenpersonalservicios],
    ["fotodocente",             post.acf?.fotodocente],
  ];
  const resolved = await Promise.all(
    imageFields.map(async ([key, val]) => [key, await resolveMediaUrl(val)] as [string, string]),
  );
  return Object.fromEntries(resolved);
};

export const resolveInicioPaginaImages = async (
  acf: Pick<CarreraAcfSchema, "bannerimagen" | "imagennoticia">,
): Promise<Record<string, string>> => {
  const imageFields: Array<[string, number | string | undefined]> = [
    ["bannerimagen",  acf.bannerimagen],
    ["imagennoticia", acf.imagennoticia],
  ];
  const resolved = await Promise.all(
    imageFields.map(async ([key, val]) => [key, await resolveMediaUrl(val)] as [string, string]),
  );
  return Object.fromEntries(resolved);
};

// ── CPT Carrusel ──────────────────────────────────────────────────────────────

export const getCarruselCarrera = async (
  carreraSlug: string,
  _facultadSlug?: string,
): Promise<CarruselCarreraPost | null> => {
  // 1. Por slug exacto del post
  const bySlug = await wpFetch<CarruselCarreraPost[]>("carrusel_carrera", {
    query: { slug: carreraSlug, per_page: 1, _fields: "id,slug,title,acf" },
    ...wpCache(["carrusel", `carrusel-${carreraSlug}`]),
  }).catch(() => [] as CarruselCarreraPost[]);
  if (bySlug.length > 0) return bySlug[0];

  // 2. Por slug con prefijo slider-
  const byPrefixSlug = await wpFetch<CarruselCarreraPost[]>("carrusel_carrera", {
    query: { slug: `slider-${carreraSlug}`, per_page: 1, _fields: "id,slug,title,acf" },
    ...wpCache(["carrusel", `carrusel-${carreraSlug}`]),
  }).catch(() => [] as CarruselCarreraPost[]);
  if (byPrefixSlug.length > 0) return byPrefixSlug[0];

  // 3. Por término de taxonomía "carrera"
  const carreraFilter = await buildCarreraFilter(carreraSlug);
  const byTerm = await wpFetch<CarruselCarreraPost[]>("carrusel_carrera", {
    query: { per_page: 1, _fields: "id,slug,title,acf", ...carreraFilter },
    ...wpCache(["carrusel", `carrusel-${carreraSlug}`]),
  }).catch(() => [] as CarruselCarreraPost[]);

  return byTerm[0] ?? null;
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

export const resolveNoticiaImages = async (
  post: NoticiaPost,
): Promise<Record<string, string>> => {
  const resolved = await resolveMediaUrl(post.acf?.imagennoticia);
  return { imagennoticia: resolved };
};
