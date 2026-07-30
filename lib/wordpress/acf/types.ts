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

// Campos ACF planos de la página de inicio de carrera (homepage del micrositio).
export type InicioPaginaAcfSchema = {
  // Banner principal
  bannerimagen?: number | string;
  bannerimagentexto?: string;
  bannerimagenenlace?: string;

  // Info cards de carrera
  tituloprofesional?: string;
  jornada?: string;
  duracion?: string;
  modalidad?: string;

  // Misión / Visión
  mision?: string;
  vision?: string;

  // Eslogan, perfil de egreso y campo laboral
  esloganmotivacional?: string;
  perfilegreso?: string;
  campolaboral?: string;
  mallacurricular?: string | { url?: string; title?: string; target?: string };

  // Noticia destacada — eliminado, ahora en CPT noticias

  // Acreditación internacional
  descripcionacreditacioninternacional?: string;
  enlaceacreditacioninternacional?: string;

  // Plan de estudios — repeater de materias
  planestudios?: PlanEstudiosMateriaAcf[];
};

/**
 * Fila del repeater "planestudios" en ACF.
 */
export type PlanEstudiosMateriaAcf = {
  nombremateria?: string;
  resultadoaprendizaje?: string;
  creditos?: number | string;
  silaboenlace?: number | string; // File field: ID o URL
};

export type CarreraAcfSchema = InicioPaginaAcfSchema & {
  content?: CarreraContent;
};

// Tipo: Decano
export type PersonalAcfDecano = {
  imagendecano?: number | string;
  nombredecano?: string;
  cargoasignado?: string;
  correoinstitucional?: string;
  ubicaciontrabajo?: string;
  horaatencion?: string;
  presentacionbreve?: string;
};

// Tipo: Dirección de Carrera
export type PersonalAcfDireccionCarrera = {
  imagen?: number | string;
  nombredireccioncarrera?: string;
  cargo?: string;
  correoinstitucionaldireccioncarrera?: string;
  ubicacionfacultaddireccioncarrea?: string;
  tiempo?: string;
  descripciondireccioncarrera?: string;
};

// Tipo: Docente
export type PersonalAcfDocente = {
  fotodocente?: number | string;
  nombredocente?: string;
  profesion?: string;
  areadocencia?: string;
  areaespecializacion?: string;
  formacionacademica?: string;
  publicaciones?: string | { url?: string; title?: string }; // campo Link en ACF
  correoinstitucional?: string;
  ubicaciontrabajo?: string;
  horarioatencion?: string;
};

// Tipo: Comisión
export type PersonalAcfComision = {
  imagencomision?: number | string;
  nombrepersonalcomision?: string;
  tipocargocomision?: string;
  emailcomision?: string;
  ubicacionfacultadcomision?: string;
  descripcioncomision?: string;
};

// Tipo: Administración
export type PersonalAcfAdministracion = {
  imagenadministracion?: number | string;
  nombreadministracion?: string;
  tipocargo?: string;
  emailadministracionservicios?: string;
  telefonoadminstracionservicio?: string;
  descripcionbreveadministracionservicio?: string;
};

// Tipo: Servicios
export type PersonalAcfServicios = {
  imagenpersonalservicios?: number | string;
  nombrepersonalservicios?: string;
  tipocargoservicios?: string;
  emilpersonalservicios?: string;
  ubicaclonfacultadservicios?: string;
  horasatencionpersonalservicios?: string;
};

// Unión de todos los posibles campos ACF del CPT Personal
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

// CPT Semestres — cada post es una materia con su nivel asignado via taxonomía
export type SemestrePostAcf = {
  nombremateria?: string;
  resultadoaprendizaje?: string;
  creditos?: number | string;
  silaboenlace?: number | string | { url?: string }; // File field: ID, URL o objeto
};

export type SemestrePost = WpAcfEnvelope<SemestrePostAcf> & {
  title: { rendered: string };
  nivel: number[]; // IDs de los términos de taxonomía
};

export type TipoPersonalSlug =
  | "docentes"
  | "administrativo"
  | "servicios"
  | "decano"
  | "comision"
  | "direccion-carrera";

// Mapa fijo de ID de término de taxonomía "nivel" → número de nivel
// Basado en los IDs reales de WordPress
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

// CPT Noticias — cada post es una noticia individual
export type NoticiaPostAcf = {
  imagennoticia?: number | string; // Image field: ID o URL
  fechanotifica?: string;          // Text field con la fecha
  titulonoticia?: string;          // Text field con el título
};

export type NoticiaPost = WpAcfEnvelope<NoticiaPostAcf> & {
  title: { rendered: string };
};
