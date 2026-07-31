import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";
import type { Docente } from "@/types/docente";
import type { DecanatoProfile } from "@/types/decanato";
import type { DireccionCarreraProfile } from "@/types/direccionCarrera";
import type { ComisionProfile } from "@/types/comisiones";
import type { PersonalAdministrativoItem } from "@/types/administracionServicios";
import type { InicioPaginaContent, MateriaPlanEstudios, PlanEstudiosContent, StudyLevel, Course } from "@/types/api";
import type { Noticia } from "@/types/noticia";
import type { Proyecto } from "@/types/proyecto";
import type {
  CarreraAcfSchema,
  FacultadAcfSchema,
  InicioPaginaAcfSchema,
  NoticiaPost,
  PersonalPost,
  PlanEstudiosMateriaAcf,
  SemestrePost,
  WpAcfEnvelope,
} from "@/lib/wordpress/acf/types";
import { NIVEL_ID_MAP } from "@/lib/wordpress/acf/types";
import { resolveMediaUrl } from "@/lib/wordpress/acf/repository";

const resolveImageUrl = (value: number | string | undefined): string => {
  if (typeof value === "string" && value.length > 0) return value;
  return "";
};

const buildAcfError = (scope: string, slug: string) =>
  new Error(`ACF payload inválido para ${scope} "${slug}". Se esperaba acf.content.`);

const normalizeAcfDate = (value: string | undefined): string => {
  if (!value) return "";
  if (/^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }
  return value;
};

export const mapFacultadFromAcf = (
  payload: WpAcfEnvelope<FacultadAcfSchema>,
): FacultadContent => {
  const content = payload.acf?.content;
  if (!content) throw buildAcfError("facultad", payload.slug);
  return content;
};

export const mapCarreraFromAcf = (payload: WpAcfEnvelope<CarreraAcfSchema>): CarreraContent => {
  const content = payload.acf?.content;
  if (!content) throw buildAcfError("carrera", payload.slug);
  return content;
};

// ── Plan de estudios desde CPT semestres ──────────────────────────────────────

const getSilaboUrl = async (value: number | string | { url?: string } | undefined): Promise<string> => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value.url ?? "";
  return resolveMediaUrl(value);
};

export const mapSemestrePostToCourse = async (post: SemestrePost): Promise<Course> => ({
  title: post.acf?.nombremateria ?? post.title.rendered,
  description: post.acf?.resultadoaprendizaje ?? "",
  credits: String(post.acf?.creditos ?? ""),
  syllabusUrl: await getSilaboUrl(post.acf?.silaboenlace),
});

export const mapSemestrePostsToPlanEstudios = async (
  posts: SemestrePost[],
  existing: PlanEstudiosContent,
): Promise<PlanEstudiosContent> => {
  if (posts.length === 0) return existing;

  const byLevel: Record<number, SemestrePost[]> = {};
  for (const post of posts) {
    const nivelId = post.nivel?.[0];
    const nivelNum = nivelId !== undefined ? (NIVEL_ID_MAP[nivelId] ?? null) : null;
    if (nivelNum === null) continue;
    if (!byLevel[nivelNum]) byLevel[nivelNum] = [];
    byLevel[nivelNum].push(post);
  }

  const levels: StudyLevel[] = await Promise.all(
    Array.from({ length: 10 }, async (_, i) => {
      const num = i + 1;
      const levelPosts = byLevel[num] ?? [];
      const existingLevel = existing.levels[i];

      if (levelPosts.length === 0) {
        return existingLevel ?? { title: `NIVEL ${num}`, totalCredits: "0", courses: [] };
      }

      const courses = await Promise.all(levelPosts.map(mapSemestrePostToCourse));
      const totalCredits = courses
        .reduce((acc, c) => acc + (parseFloat(c.credits) || 0), 0)
        .toFixed(1);

      return {
        title: existingLevel?.title ?? `NIVEL ${num}`,
        totalCredits,
        courses,
        open: existingLevel?.open,
      };
    }),
  );

  return { ...existing, levels };
};

// ── Campos planos de la página de carrera (Inicio/Homepage) ───────────────────

