import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";
import type { Docente } from "@/types/docente";
import type { DecanatoProfile } from "@/types/decanato";
import type { DireccionCarreraProfile } from "@/types/direccionCarrera";
import type { ComisionProfile } from "@/types/comisiones";
import type { PersonalAdministrativoItem } from "@/types/administracionServicios";
import type { InicioPaginaContent, MateriaPlanEstudios } from "@/types/api";
import type { Noticia } from "@/types/noticia";
import type {
  CarreraAcfSchema,
  FacultadAcfSchema,
  InicioPaginaAcfSchema,
  NoticiaPost,
  PersonalPost,
  PlanEstudiosMateriaAcf,
  WpAcfEnvelope,
} from "@/lib/wordpress/acf/types";
import { resolveMediaUrl } from "@/lib/wordpress/acf/repository";

// Si ACF devuelve string usa la URL directamente; si devuelve ID numérico devuelve ""
// (el ID se resuelve a URL en repository.resolvePersonalPostImages antes de llegar aquí)
const resolveImageUrl = (value: number | string | undefined): string => {
  if (typeof value === "string" && value.length > 0) return value;
  return "";
};

const buildAcfError = (scope: string, slug: string) =>
  new Error(`ACF payload inválido para ${scope} "${slug}". Se esperaba acf.content.`);

export const mapFacultadFromAcf = (
  payload: WpAcfEnvelope<FacultadAcfSchema>,
): FacultadContent => {
  const content = payload.acf?.content;

  if (!content) {
    throw buildAcfError("facultad", payload.slug);
  }

  return content;
};

export const mapCarreraFromAcf = (payload: WpAcfEnvelope<CarreraAcfSchema>): CarreraContent => {
  const content = payload.acf?.content;

  if (!content) {
    throw buildAcfError("carrera", payload.slug);
  }

  return content;
};

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
    ? [{ label: "Publicaciones", href: post.acf.publicaciones }]
    : [],
  email: post.acf?.correoinsitucional ?? "",
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
  email: post.acf?.correoinsitucional ?? "",
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
  biografia: post.acf?.descripciondireccioncarrera
    ? [post.acf.descripciondireccioncarrera]
    : [],
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

  const email =
    post.acf?.emailadministracionservicios || post.acf?.emilpersonalservicios || "";

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

// ─── Página Inicio ────────────────────────────────────────────────────────────

const normalizeAcfDate = (value: string | undefined): string => {
  if (!value) return "";
  if (/^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }
  return value;
};

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

  eslogaMotivacional: acf.eslogamotivacional ?? "",
  perfilEgreso: acf.perfilegreso ?? "",
  campoLaboral: acf.campolaboral ?? "",
  mallaCurricular: acf.mallacurricular ?? "",

  imagenNoticia: images["imagennoticia"] ?? resolveImageUrl(acf.imagennoticia),
  fechaNoticia: normalizeAcfDate(acf.fechanoticia),

  descripcionAcreditacionInternacional: acf.descripcionacreditacioninternacional ?? "",
  enlaceAcreditacionInternacional: acf.enlaceacreditacioninternacional ?? "",

  materiasPlanEstudios: await Promise.all((acf.planestudios ?? []).map(mapMateriaFromAcf)),
});

export const mapNoticiaPost = (
  post: NoticiaPost,
  images: Record<string, string> = {},
): Noticia => {
  const rawDate = post.acf?.fechanoticia ?? post.date ?? "";
  const fechaISO = normalizeAcfDate(rawDate) || rawDate.slice(0, 10);

  const fechaTexto = fechaISO
    ? new Intl.DateTimeFormat("es-EC", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(fechaISO + "T00:00:00"))
    : "";

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
