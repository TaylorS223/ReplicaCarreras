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
  titulomision?: string;
  titulovision?: string;
  esloganmotivacional?: string;
  perfilegreso?: string;
  tituloperfilegreso?: string;
  campolaboral?: string;
  titulocampolaboral?: string;
  mallacurricular?: string | { url?: string; title?: string; target?: string };
  descripcionacreditacioninternacional?: string;
  enlaceacreditacioninternacional?: string;
  tituloacreditacioninternacional?: string;
  logo?: number | string;              // logoAcreditadoraNavbar (nombre real en la API)
  logoacreditadorafooter?: number | string;
  ubicacion?: string;
  correocarrera?: string;
  aliadosestrategicos?: string;
  copyright?: string;
  menuinicio?: string;
  menupersonal?: string;
  menuproyectos?: string;
  menuplanestudio?: string;
  imagennoticia?: number | string;
  fechanoticia?: string;
  hometitulonoticiaactualidad?: string;
  planestudios?: PlanEstudiosMateriaAcf[];
  // Imágenes de fondo para las InfoCards
  imagentituloprofesional?: number | string;
  imagenjornada?: number | string;
  imagenduracion?: number | string;
  imagenmodalidad?: number | string;
  // Video para sección de acreditación
  videourl?: string | { url?: string; title?: string; target?: string };
  miniaturavideo?: number | string;
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
  publicaciongooglescholar?: string | { url?: string; title?: string; target?: string } | null;
  publicacionresearchgate?: string | { url?: string; title?: string; target?: string } | null;
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

// CPT Redes Sociales
export type RedSocialPostAcf = {
  redessociales?: {
    title?: string;
    url?: string;
    target?: string;
  };
};

export type RedSocialPost = WpAcfEnvelope<RedSocialPostAcf> & {
  title: { rendered: string };
  tipo_de_red_social: number[];
};

export type TipoRedSocialSlug = "instagram" | "facebook" | "tiktok" | "youtube";

// Mapa de IDs de términos de tipo_de_red_social → slug
export const RED_SOCIAL_ID_MAP: Record<number, TipoRedSocialSlug> = {
  92: "instagram",
  93: "facebook",
  94: "tiktok",
  95: "youtube",
};

export type EnlaceInteresPost = WpAcfEnvelope<EnlaceInteresPostAcf> & {
  title: { rendered: string };
};
export type CarruselCarreraAcfSchema = {
  // Slide 1 — Acreditación
  slide1_imagen_fondo?: number | string;
  slide1_imagen_superior?: number | string;
  slide1_logo_acreditacion?: number | string;
  slide1_titulo?: string;
  slide1_badge_texto?: string;
  slide1_duracion?: string;
  slide1_modalidad_sedes?: string;
  slide1_texto_acreditacion?: string;
  slide1_boton_enlace?: string | { url?: string; title?: string; target?: string };

  // Slide 2 — Carrera
  slide2_imagen_fondo?: number | string;
  slide2_imagen_superior?: number | string;
  slide2_titulo?: string;
  slide2_etiqueta_superior?: string;
  slide2_subtitulo?: string;

  // Slide 3 — Taller
  slide3_imagen_fondo?: number | string;
  slide3_imagen_superior?: number | string;
  slide3_titulo?: string;
  slide3_etiqueta_superior?: string;
  slide3_subtitulo?: string;

  // Slide 4 — Espacios
  slide4_imagen_fondo?: number | string;
  slide4_imagen_superior?: number | string;
  slide4_titulo?: string;
  slide4_etiqueta_superior?: string;
  slide4_subtitulo?: string;
};

export type CarruselCarreraPost = WpAcfEnvelope<CarruselCarreraAcfSchema> & {
  title: { rendered: string };
  slug: string;
};

// CPT enlace_de_interes
export type EnlaceInteresPostAcf = {
  enlaces?: {
    title?: string;
    url?: string;
    target?: string;
  };
};
