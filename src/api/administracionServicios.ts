import type { AdministracionServiciosContent } from "@/types/administracionServicios";

const administracionServiciosContent: AdministracionServiciosContent = {
  title: "Administración y servicios",
  description: "",
  groups: [
    {
      title: "Personal administrativo",
      items: [
        {
          slug: "merly-alarcon-zambrano",
          nombre: "Merly Alarcon Zambrano",
          cargo: "Secretaria Decanato",
          foto: "/imagenes/MERLY-ZAMBRANO-A-300x300.png",
          alt: "Merly Alarcon Zambrano",
          email: "merly.alarcon@uleam.edu.ec",
          ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
          horario: "8h00 – 17h00",
        },
        {
          slug: "rocio-mero-alvarado",
          nombre: "Rocio Mero Alvarado",
          cargo: "Secretaria carrera Arquitectura",
          foto: "/imagenes/MERO-ROCIO-300x300.png",
          alt: "Rocio Mero Alvarado",
          email: "elena.mero@uleam.edu.ec",
          ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
          horario: "8h00 – 17h00",
        },
        {
          slug: "angela-pizarro-marcillo",
          nombre: "Ángela Pizarro Marcillo",
          cargo: "Oficinista",
          foto: "/imagenes/ANGELA-PIZARRO-150x150.png",
          alt: "Ángela Pizarro Marcillo",
          email: "angela.pizarro@uleam.edu.ec",
          ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
          horario: "8h00 – 17h00",
        },
        {
          slug: "maria-rosa-moreira-munoz",
          nombre: "María Rosa Moreira Muñoz",
          cargo: "Técnico docente",
          foto: "/imagenes/MARIA-MOREIRA-150x150.png",
          alt: "María Rosa Moreira Muñoz",
          email: "mariar.moreira@uleam.edu.ec",
          ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
          horario: "8h00 – 17h00",
        },
      ],
    },
    {
      title: "Personal servicios varios",
      items: [
        {
          slug: "edgar-penafiel-palma",
          nombre: "Edgar Peñafiel Palma",
          cargo: "Auxiliar de servicios",
          foto: "/imagenes/EDGAR-PENAFIEL-150x150.png",
          alt: "Edgar Peñafiel Palma",
          email: "edgar.penafiel@uleam.edu.ec",
          ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
          horario: "12h00 – 19h30",
        },
        {
          slug: "juan-barberan-franco",
          nombre: "Juan Barberan Franco",
          cargo: "Auxiliar de servicios",
          foto: "/imagenes/JUAN-BARBERAN-FRANCO-150x150.png",
          alt: "Juan Barberan Franco",
          email: "juan.barberan@uleam.edu.ec",
          ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
          horario: "7h00 – 16h30",
        },
        {
          slug: "robert-alvia-santos",
          nombre: "Robert Alvia Santos",
          cargo: "Auxiliar de servicios",
          foto: "/imagenes/ROBERT-ALVIA-SANTOS-150x150.png",
          alt: "Robert Alvia Santos",
          email: "robert.alvia@uleam.edu.ec",
          ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
          horario: "6h30 – 15h30",
        },
      ],
    },
  ],
};

export const getAdministracionServiciosContent = (): AdministracionServiciosContent =>
  administracionServiciosContent;
