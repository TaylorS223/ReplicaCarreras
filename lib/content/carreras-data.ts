// lib/content/carreras-data.ts
import type { CarreraContent } from "@/types/carrera-content";

// Estructura base vacía — el sync de ACF la sobreescribe con datos reales de WordPress.
// Estos valores son solo el esqueleto necesario para que el merge funcione correctamente.
export const CARRERAS_CONTENT: Record<string, CarreraContent> = {
  "arquitectura:arquitectura": {
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

  // ── Software ──────────────────────────────────────────────────────────────
  "software:software": {
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

export const getCarreraContentKey = (facultadSlug: string, carreraSlug: string) =>
  `${facultadSlug}:${carreraSlug}`;

export const upsertCarreraContent = (
  facultadSlug: string,
  carreraSlug: string,
  content: CarreraContent,
) => {
  CARRERAS_CONTENT[getCarreraContentKey(facultadSlug, carreraSlug)] = content;
};
