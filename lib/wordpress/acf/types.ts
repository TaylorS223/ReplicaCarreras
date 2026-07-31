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

export type InicioPaginaAcfSchema = {
  bannerimagen?: number | string;
  bannerimagentexto?: string;
  bannerimagenenlace?: string;
  tituloprofesional?: string;
  jornada?: string;
  duracion?: string;
  modalidad?: string;
  mision?: string;
  vision?: string;
  esloganmotivacional?: string;
  perfilegreso?: string;
  campolaboral?: string;
  mallacurricular?: string | { url?: string; title?: string; target?: string };
  descripcionacreditacioninternacional?: string;
  enlaceacreditacioninternacional?: string;
  imagennoticia?: number | string;
  fechanoticia?: string;
  planestudios?: PlanEstudiosMateriaAcf[];
};

export type PlanEstudiosMateriaAcf = {
  nombremateria?: string;
  resultadoaprendizaje?: string;
  creditos?: number | string;
  silaboenlace?: number | string;
};

export type CarreraAcfSchema = InicioPaginaAcfSchema & {
  content?: CarreraContent;
};

export type PersonalAcfDecano = {
  imagendecano?: number | string;
  nombredecano?: string;
  cargoasignado?: string;
  correoinstitucional?: string;
  ubicaciontrabajo?: string;
  horaatencion?: string;
  presentacionbreve?: string;
};

export type PersonalAcfDireccionCarrera = {
  imagen?: number | string;
  nombredireccioncarrera?: string;
  cargo?: string;
  correoinstitucionaldireccioncarrera?: string;
  ubicacionfacultaddireccioncarrea?: string;
  tiempo?: string;
  descripciondireccioncarrera?: string;
};

export type PersonalAcfDocente = {
  fotodocente?: number | string;
  nombredocente?: string;
  profesion?: string;
  areadocencia?: string;
  areaespecializacion?: string;
  formacionacademica?: string;
  publicaciones?: string | { url?: string; title?: string };
  correoinstitucional?: string;
  ubicaciontrabajo?: string;
  horarioatencion?: string;
};

export type PersonalAcfComision = {
  imagencomision?: number | string;
  nombrepersonalcomision?: string;
  tipocargocomision?: string;
  emailcomision?: string;
  ubicacionfacultadcomision?: string;
  descripcioncomision?: string;
};

export type PersonalAcfAdministracion = {
  imagenadministracion?: number | string;
  nombreadministracion?: string;
  tipocargo?: string;
  emailadministracionservicios?: string;
  telefonoadminstracionservicio?: string;
  descripcionbreveadministracionservicio?: string;
};

export type PersonalAcfServicios = {
  imagenpersonalservicios?: number | string;
  nombrepersonalservicios?: string;
  tipocargoservicios?: string;
  emilpersonalservicios?: string;
  ubicaclonfacultadservicios?: string;
  horasatencionpersonalservicios?: string;
};

export type PersonalPostAcf =
  & Partial<PersonalAcfDecano>
  & Partial<PersonalAcfDireccionCarrera>
  & Partial<PersonalAcfDocente>
  & Partial<PersonalAcfComision>
  & Partial<PersonalAcfAdministracion>
  & Partial<PersonalAcfServicios>;

export type PersonalPost = WpAcfEnvelope<PersonalPostAcf> & {
  title: { rendered: string };
};

export type SemestrePostAcf = {
  nombremateria?: string;
  resultadoaprendizaje?: string;
  creditos?: number | string;
  silaboenlace?: number | string | { url?: string };
};

export type SemestrePost = WpAcfEnvelope<SemestrePostAcf> & {
  title: { rendered: string };
  nivel: number[];
};

export type TipoPersonalSlug =
  | "docentes"
  | "administrativo"
  | "servicios"
  | "decano"
  | "comision"
  | "direccion-carrera";

export const NIVEL_ID_MAP: Record<number, number> = {
  82: 1,
  83: 2,
  84: 3,
  85: 4,
  86: 5,
  87: 6,
  88: 7,
  89: 8,
  90: 9,
  91: 10,
};

export type NoticiaPostAcf = {
  imagennoticia?: number | string;
  fechanotifica?: string;   // texto libre: "31 julio del 2026"
  titulonoticia?: string;
  autor?: string;
};

export type NoticiaPost = WpAcfEnvelope<NoticiaPostAcf> & {
  title: { rendered: string };
  content: { rendered: string };
  date: string;
};
