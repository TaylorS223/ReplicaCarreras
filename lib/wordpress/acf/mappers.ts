import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";
import type { Docente } from "@/types/docente";
import type { DecanatoProfile } from "@/types/decanato";
import type { DireccionCarreraProfile } from "@/types/direccionCarrera";
import type { ComisionProfile } from "@/types/comisiones";
import type { PersonalAdministrativoItem } from "@/types/administracionServicios";
import type {
  CarreraAcfSchema,
  FacultadAcfSchema,
  PersonalPost,
  WpAcfEnvelope,
} from "@/lib/wordpress/acf/types";

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
