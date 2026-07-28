import type { Carrera } from "@/types/carrera";

const mockCarreras: Carrera[] = [
  {
    slug: "arquitectura",
    nombre: "Arquitectura",
    descripcion: "Carrera orientada al diseño, urbanismo y sostenibilidad.",
    facultadSlug: "arquitectura",
    duracion: "10 semestres",
    modalidad: "Presencial",
    tituloOtorgado: "Arquitecto",
    href: "/arquitectura/carreras/arquitectura",
  },
];

export const getMockCarreras = () => mockCarreras;

export const getMockCarreraBySlug = (slug: string) =>
  mockCarreras.find((carrera) => carrera.slug === slug) ?? null;
