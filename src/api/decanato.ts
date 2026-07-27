import type { DecanatoContent } from "@/types/decanato";

const decanatoContent: DecanatoContent = {
  title: "Decanato",
  description: "",
  profiles: [
    {
      slug: "hector-cedeno-zambrano",
      nombre: "Héctor Cedeño Zambrano",
      cargo: "Decano Facultad de Ingeniería, Industria y Arquitectura",
      foto: "/imagenes/HECTOR-CEDENO-150x150.png",
      alt: "Héctor Cedeño Zambrano",
      email: "hector.cedeno@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      horario: "9h00 – 18h00",
      biografia: [
        "Arquitecto graduado en la Universidad Laica Eloy Alfaro de Manabí en el año 2002, Magíster en Arquitectura Mención Diseño Urbano en la misma universidad. Doctor en Arquitectura y Urbanismo por la Universidad Bío Bío de Chile.",
        "Tiene trayectoria en el libre ejercicio profesional en diseño, planificación y construcción desde el año 2002, ha desempeñado los cargos de: concejal del cantón Portoviejo (2006 – 2007), miembro del Directorio Nacional del Colegio de Arquitectos CAE Ecuador, Asambleísta provincial por el CAE Manabí.",
        "Se desempeña como Docente de la Facultad de Arquitectura – Uleam desde el año 2002, y de postgrados, fue Vicerrector(s) y rector(e) actualmente ejerce la dignidad de Decano de la Facultad de Ingeniería Industria y Arquitectura. Durante su trayectoria de docencia e investigación, con estancia de investigación en el Laboratorio de estudios Urbanos Universidad del Bío Bío Chile 2011- 2013 y en el centro de política y valoración en la Universidad Politécnica de Cataluña 2013 ha realizado publicaciones y ponencias a nivel nacional e internacional, en líneas como urbanismo y sostenibilidad, temática de Expansión urbana de asentamientos indígenas rurales contexto latinoamericano caso Montañita – Ecuador; Vivienda Emergente para la provincia de Manabí.",
      ],
    },
    {
      slug: "merly-alarcon-zambrano",
      nombre: "Merly Alarcon Zambrano",
      cargo: "Secretaria Facultad de Ingeniería, Industria y Arquitectura",
      foto: "/imagenes/MERLY-ZAMBRANO-A-300x300.png",
      alt: "Merly Alarcon Zambrano",
      email: "merly.alarcon@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      horario: "8h00 – 17h00",
      biografia: [],
    },
  ],
};

export const getDecanatoContent = (): DecanatoContent => decanatoContent;