export const mergeCarreraFromInicioPagina = async (
  acf: CarreraAcfSchema,
  existing: CarreraContent,
): Promise<CarreraContent> => {
  const result = { ...existing };

  if (acf.bannerimagen || acf.bannerimagentexto) {
    const imagenUrl = acf.bannerimagen ? await resolveMediaUrl(acf.bannerimagen) : "";
    result.hero = {
      ...result.hero,
      ...(acf.bannerimagentexto ? { description: acf.bannerimagentexto } : {}),
      ...(imagenUrl ? { images: [{ src: imagenUrl, alt: acf.bannerimagentexto ?? "" }] } : {}),
    };
  }

  if (acf.mision || acf.vision) {
    result.misionVision = existing.misionVision.map((item) => {
      if (item.title.toLowerCase().includes("misión") || item.title.toLowerCase().includes("mision")) {
        return { ...item, description: acf.mision || item.description };
      }
      if (item.title.toLowerCase().includes("visión") || item.title.toLowerCase().includes("vision")) {
        return { ...item, description: acf.vision || item.description };
      }
      return item;
    });
  }

  if (acf.esloganmotivacional) {
    result.profile = { ...result.profile, sectionTitle: acf.esloganmotivacional };
  }

  if (acf.perfilegreso && result.profile.cards.length > 0) {
    const cards = [...result.profile.cards];
    cards[0] = { ...cards[0], paragraphs: [acf.perfilegreso] };
    result.profile = { ...result.profile, cards };
  }

  if (acf.campolaboral && result.profile.cards.length > 1) {
    const cards = [...result.profile.cards];
    cards[1] = {
      ...cards[1],
      paragraphs: [acf.campolaboral],
      cta: acf.mallacurricular
        ? {
            label: "Malla curricular",
            href: typeof acf.mallacurricular === "string"
              ? acf.mallacurricular
              : (acf.mallacurricular.url ?? ""),
          }
        : cards[1].cta,
    };
    result.profile = { ...result.profile, cards };
  }

  if (acf.descripcionacreditacioninternacional) {
    result.accreditation = {
      ...result.accreditation,
      paragraphs: [acf.descripcionacreditacioninternacional],
      ...(acf.enlaceacreditacioninternacional
        ? { cta: { ...result.accreditation.cta, href: acf.enlaceacreditacioninternacional } }
        : {}),
    };
  }

  if (acf.tituloprofesional || acf.jornada || acf.duracion || acf.modalidad) {
    result.infoCards = result.infoCards.map((card) => {
      const title = card.title.toLowerCase();
      if (title.includes("titulo") || title.includes("título") || title.includes("profesional")) {
        return { ...card, value: acf.tituloprofesional || card.value };
      }
      if (title.includes("jornada")) {
        return { ...card, value: acf.jornada || card.value };
      }
      if (title.includes("duración") || title.includes("duracion")) {
        return { ...card, value: acf.duracion || card.value };
      }
      if (title.includes("modalidad")) {
        return { ...card, value: acf.modalidad || card.value };
      }
      return card;
    });
  }

  return result;
};

// ── Personal ──────────────────────────────────────────────────────────────────

export const mapPersonalPostToDocente = (
  post: PersonalPost,
  images: Record<string, string> = {},
): Docente => ({
  slug: post.slug,
  nombre: post.acf?.nombredocente ?? post.title.rendered,
  titulo: post.acf?.profesion ?? "",
  foto: images["fotodocente"] ?? resolveImageUrl(post.acf?.fotodocente),
  alt: post.acf?.nombredocente ?? post.title.rendered,
  especializacion: post.acf?.areaespecializacion ?? post.acf?.areadocencia ?? "",
  formacionAcademica: post.acf?.formacionacademica ? [post.acf.formacionacademica] : [],
  publicaciones: post.acf?.publicaciones
    ? [{
        label: "Publicaciones",
        href: typeof post.acf.publicaciones === "string"
          ? post.acf.publicaciones
          : (post.acf.publicaciones.url ?? ""),
      }]
    : [],
  email: post.acf?.correoinstitucional ?? "",
  ubicacion: post.acf?.ubicaciontrabajo ?? "",
});

export const mapPersonalPostToDecanatoProfile = (
  post: PersonalPost,
  images: Record<string, string> = {},
): DecanatoProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombredecano ?? post.title.rendered,
  cargo: post.acf?.cargoasignado ?? "",
  foto: images["imagendecano"] ?? resolveImageUrl(post.acf?.imagendecano),
  alt: post.acf?.nombredecano ?? post.title.rendered,
  email: post.acf?.correoinstitucional ?? "",
  ubicacion: post.acf?.ubicaciontrabajo ?? "",
  horario: post.acf?.horaatencion ?? "",
  biografia: post.acf?.presentacionbreve ? [post.acf.presentacionbreve] : [],
});

export const mapPersonalPostToDireccionCarreraProfile = (
  post: PersonalPost,
  images: Record<string, string> = {},
): DireccionCarreraProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombredireccioncarrera ?? post.title.rendered,
  cargo: post.acf?.cargo ?? "",
  foto: images["imagen"] ?? resolveImageUrl(post.acf?.imagen),
  alt: post.acf?.nombredireccioncarrera ?? post.title.rendered,
  email: post.acf?.correoinstitucionaldireccioncarrera ?? "",
  ubicacion: post.acf?.ubicacionfacultaddireccioncarrea ?? "",
  horario: post.acf?.tiempo ?? "",
  biografia: post.acf?.descripciondireccioncarrera ? [post.acf.descripciondireccioncarrera] : [],
});

