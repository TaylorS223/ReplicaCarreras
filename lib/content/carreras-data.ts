// lib/content/carreras-data.ts
import type { CarreraContent } from "@/types/carrera-content";

// Estructura base — sirve como template para cualquier carrera nueva.
// El sync de ACF sobreescribe estos valores con datos reales de WordPress.
// Para carreras no registradas aquí, el resolver crea un store vacío dinámicamente.
export const CARRERAS_CONTENT: Record<string, CarreraContent> = {
  "arquitectura": {
    hero: { eyebrow: "", title: "", badge: "", description: "", images: [] },
    infoCards: [
      { iconClass: "fa fa-graduation-cap", title: "Titulo profesional", value: "", imagenFondo: "" },
      { iconClass: "fa fa-calendar",        title: "Jornada",           value: "", imagenFondo: "" },
      { iconClass: "fa fa-clock-o",         title: "Duración",          value: "", imagenFondo: "" },
      { iconClass: "fa fa-users",           title: "Modalidad",         value: "", imagenFondo: "" },
    ],
    misionVision: [
      { iconClass: "fa fa-bullseye",    title: "Misión", description: "" },
      { iconClass: "fa fa-lightbulb-o", title: "Visión", description: "" },
    ],
    profile: {
      sectionTitle: "",
      cards: [
        { iconClass: "fa fa-pencil-square-o", title: "Perfil de egreso",  paragraphs: [""] },
        { iconClass: "fa fa-briefcase",       title: "Campo laboral",     paragraphs: [""], cta: { label: "Malla curricular", href: "" } },
      ],
    },
    proyectos:    { title: "Noticias & Actualidad", description: "", items: [] },
    accreditation: { title: "Acreditación internacional", paragraphs: [""], cta: { label: "Conocer más", href: "" }, image: { src: "", alt: "" } },
    planEstudios: { title: "Plan de estudios", description: "", levels: [] },
    personal:     { title: "Personal docente", description: "", docentes: [] },
    docentes: [],
    noticias: [],
  },
};

export const getCarreraContentKey = (carreraSlug: string) => carreraSlug;

/** Genera un template vacío para cualquier carrera no registrada estáticamente. */
export const createBlankCarreraContent = (): CarreraContent => ({
  hero: { eyebrow: "", title: "", badge: "", description: "", images: [] },
  infoCards: [
    { iconClass: "fa fa-graduation-cap", title: "Titulo profesional", value: "", imagenFondo: "" },
    { iconClass: "fa fa-calendar",        title: "Jornada",           value: "", imagenFondo: "" },
    { iconClass: "fa fa-clock-o",         title: "Duración",          value: "", imagenFondo: "" },
    { iconClass: "fa fa-users",           title: "Modalidad",         value: "", imagenFondo: "" },
  ],
  misionVision: [
    { iconClass: "fa fa-bullseye",    title: "Misión", description: "" },
    { iconClass: "fa fa-lightbulb-o", title: "Visión", description: "" },
  ],
  profile: {
    sectionTitle: "",
    cards: [
      { iconClass: "fa fa-pencil-square-o", title: "Perfil de egreso", paragraphs: [""] },
      { iconClass: "fa fa-briefcase",       title: "Campo laboral",    paragraphs: [""], cta: { label: "Malla curricular", href: "" } },
    ],
  },
  proyectos:     { title: "Noticias & Actualidad", description: "", items: [] },
  accreditation: { title: "Acreditación internacional", paragraphs: [""], cta: { label: "Conocer más", href: "" }, image: { src: "", alt: "" } },
  planEstudios:  { title: "Plan de estudios", description: "", levels: [] },
  personal:      { title: "Personal docente", description: "", docentes: [] },
  docentes: [],
  noticias: [],
});

export const upsertCarreraContent = (
  _facultadSlug: string,
  carreraSlug: string,
  content: CarreraContent,
) => {
  CARRERAS_CONTENT[carreraSlug] = content;
};
