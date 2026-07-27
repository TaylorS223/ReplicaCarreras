import type {
  InfoCard,
  MisionVisionItem,
  ProfileSectionContent,
} from "@/types/api";

const infoCards: InfoCard[] = [
  { iconClass: "fa fa-graduation-cap", title: "Titulo profesional", value: "Arquitecto" },
  { iconClass: "fa fa-calendar", title: "Jornada", value: "Diurno / vespertino" },
  { iconClass: "fa fa-clock-o", title: "Duración", value: "10 semestres" },
  { iconClass: "fa fa-users", title: "Modalidad", value: "Presencial" },
];

const misionVisionItems: MisionVisionItem[] = [
  {
    iconClass: "fa fa-bullseye",
    title: "Misión",
    description:
      "Formar profesionales propositivos y comprometidos con la transformación del entorno construido, mediante una práctica arquitectónica y urbana ética, contextual, interdisciplinaria, con enfoque territorial, cultural, sostenible, biocéntrico y comunitario.",
  },
  {
    iconClass: "fa fa-lightbulb-o",
    title: "Visión",
    description:
      "Al año 2030 ser una carrera acreditada a nivel nacional e internacional, que garantice la calidad en sus procesos y pertinencia para contribuir al desarrollo sostenible en el contexto regional y nacional.",
  },
];

const profileContent: ProfileSectionContent = {
  sectionTitle:
    "¡Construye el futuro, diseña tus sueños y transforma el mundo!\nArquitectura - Universidad Laica Eloy Alfaro de Manabí",
  cards: [
    {
      iconClass: "fa fa-pencil-square-o",
      title: "Perfil de egreso",
      paragraphs: [
        "La carrera de Arquitectura de la Universidad Laica Eloy Alfaro de Manabí (ULEAM) tiene como propósito formar profesionales con competencias integrales para diseñar, planificar, gestionar y ejecutar proyectos arquitectónicos y urbanos que respondan a los desafíos contemporáneos del desarrollo sostenible. Los egresados aplicarán soluciones innovadoras y responsables que mejoren la calidad de vida de las comunidades, respetando la diversidad cultural y promoviendo el equilibrio entre lo ambiental, social y económico.",
        "Los arquitectos y arquitectas de la ULEAM serán capaces de desarrollar propuestas arquitectónicas y urbanísticas integrales mediante la observación crítica, el análisis contextual y la interacción con diversos actores sociales. Su formación incluye el manejo de herramientas técnicas y digitales avanzadas, así como el dominio de principios estéticos, normativos y tecnológicos que garanticen la pertinencia, funcionalidad y calidad de sus proyectos. Además, se destaca su capacidad para comunicar ideas de manera efectiva, tanto de forma oral, escrita como gráfica, motivando la innovación e investigación.",
        "El egresado también se distinguirá por su compromiso ético y social, integrando criterios de sostenibilidad en sus diseños y procesos, promoviendo el uso eficiente de recursos y la preservación del medio ambiente. Será un profesional versátil, capaz de liderar equipos interdisciplinarios, gestionar proyectos de diversa escala y complejidad, y participar activamente en la investigación y desarrollo de soluciones que aborden las problemáticas del territorio.",
      ],
    },
    {
      iconClass: "fa fa-briefcase",
      title: "Campo laboral",
      paragraphs: [
        "Los arquitectos y arquitectas egresados de la Universidad Laica Eloy Alfaro de Manabí (ULEAM) cuentan con las competencias necesarias para identificar y abordar problemáticas urbanas y territoriales, proponiendo soluciones innovadoras, sostenibles y contextualizadas. Su formación les permite diseñar y gestionar proyectos de arquitectura y urbanismo en diversas escalas y niveles de complejidad, adaptándose a las dinámicas y desafíos del entorno construido.",
        "Gracias a esta preparación integral, pueden desempeñarse en distintos ámbitos, ya sea de manera independiente o en instituciones públicas y privadas, desarrollando actividades como:",
        "Asesoría, consultoría y evaluación en proyectos arquitectónicos, urbanos y territoriales.",
        "Formulación y gestión de planes, políticas y programas de desarrollo urbano y ordenamiento territorial.",
        "Diseño arquitectónico y urbano, con enfoques en eficiencia, innovación y sostenibilidad.",
        "Ejecución, dirección, supervisión e inspección de obras, garantizando calidad, viabilidad técnica y cumplimiento normativo.",
      ],
      cta: {
        label: "Malla curricular",
        href: "https://carreras.uleam.edu.ec/arquitectura-internacional/wp-content/uploads/sites/95/2025/02/MALLA-2024-NS-MICROSITIO-1.pdf",
      },
    },
  ],
};

export const getInfoCards = (): InfoCard[] => infoCards;

export const getMisionVisionItems = (): MisionVisionItem[] => misionVisionItems;

export const getProfileContent = (): ProfileSectionContent => profileContent;