export const mapPersonalPostToComisionProfile = (
  post: PersonalPost,
  images: Record<string, string> = {},
): ComisionProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombrepersonalcomision ?? post.title.rendered,
  comision: post.acf?.tipocargocomision ?? "",
  foto: images["imagencomision"] ?? resolveImageUrl(post.acf?.imagencomision),
  alt: post.acf?.nombrepersonalcomision ?? post.title.rendered,
  email: post.acf?.emailcomision ?? "",
  ubicacion: post.acf?.ubicacionfacultadcomision ?? "",
  formacionAcademica: post.acf?.descripcioncomision ? [post.acf.descripcioncomision] : [],
});

export const mapPersonalPostToAdministrativo = (
  post: PersonalPost,
  images: Record<string, string> = {},
): PersonalAdministrativoItem => {
  const nombre =
    post.acf?.nombreadministracion ||
    post.acf?.nombrepersonalservicios ||
    post.title.rendered;
  const cargo = post.acf?.tipocargo || post.acf?.tipocargoservicios || "";
  const email = post.acf?.emailadministracionservicios || post.acf?.emilpersonalservicios || "";
  const ubicacion =
    post.acf?.telefonoadminstracionservicio || post.acf?.ubicaclonfacultadservicios || "";
  const horario =
    post.acf?.descripcionbreveadministracionservicio ||
    post.acf?.horasatencionpersonalservicios ||
    "";
  const foto =
    images["imagenadministracion"] ||
    images["imagenpersonalservicios"] ||
    resolveImageUrl(post.acf?.imagenadministracion) ||
    resolveImageUrl(post.acf?.imagenpersonalservicios);

  return { slug: post.slug, nombre, cargo, foto, alt: nombre, email, ubicacion, horario };
};

// ── CPT Noticias ──────────────────────────────────────────────────────────────

export const mapNoticiaPost = (
  post: NoticiaPost,
  images: Record<string, string> = {},
): Noticia => {
  const rawDate = post.date ?? "";
  const fechaISO = rawDate.slice(0, 10);
  const fechaTexto = post.acf?.fechanotifica ?? fechaISO;

  const contenidoRaw = post.content?.rendered ?? "";
  const contenido = contenidoRaw
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();

  return {
    slug: post.slug,
    titulo: post.title?.rendered ?? post.slug,
    fechaISO,
    fechaTexto,
    resumen: contenido.slice(0, 200),
    contenido,
    imagen: images["imagennoticia"] ?? resolveImageUrl(post.acf?.imagennoticia),
    alt: post.title?.rendered ?? post.slug,
    href: "",
    autor: post.acf?.autor ?? "gabrielsalvatierra",
  };
};

export const mapNoticiaPostToProyecto = async (
  post: NoticiaPost,
  facultadSlug: string,
): Promise<Proyecto> => {
  const imagen = await resolveMediaUrl(post.acf?.imagennoticia);
  const titulo = post.acf?.titulonoticia ?? post.title.rendered;
  const fechaISO = (post.date ?? "").slice(0, 10);
  const fechaTexto = post.acf?.fechanotifica ?? fechaISO;

  return {
    slug: post.slug,
    titulo,
    fechaISO,
    fechaTexto,
    imagen,
    alt: titulo,
    href: `/${facultadSlug}/noticias/${post.slug}`,
  };
};

// ── Página Inicio — campos ACF planos ──────────────────────────────────────────

const mapMateriaFromAcf = async (row: PlanEstudiosMateriaAcf): Promise<MateriaPlanEstudios> => ({
  nombreMateria: row.nombremateria ?? "",
  resultadoAprendizaje: row.resultadoaprendizaje ?? "",
  creditos: row.creditos !== undefined ? String(row.creditos) : "",
  silaboEnlace: await resolveMediaUrl(row.silaboenlace),
});

export const mapInicioPaginaFromAcf = async (
  acf: InicioPaginaAcfSchema,
  images: Record<string, string> = {},
): Promise<InicioPaginaContent> => ({
  bannerImagen: images["bannerimagen"] ?? resolveImageUrl(acf.bannerimagen),
  bannerImagenTexto: acf.bannerimagentexto ?? "",
  bannerImagenEnlace: acf.bannerimagenenlace ?? "",
  tituloProfesional: acf.tituloprofesional ?? "",
  jornada: acf.jornada ?? "",
  duracion: acf.duracion ?? "",
  modalidad: acf.modalidad ?? "",
  mision: acf.mision ?? "",
  vision: acf.vision ?? "",
  eslogaMotivacional: acf.esloganmotivacional ?? "",
  perfilEgreso: acf.perfilegreso ?? "",
  campoLaboral: acf.campolaboral ?? "",
  mallaCurricular: typeof acf.mallacurricular === "string"
    ? acf.mallacurricular
    : (acf.mallacurricular?.url ?? ""),
  imagenNoticia: images["imagennoticia"] ?? resolveImageUrl(acf.imagennoticia),
  fechaNoticia: normalizeAcfDate(acf.fechanoticia),
  descripcionAcreditacionInternacional: acf.descripcionacreditacioninternacional ?? "",
  enlaceAcreditacionInternacional: acf.enlaceacreditacioninternacional ?? "",
  materiasPlanEstudios: await Promise.all((acf.planestudios ?? []).map(mapMateriaFromAcf)),
});
