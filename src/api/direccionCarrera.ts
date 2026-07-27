import type { DireccionCarreraContent } from "@/types/direccionCarrera";

const direccionCarreraContent: DireccionCarreraContent = {
  title: "Dirección Carrera Arquitectura",
  description: "",
  profiles: [
    {
      slug: "tatiana-cedeno-delgado",
      nombre: "Tatiana Cedeño Delgado",
      cargo: "Directora de carrera Arquitectura",
      foto: "/imagenes/CEDENO-TATIANA-150x150.png",
      alt: "Tatiana Cedeño Delgado",
      email: "tatiana.cedeno@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      horario: "10h00 – 19h00",
      biografia: [
        "Arquitecta graduada en la Universidad Laica Eloy Alfaro de Manabí, con maestría en Planificación Territorial y Gestión Ambiental en la Universitat de Barcelona. En el sector público trabajó en la Secretaría Nacional de Planificación y Desarrollo (Senplades), involucrándose en temas de desarrollo y ordenamiento territorial, participando y liderando talleres de articulación, coordinación y acompañamiento técnico al ejecutivo desconcentrado y a los tres niveles de Gobiernos Autónomos Descentralizados de las Provincias de Manabí y Santo Domingo de los Tsáchilas.",
        "Ha participado en consultorías en Planes de Desarrollo y Ordenamiento Territorial de gobiernos locales. Realiza investigaciones en temas urbanos y ha participado en congresos a nivel nacional e internacional.",
        "Actualmente se encuentra cursando el programa de doctorado en Geografía, Planificación Territorial y Gestión Ambiental en la Universitat de Barcelona, y es docente titular en la carrera de Arquitectura de la Universidad Laica Eloy Alfaro de Manabí.",
      ],
    },
    {
      slug: "rocio-mero-alvarado",
      nombre: "Rocío Mero Alvarado",
      cargo: "Secretaria carrera Arquitectura",
      foto: "/imagenes/MERO-ROCIO-300x300.png",
      alt: "Rocío Mero Alvarado",
      email: "elena.mero@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      horario: "8h00 – 17h00",
      biografia: [],
    },
  ],
};

export const getDireccionCarreraContent = (): DireccionCarreraContent => direccionCarreraContent;
