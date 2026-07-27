import type { Docente } from "@/types/docente";
import type { PersonalContent } from "@/types/api";

const DEFAULT_PUBLICATIONS = [
  { label: "Google Scholar", href: "https://scholar.google.com/" },
  { label: "ResearchGate", href: "https://www.researchgate.net/" },
];

const buildDocente = (
  docente: Omit<Docente, "especializacion" | "formacionAcademica" | "publicaciones" | "email" | "ubicacion"> &
    Partial<Pick<Docente, "especializacion" | "formacionAcademica" | "publicaciones" | "email" | "ubicacion">>,
): Docente => ({
  especializacion:
    docente.especializacion ??
    "Diseño arquitectónico, planificación urbana y docencia universitaria",
  formacionAcademica:
    docente.formacionAcademica ??
    [
      `${docente.titulo}; Universidad Laica Eloy Alfaro de Manabí`,
      "Formación complementaria en investigación y gestión de proyectos",
    ],
  publicaciones: docente.publicaciones ?? DEFAULT_PUBLICATIONS,
  email: docente.email ?? `${docente.slug}@uleam.edu.ec`,
  ubicacion: docente.ubicacion ?? "Edificio Carrera de Arquitectura - FIIA B07",
  ...docente,
});

const docentes: Docente[] = [
  buildDocente({
    slug: "abel-quimis-chilan",
    nombre: "Abel Quimis Chilan",
    titulo: "Arquitecto",
    foto: "/imagenes/QUIMIS-ABEL-150x150.png",
    alt: "Abel Quimis Chilan",
  }),
  buildDocente({
    slug: "alejandro-mendoza-chavez",
    nombre: "Alejandro Mendoza Chávez",
    titulo: "Arquitecto",
    foto: "/imagenes/MENDOZA-ALEJANDRO-150x150.png",
    alt: "Alejandro Mendoza Chávez",
  }),
  buildDocente({
    slug: "andrea-intriago-landazuri",
    nombre: "Andrea Intriago Landázuri",
    titulo: "Arquitecta",
    foto: "/imagenes/INTRIAGO-ANDREA-150x150.png",
    alt: "Andrea Intriago Landázuri",
  }),
  buildDocente({
    slug: "armando-zambrano-loor",
    nombre: "Armando Zambrano Loor",
    titulo: "Arquitecto",
    foto: "/imagenes/ZAMBRANO-ARMANDO-150x150.png",
    alt: "Armando Zambrano Loor",
  }),
  buildDocente({
    slug: "cesar-palma-espinel",
    nombre: "César Palma Espinel",
    titulo: "Arquitecto",
    foto: "/imagenes/CESAR-PALMA-150x150.png",
    alt: "César Palma Espinel",
  }),
  buildDocente({
    slug: "cristhian-melgar-veliz",
    nombre: "Cristhian Melgar Véliz",
    titulo: "Arquitecto",
    foto: "/imagenes/MELGAR-CRISTHIAN-150x150.png",
    alt: "Cristhian Melgar Véliz",
  }),
  buildDocente({
    slug: "erick-cevallos-viera",
    nombre: "Erick Cevallos Viera",
    titulo: "Arquitecto",
    foto: "/imagenes/CEVALLOS-ERICK-150x150.png",
    alt: "Erick Cevallos Viera",
  }),
  buildDocente({
    slug: "fabricio-ormaza-garcia",
    nombre: "Fabricio Ormaza García",
    titulo: "Arquitecto",
    foto: "/imagenes/ORMAZA-FABRICIO-150x150.png",
    alt: "Fabricio Ormaza García",
  }),
  buildDocente({
    slug: "fernando-represa-perez",
    nombre: "Fernando Represa Pérez",
    titulo: "Doctor",
    foto: "/imagenes/FERNANDO-REPRESA-150x150.png",
    alt: "Fernando Represa Pérez",
  }),
  buildDocente({
    slug: "francisco-delgado-sanz",
    nombre: "Francisco Delgado Sanz",
    titulo: "Ingeniero",
    foto: "/imagenes/DELGADO-FRANCISCO-150x150.png",
    alt: "Francisco Delgado Sanz",
  }),
  buildDocente({
    slug: "fulton-pesantes-macias",
    nombre: "Fulton Pesantes Macías",
    titulo: "Arquitecto",
    foto: "/imagenes/FULTON-PESANTES-150x150.png",
    alt: "Fulton Pesantes Macías",
  }),
  buildDocente({
    slug: "gabriel-barba-espinel",
    nombre: "Gabriel Barba Espinel",
    titulo: "Arquitecto",
    foto: "/imagenes/BARBA-GABRIEL-150x150.png",
    alt: "Gabriel Barba Espinel",
  }),
  buildDocente({
    slug: "marcos-gallo-zambrano",
    nombre: "Marcos Gallo Zambrano",
    titulo: "Arquitecto",
    foto: "/imagenes/GALLO-MARCOS-150x150.png",
    alt: "Marcos Gallo Zambrano",
  }),
  buildDocente({
    slug: "nadia-aveiga-villacis",
    nombre: "Nadia Aveiga Villacís",
    titulo: "Arquitecta",
    foto: "/imagenes/AVEIGA-NADIA-150x150.png",
    alt: "Nadia Aveiga Villacís",
  }),
  buildDocente({
    slug: "nemar-torres-reyes",
    nombre: "Nemar Torres Reyes",
    titulo: "Arquitecto",
    foto: "/imagenes/TORRES-NEMAR-150x150.png",
    alt: "Nemar Torres Reyes",
  }),
  buildDocente({
    slug: "pablo-garcia-delgado",
    nombre: "Pablo García Delgado",
    titulo: "Arquitecto",
    foto: "/imagenes/GARCIA-PABLO-150x150.png",
    alt: "Pablo García Delgado",
  }),
  buildDocente({
    slug: "ricardo-avila-avila",
    nombre: "Ricardo Ávila Ávila",
    titulo: "Arquitecto",
    foto: "/imagenes/AVILA-RICARDO-150x150.png",
    alt: "Ricardo Ávila Ávila",
  }),
  buildDocente({
    slug: "tatiana-cedeno-delgado",
    nombre: "Tatiana Gabriela Cedeño Delgado",
    titulo: "Arquitecta",
    foto: "/imagenes/CEDENO-TATIANA-150x150.png",
    alt: "Tatiana Gabriela Cedeño Delgado",
    especializacion: "Planificación territorial, investigación en urbanismo y docencia",
    formacionAcademica: [
      "Arquitecta; Universidad Laica Eloy Alfaro de Manabí",
      "Máster universitario en planificación territorial y gestión Ambiental – Universitat de Barcelona – España",
    ],
    email: "tatiana.cedeno@uleam.edu.ec",
    ubicacion: "Edificio Carrera de Arquitectura - FIIA B07",
  }),
  buildDocente({
    slug: "valeria-moreira-zambrano",
    nombre: "Valeria Moreira Zambrano",
    titulo: "Arquitecta",
    foto: "/imagenes/MOREIRA-VALERIA-150x150.png",
    alt: "Valeria Moreira Zambrano",
  }),
  buildDocente({
    slug: "winderson-muentes-rivera",
    nombre: "Winderson Muentes Rivera",
    titulo: "Arquitecto",
    foto: "/imagenes/WINDERSON-MUENTES-150x150.png",
    alt: "Winderson Muentes Rivera",
  }),
];

const personalContent: PersonalContent = {
  title: "Personal docente",
  description: "",
  docentes,
};

export const getPersonalContent = (): PersonalContent => personalContent;

export const getDocenteBySlug = (slug: string): Docente | undefined =>
  docentes.find((docente) => docente.slug === slug);

export const getDocenteSlugs = (): string[] => docentes.map((docente) => docente.slug);
