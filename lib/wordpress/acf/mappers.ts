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

const buildAcfError = (scope: string, slug: string) =>
  new Error(`ACF payload inválido para ${scope} \"${slug}\". Se esperaba acf.content.`);

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

// Mappers del CPT Personal — leen campos ACF planos de cada post individual

export const mapPersonalPostToDocente = (post: PersonalPost): Docente => ({
  slug: post.slug,
  nombre: post.acf?.nombre ?? post.title.rendered,
  titulo: post.acf?.titulo ?? "",
  foto: post.acf?.foto ?? "",
  alt: post.acf?.alt ?? post.acf?.nombre ?? post.title.rendered,
  especializacion: post.acf?.especializacion ?? "",
  formacionAcademica: post.acf?.formacion_academica ?? [],
  publicaciones: post.acf?.publicaciones ?? [],
  email: post.acf?.email ?? "",
  ubicacion: post.acf?.ubicacion ?? "",
});

export const mapPersonalPostToDecanatoProfile = (post: PersonalPost): DecanatoProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombre ?? post.title.rendered,
  cargo: post.acf?.cargo ?? "",
  foto: post.acf?.foto ?? "",
  alt: post.acf?.alt ?? post.acf?.nombre ?? post.title.rendered,
  email: post.acf?.email ?? "",
  ubicacion: post.acf?.ubicacion ?? "",
  horario: post.acf?.horario ?? "",
  biografia: post.acf?.biografia ?? [],
});

export const mapPersonalPostToDireccionCarreraProfile = (
  post: PersonalPost,
): DireccionCarreraProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombre ?? post.title.rendered,
  cargo: post.acf?.cargo ?? "",
  foto: post.acf?.foto ?? "",
  alt: post.acf?.alt ?? post.acf?.nombre ?? post.title.rendered,
  email: post.acf?.email ?? "",
  ubicacion: post.acf?.ubicacion ?? "",
  horario: post.acf?.horario ?? "",
  biografia: post.acf?.biografia ?? [],
});

export const mapPersonalPostToComisionProfile = (post: PersonalPost): ComisionProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombre ?? post.title.rendered,
  comision: post.acf?.comision ?? "",
  foto: post.acf?.foto ?? "",
  alt: post.acf?.alt ?? post.acf?.nombre ?? post.title.rendered,
  email: post.acf?.email ?? "",
  ubicacion: post.acf?.ubicacion ?? "",
  formacionAcademica: post.acf?.formacion_academica ?? [],
});

export const mapPersonalPostToAdministrativo = (
  post: PersonalPost,
): PersonalAdministrativoItem => ({
  slug: post.slug,
  nombre: post.acf?.nombre ?? post.title.rendered,
  cargo: post.acf?.cargo ?? "",
  foto: post.acf?.foto ?? "",
  alt: post.acf?.alt ?? post.acf?.nombre ?? post.title.rendered,
  email: post.acf?.email ?? "",
  ubicacion: post.acf?.ubicacion ?? "",
  horario: post.acf?.horario ?? "",
});
