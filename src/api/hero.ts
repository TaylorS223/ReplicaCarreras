import type { HeroContent } from "@/types/api";

const heroContent: HeroContent = {
  eyebrow: "Facultad de Ingeniería, Industria y Arquitectura",
  title: "Carrera de",
  badge: "ARQUITECTURA",
  description:
    "Formación académica orientada al diseño, la planificación y la gestión de proyectos arquitectónicos y urbanos con enfoque sostenible, técnico y social.",
  images: [
    {
      src: "/imagenes/ACREDITACION-ARQUITECTURA-600x333.jpeg",
      alt: "Acreditación de Arquitectura ULEAM",
    },
    {
      src: "/imagenes/NOTICIA-1-600x333.jpeg",
      alt: "Estudiantes de arquitectura presentando proyectos",
    },
  ],
};

export const getHeroContent = (): HeroContent => heroContent;
