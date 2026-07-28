import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";

export type WpRestCollectionResponse<T> = T[];

export type WpAcfEnvelope<TAcf> = {
  id: number;
  slug: string;
  acf?: TAcf;
};

export type FacultadAcfSchema = {
  content?: FacultadContent;
};

export type CarreraAcfSchema = {
  content?: CarreraContent;
};

// CPT Personal — cada post es una persona con campos ACF planos
export type PersonalPostAcf = {
  nombre?: string;
  titulo?: string;
  foto?: string;
  alt?: string;
  especializacion?: string;
  email?: string;
  ubicacion?: string;
  horario?: string;
  cargo?: string;
  comision?: string;
  biografia?: string[];
  formacion_academica?: string[];
  publicaciones?: Array<{ label: string; href: string }>;
};

export type PersonalPost = WpAcfEnvelope<PersonalPostAcf> & {
  title: { rendered: string };
};

export type TipoPersonalSlug =
  | "docentes"
  | "administrativo"
  | "servicios"
  | "decano"
  | "comision";
