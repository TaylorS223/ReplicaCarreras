import type { AccreditationContent, ProyectosContent } from "@/types/api";

const proyectosContent: ProyectosContent = {
  title: "Noticias & Actualidad",
  description:
    "",
  items: [
    {
      titulo: "Acreditación de Arquitectura, un logro académico internacional de la Uleam",
      fechaISO: "2025-07-22",
      fechaTexto: "22 de julio de 2025",
      imagen: "/imagenes/NOTICIA-1-600x333.jpeg",
      alt: "Acreditación de Arquitectura, un logro académico internacional de la Uleam",
      href: "/proyectos",
    },
    {
      titulo: "Proyectos comunitarios CORPOGAM",
      fechaISO: "2025-03-05",
      fechaTexto: "5 de marzo de 2025",
      imagen: "/imagenes/NOTICIA-2-600x333.jpeg",
      alt: "Proyectos comunitarios CORPOGAM",
      href: "/proyectos",
    },
    {
      titulo: "Proyecto «TuMUNI»",
      fechaISO: "2025-01-24",
      fechaTexto: "24 de enero de 2025",
      imagen: "/imagenes/NOTICIA-3-600x333.jpeg",
      alt: "Proyecto TuMUNI",
      href: "/proyectos",
    },
    {
      titulo: "Sesión Solemne FIIA",
      fechaISO: "2024-12-16",
      fechaTexto: "16 de diciembre de 2024",
      imagen: "/imagenes/ACREDITACION-ARQUITECTURA-600x333.jpeg",
      alt: "Sesión Solemne FIIA",
      href: "/proyectos",
    },
  ],
};

const accreditationContent: AccreditationContent = {
  title: "Acreditación internacional",
  paragraphs: [
    "Nuestra carrera trabaja para consolidarse como referente académico en Manabí y en el país. Este proceso fortalece la proyección institucional y reafirma el compromiso con la calidad, la mejora continua y la excelencia educativa.",
    "La acreditación impulsa una cultura de evaluación permanente, investigación aplicada y vinculación con el entorno, orientada a responder de manera efectiva a las necesidades del territorio y de la sociedad.",
    "Este avance posiciona a la carrera con mayor visibilidad nacional e internacional y respalda la formación de profesionales capaces de liderar proyectos con impacto real.",
  ],
  cta: {
    label: "Conocer el equipo",
    href: "/personal",
  },
  image: {
    src: "/imagenes/ACREDITACION-ARQUITECTURA-600x333.jpeg",
    alt: "Acreditación internacional Arquitectura ULEAM",
  },
};

export const getProyectosContent = (): ProyectosContent => proyectosContent;

export const getAccreditationContent = (): AccreditationContent => accreditationContent;
