// lib/content/facultades-data.ts
import type { FacultadContent } from "@/types/facultad-content";

export const FACULTADES_CONTENT: Record<string, FacultadContent> = {
  arquitectura: {
    header: {
      brandImage: "/imagenes/LOGO-HEADER4-scaled.png",
      brandAlt: "Uleam Arquitectura",
      brandHref: "/",
      navItems: [
        { label: "Inicio", href: "/", isActive: true },
        {
          label: "Personal",
          href: "/personal",
          subItems: [
            { label: "Decanato", href: "/personal/decanato" },
            { label: "Direccion Carrera Arquitectura", href: "/personal/direccion-carrera" },
            { label: "Docentes", href: "/personal#docentes" },
            { label: "Comisiones", href: "/personal/comisiones" },
            { label: "Administracion y servicios", href: "/personal/administracion-servicios" },
          ],
        },
        {
          label: "Proyectos",
          href: "/proyectos",
          subItems: [
            { label: "Vinculacion con el medio", href: "/proyectos/vinculacion" },
            { label: "Investigacion", href: "/proyectos/investigacion" },
          ],
        },
        { label: "Plan de estudios", href: "/carreras/arquitectura/plan-estudios" },
      ],
    },

    footer: {
      brandImage: "/imagenes/LOGO-VERTICAL-768x384.png",
      brandAlt: "Uleam Arquitectura",
      location: "Manta, Vía San Mateo, Cdla. Universitaria",
      email: "arquitectura@uleam.edu.ec",
      groups: [
        {
          title: "Enlaces de interés",
          links: [
            { label: "Aula virtual Xicse", href: "https://campus.uleam.edu.ec/" },
            { label: "Moodle", href: "https://moodle.uleam.edu.ec/" },
            { label: "Biblioteca", href: "https://biblioteca.uleam.edu.ec/" },
            { label: "Tics", href: "https://tics.uleam.edu.ec/" },
            { label: "Aseguramiento de la Calidad", href: "https://www.uleam.edu.ec/aseguramiento-de-la-calidad/" },
            { label: "Correo institucional", href: "https://correo.uleam.edu.ec/" },
            { label: "Admisión y nivelación", href: "https://admision.uleam.edu.ec/" },
          ],
        },
        {
          title: "Aliados estratégicos",
          links: [
            { label: "MODUS", href: "https://modus.uleam.edu.ec/" },
            { label: "Revista FINIBUS", href: "https://finibus.uleam.edu.ec/" },
            { label: "GAD Manta", href: "https://manta.gob.ec/" },
            { label: "GAD Montecristi", href: "https://gadmontecristi.gob.ec/" },
            { label: "GIZ", href: "https://www.giz.de/en/html/index.html" },
            { label: "ONU Hábitat", href: "https://unhabitat.org/es" },
          ],
        },
      ],
      socialLinks: [
        { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61559256246770&locale=es_LA", platform: "facebook" },
        { label: "Instagram", href: "https://www.instagram.com/uleam.arquitectura/", platform: "instagram" },
      ],
      copyright: "Copyright Todos los derechos reservados, Arquitectura - FIIA - ULEAM",
    },

    decanato: {
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
    },

    direccionCarrera: {
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
    },

    comisiones: {
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
    },

    administracionServicios: {
      title: "Administración y servicios",
      description: "",
      groups: [
        {
          title: "Personal administrativo",
          items: [
            { slug: "merly-alarcon-zambrano", nombre: "Merly Alarcon Zambrano", cargo: "Secretaria Decanato", foto: "/imagenes/MERLY-ZAMBRANO-A-300x300.png", alt: "Merly Alarcon Zambrano", email: "merly.alarcon@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura – FIIA B07", horario: "8h00 – 17h00" },
            { slug: "rocio-mero-alvarado", nombre: "Rocio Mero Alvarado", cargo: "Secretaria carrera Arquitectura", foto: "/imagenes/MERO-ROCIO-300x300.png", alt: "Rocio Mero Alvarado", email: "elena.mero@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura – FIIA B07", horario: "8h00 – 17h00" },
            { slug: "angela-pizarro-marcillo", nombre: "Ángela Pizarro Marcillo", cargo: "Oficinista", foto: "/imagenes/ANGELA-PIZARRO-150x150.png", alt: "Ángela Pizarro Marcillo", email: "angela.pizarro@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura – FIIA B07", horario: "8h00 – 17h00" },
            { slug: "maria-rosa-moreira-munoz", nombre: "María Rosa Moreira Muñoz", cargo: "Técnico docente", foto: "/imagenes/MARIA-MOREIRA-150x150.png", alt: "María Rosa Moreira Muñoz", email: "mariar.moreira@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura – FIIA B07", horario: "8h00 – 17h00" },
          ],
        },
        {
          title: "Personal servicios varios",
          items: [
            { slug: "edgar-penafiel-palma", nombre: "Edgar Peñafiel Palma", cargo: "Auxiliar de servicios", foto: "/imagenes/EDGAR-PENAFIEL-150x150.png", alt: "Edgar Peñafiel Palma", email: "edgar.penafiel@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura – FIIA B07", horario: "12h00 – 19h30" },
            { slug: "juan-barberan-franco", nombre: "Juan Barberan Franco", cargo: "Auxiliar de servicios", foto: "/imagenes/JUAN-BARBERAN-FRANCO-150x150.png", alt: "Juan Barberan Franco", email: "juan.barberan@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura – FIIA B07", horario: "7h00 – 16h30" },
            { slug: "robert-alvia-santos", nombre: "Robert Alvia Santos", cargo: "Auxiliar de servicios", foto: "/imagenes/ROBERT-ALVIA-SANTOS-150x150.png", alt: "Robert Alvia Santos", email: "robert.alvia@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura – FIIA B07", horario: "6h30 – 15h30" },
          ],
        },
      ],
    },
  },
};

export const upsertFacultadContent = (facultadSlug: string, content: FacultadContent) => {
  FACULTADES_CONTENT[facultadSlug] = content;
};
