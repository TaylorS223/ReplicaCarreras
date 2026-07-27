import type { ComisionesContent } from "@/types/comisiones";

const comisionesContent: ComisionesContent = {
  title: "Comisiones",
  description: "",
  profiles: [
    {
      slug: "valeria-moreira-zambrano",
      nombre: "Valeria Moreira Zambrano",
      comision: "Comisión Académica",
      foto: "/imagenes/MOREIRA-VALERIA-300x300.png",
      alt: "Valeria Moreira Zambrano",
      email: "valeria.moreira@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      formacionAcademica: [
        "Arquitecta; Pontificia Universidad Católica del Ecuador",
        "Máster universitario en ciudad y arquitectura sostenibles; Universidad de Sevilla",
      ],
    },
    {
      slug: "winderson-muentes-rivera",
      nombre: "Winderson Muentes Rivera",
      comision: "Comisión Vinculación",
      foto: "/imagenes/WINDERSON-MUENTES-300x300.png",
      alt: "Winderson Muentes Rivera",
      email: "winderson.muentes@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      formacionAcademica: [
        "Arquitecto; Universidad Laica Eloy Alfaro de Manabí",
        "Máster universitario en proyectos arquitectónicos: diseño ambiental y nuevas tecnologías; Universidad de Málaga",
      ],
    },
    {
      slug: "cristhian-melgar-veliz",
      nombre: "Cristhian Melgar Véliz",
      comision: "Comisión prácticas preprofesionales",
      foto: "/imagenes/MELGAR-CRISTHIAN-300x300.png",
      alt: "Cristhian Melgar Véliz",
      email: "cristhian.melgar@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      formacionAcademica: [
        "Arquitecto; Universidad Laica Eloy Alfaro de Manabí",
        "Máster oficial en innovación en arquitectura, tecnología y diseño; Universidad de Sevilla",
      ],
    },
    {
      slug: "gabriel-salvatierra-tumbaco",
      nombre: "Gabriel Salvatierra Tumbaco",
      comision: "Comisión Aseguramiento de la Calidad",
      foto: "/imagenes/SALVATIERRA-GABRIEL-300x300.png",
      alt: "Gabriel Salvatierra Tumbaco",
      email: "gabriel.salvatierra@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      formacionAcademica: [
        "Ingeniero en Sistemas Informáticos; Universidad Técnica de Manabí",
        "Magíster en planificación y diseño urbano mención en ciudades inteligentes; Universidad de los Hemisferios",
        "Máster universitario en evaluación de la calidad y procesos de certificación en educación superior; Universidad Internacional de la Rioja",
        "Máster Universitario en ingeniería de software y sistemas informáticos; Universidad Internacional de la Rioja",
      ],
    },
    {
      slug: "alejandro-mendoza-chavez",
      nombre: "Alejandro Mendoza Chávez",
      comision: "Titulación",
      foto: "/imagenes/MENDOZA-ALEJANDRO-300x300.png",
      alt: "Alejandro Mendoza Chávez",
      email: "alejandro.mendoza@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      formacionAcademica: [
        "Arquitecto; Universidad Laica Eloy Alfaro de Manabí",
        "Máster universitario en conservación y restauración del patrimonio arquitectónico; Universidad Politécnica de Madrid",
      ],
    },
    {
      slug: "fabricio-ormaza-garcia",
      nombre: "Fabricio Ormaza García",
      comision: "Seguimiento a graduados",
      foto: "/imagenes/ORMAZA-FABRICIO-300x300.png",
      alt: "Fabricio Ormaza García",
      email: "fabricio.ormaza@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      formacionAcademica: [
        "Arquitecto; Universidad Laica Eloy Alfaro de Manabí",
        "Máster oficial en innovación en arquitectura, tecnología y diseño; Universidad de Sevilla",
      ],
    },
    {
      slug: "fernando-represa-perez",
      nombre: "Fernando Represa Pérez",
      comision: "Comisión Investigación",
      foto: "/imagenes/FERNANDO-REPRESA-300x300.png",
      alt: "Fernando Represa Pérez",
      email: "fernando.represa@uleam.edu.ec",
      ubicacion: "Edificio Carrera de Arquitectura – FIIA B07",
      formacionAcademica: [
        "Licenciado en Derecho; Universidad de Valladolid",
        "Doctor en Ciencias Históricas y Geográficas, tecnología y diseño; Universidad de Burgos",
      ],
    },
  ],
};

export const getComisionesContent = (): ComisionesContent => comisionesContent;

