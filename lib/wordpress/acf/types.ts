import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";

export type WpRestCollectionResponse<T> = T[];

export type WpAcfEnvelope<TAcf> = {
  id: number;
  slug: string;
  acf?: TAcf;
};

// ── CPT Unidades (unidades del sílabo) ───────────────────────────────────────

export type UnidadPostAcf = {
  numero_unidad?: number | string;
  titulo_unidad?: string;
  temas_unidad?: string;
  resultado_aprendizaje_unidad?: string;
  codigo_resultado?: string;
  actividades_practicas?: string;
  semestre?: number; // ID del post de semestre al que pertenece
};

export type UnidadPost = WpAcfEnvelope<UnidadPostAcf> & {
  title: { rendered: string };
  carrera: number[];
};

// ── CPT Criterios (criterios de evaluación del sílabo) ───────────────────────

export type CriterioPostAcf = {
  tipo_evaluacion?: string;
  ambito?: string;
  porcentaje?: number | string;
  estrategias?: string;
  semestre?: number | string; // ID del post de semestre al que pertenece
};

export type CriterioPost = WpAcfEnvelope<CriterioPostAcf> & {
  title: { rendered: string };
  carrera: number[];
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
  emailpersonalservicios?: string;
  ubicacionfacultadservicios?: string;
  horaatencionpersonalservicios?: string;
};

export type PersonalPostAcf =
  & Partial<PersonalAcfDecano>
  & Partial<PersonalAcfDireccionCarrera>
  & Partial<PersonalAcfDocente>
  & Partial<PersonalAcfComision>
  & Partial<PersonalAcfAdministracion>
  & Partial<PersonalAcfServicios>
  & { nivel?: number | string }; // campo ACF de orden jerárquico

export type PersonalPost = WpAcfEnvelope<PersonalPostAcf> & {
  title: { rendered: string };
};

// Subtipos para los repeaters del sílabo
export type SilaboUnidadAcf = {
  numero_unidad?: number | string;
  titulo_unidad?: string;
  temas_unidad?: string;
  resultado_aprendizaje_unidad?: string;
  codigo_resultado?: string;
  actividades_practicas?: string;
};

export type SilaboEvaluacionAcf = {
  ambito?: string;
  tipo_evaluacion?: string;
  porcentaje?: number | string;
  estrategias?: string;
};

export type SilaboReferenciaAcf = {
  tipo_referencia?: "basica" | "complementaria" | string | false;
  autores?: string;
  anio?: number | string;
  titulo_obra?: string;
  editorial?: string;
  url_referencia?: string;
};

export type SemestrePostAcf = {
  // Campos originales
  nombremateria?: string;
  resultadoaprendizaje?: string;
  creditos?: number | string;
  silaboenlace?: number | string | { url?: string };

  // ── Grupo 1: Datos generales del sílabo ──
  codigo_asignatura?: string;
  nivel_malla?: string;
  modalidad?: string;
  sistema_estudio?: string;
  unidad_academica?: string;
  unidad_organizacion_curricular?: string;
  nucleo_formacion?: string;
  horas_contacto_docente?: number | string;
  horas_practico_experimental?: number | string;
  horas_autonomas?: number | string;
  horas_totales?: number | string;
  plan_curricular?: string;
  periodo_inicio_vigencia?: string;
  ultima_revision?: string;

  // ── Grupo 2: Contribución a la formación profesional ──
  objeto_estudio_carrera?: string;
  perfil_egreso?: string;
  resultado_aprendizaje_perfil?: string;
  resultado_aprendizaje_asignatura?: string;

  // ── Grupo 3: Unidad (campos planos — una unidad por post, legacy) ──
  numero_unidad?: number | string;
  titulo_unidad?: string;
  temas_unidad?: string;
  resultado_aprendizaje_unidad?: string;
  codigo_resultado?: string;
  actividades_practicas?: string;

  // ── Grupo 3 alternativo: Repeater unidades_contenido (ACF Pro) ──
  unidades_contenido?: SilaboUnidadAcf[];

  // ── Grupo 3 alternativo 2: Campos numerados sin ACF Pro ──
  // Siguen el mismo patrón que los campos de unidad 1 pero con sufijo _2, _3, _4
  // Unidad 2
  titulo_unidad_2?: string;
  temas_unidad_2?: string;
  resultado_aprendizaje_unidad_2?: string;
  codigo_resultado_2?: string;
  actividades_practicas_2?: string;
  // Unidad 3
  titulo_unidad_3?: string;
  temas_unidad_3?: string;
  resultado_aprendizaje_unidad_3?: string;
  codigo_resultado_3?: string;
  actividades_practicas_3?: string;
  // Unidad 4
  titulo_unidad_4?: string;
  temas_unidad_4?: string;
  resultado_aprendizaje_unidad_4?: string;
  codigo_resultado_4?: string;
  actividades_practicas_4?: string;

  // ── Grupo 4: Criterio de evaluación (campos planos) ──
  ambito?: string;
  tipo_evaluacion?: string;
  porcentaje?: number | string;
  estrategias?: string;

  // ── Grupo 4 alternativo: Repeater criterios_evaluacion (si se configura en WP) ──
  criterios_evaluacion?: SilaboEvaluacionAcf[];

  // ── Grupo 5: Referencia bibliográfica (campos planos) ──
  tipo_referencia?: "basica" | "complementaria" | string | false;
  autores?: string;
  anio?: number | string;
  titulo_obra?: string;
  editorial?: string;
  url_referencia?: string;

  // ── Grupo 5 alternativo: Repeater referencias_bibliograficas (si se configura en WP) ──
  referencias_bibliograficas?: SilaboReferenciaAcf[];
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
