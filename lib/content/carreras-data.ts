// lib/content/carreras-data.ts
import type { CarreraContent } from "@/types/carrera-content";

const syllabusUrl =
  "https://drive.google.com/file/d/1q1QYfHX8_9qY4cv5BmOkjPy2DJTcpLby/view?usp=drive_link";

const DEFAULT_PUBLICATIONS = [
  { label: "Google Scholar", href: "https://scholar.google.com/" },
  { label: "ResearchGate", href: "https://www.researchgate.net/" },
];

export const CARRERAS_CONTENT: Record<string, CarreraContent> = {
  "arquitectura:arquitectura": {
    hero: {
      eyebrow: "Facultad de Ingeniería, Industria y Arquitectura",
      title: "Carrera de",
      badge: "ARQUITECTURA",
      description:
        "Formación académica orientada al diseño, la planificación y la gestión de proyectos arquitectónicos y urbanos con enfoque sostenible, técnico y social.",
      images: [
        { src: "/imagenes/ACREDITACION-ARQUITECTURA-600x333.jpeg", alt: "Acreditación de Arquitectura ULEAM" },
        { src: "/imagenes/NOTICIA-1-600x333.jpeg", alt: "Estudiantes de arquitectura presentando proyectos" },
      ],
    },

    infoCards: [
      { iconClass: "fa fa-graduation-cap", title: "Titulo profesional", value: "Arquitecto" },
      { iconClass: "fa fa-calendar", title: "Jornada", value: "Diurno / vespertino" },
      { iconClass: "fa fa-clock-o", title: "Duración", value: "10 semestres" },
      { iconClass: "fa fa-users", title: "Modalidad", value: "Presencial" },
    ],

    misionVision: [
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
    ],

    profile: {
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
    },

    proyectos: {
      title: "Noticias & Actualidad",
      description: "",
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
    },

    accreditation: {
      title: "Acreditación internacional",
      paragraphs: [
        "Nuestra carrera trabaja para consolidarse como referente académico en Manabí y en el país. Este proceso fortalece la proyección institucional y reafirma el compromiso con la calidad, la mejora continua y la excelencia educativa.",
        "La acreditación impulsa una cultura de evaluación permanente, investigación aplicada y vinculación con el entorno, orientada a responder de manera efectiva a las necesidades del territorio y de la sociedad.",
        "Este avance posiciona a la carrera con mayor visibilidad nacional e internacional y respalda la formación de profesionales capaces de liderar proyectos con impacto real.",
      ],
      cta: { label: "Conocer el equipo", href: "/personal" },
      image: { src: "/imagenes/ACREDITACION-ARQUITECTURA-600x333.jpeg", alt: "Acreditación internacional Arquitectura ULEAM" },
    },

    planEstudios: {
      title: "Plan de estudios",
      description: "",
      levels: [
        {
          title: "NIVEL 1",
          totalCredits: "15.0",
          open: true,
          courses: [
            { title: "Geometría plana ARQ-101", description: "Expresa habilidad para percibir, concebir y manejar el espacio en sus tres dimensiones y en las diferentes escalas, comunicando sus propuestas tanto urbanas como arquitectónicas mediante superficies y volúmenes creativos e innovadores plasmados a través del dominio de los medios y herramientas para comunicar de forma oral, escrita o de manera gráfica los detalles de sus ideas.", credits: "2.0", syllabusUrl, open: true },
            { title: "Medios de expresión y representación ARQ-103", description: "Desarrolla el manejo de técnicas de representación para comunicar ideas arquitectónicas con claridad, precisión y criterio gráfico.", credits: "2.0", syllabusUrl },
            { title: "Geometría descriptiva ARQ-105", description: "Fortalece la lectura espacial y la traducción de formas tridimensionales a sistemas de representación técnica.", credits: "2.0", syllabusUrl },
            { title: "Diseño básico ARQ-102A", description: "Introduce fundamentos de composición, proporción y organización espacial para el desarrollo de propuestas iniciales.", credits: "2.0", syllabusUrl },
            { title: "Dibujo técnico para arquitectos ARQ-104", description: "Apoya la precisión gráfica y la normalización técnica para el registro y la comunicación de proyectos arquitectónicos.", credits: "2.0", syllabusUrl },
            { title: "Cátedra Alfaro 9901V01-R22", description: "Refuerza la formación humanista y el compromiso institucional desde una perspectiva histórica, ética y social.", credits: "1.0", syllabusUrl },
          ],
        },
        {
          title: "NIVEL 2",
          totalCredits: "15.0",
          courses: [
            { title: "Cálculo aplicado a la arquitectura ARQ-201", description: "Aporta herramientas matemáticas para resolver problemas de análisis, medición y dimensionamiento en arquitectura.", credits: "2.0", syllabusUrl },
            { title: "Taller de perspectiva y sombras ARQ-203", description: "Desarrolla recursos de representación visual para profundizar volumen, profundidad y percepción espacial.", credits: "2.0", syllabusUrl },
            { title: "Dibujo arquitectónico ARQ-204", description: "Consolida la comunicación técnica de ideas, planos y detalles con lenguaje arquitectónico claro y coherente.", credits: "2.0", syllabusUrl },
            { title: "Metodología de la investigación PDU-5202", description: "Introduce criterios para formular, analizar y sustentar procesos de investigación aplicada al proyecto arquitectónico.", credits: "2.0", syllabusUrl },
            { title: "Taller de plástica arquitectónica ARQ-202A", description: "Potencia la expresión formal y material de las propuestas arquitectónicas mediante ejercicios creativos y experimentales.", credits: "2.0", syllabusUrl },
          ],
        },
        {
          title: "NIVEL 3",
          totalCredits: "15.0",
          courses: [
            { title: "Historia de la arquitectura ARQ-301", description: "Analiza la evolución histórica de la disciplina para comprender referentes, lenguajes y criterios de proyecto en distintos contextos culturales.", credits: "2.0", syllabusUrl },
            { title: "Construcción y materiales ARQ-302", description: "Introduce sistemas constructivos, propiedades de materiales y criterios técnicos para la materialización segura y eficiente del proyecto.", credits: "2.0", syllabusUrl },
            { title: "Taller de diseño intermedio ARQ-303", description: "Desarrolla propuestas de mayor complejidad incorporando programa arquitectónico, contexto y criterios de habitabilidad.", credits: "2.0", syllabusUrl },
            { title: "Estructuras básicas ARQ-304", description: "Brinda fundamentos estructurales para comprender esfuerzos, sistemas portantes y estabilidad en edificaciones de baja complejidad.", credits: "2.0", syllabusUrl },
            { title: "Urbanismo y territorio ARQ-305", description: "Aborda la lectura del territorio, la estructura urbana y los criterios iniciales para intervenir espacios colectivos y públicos.", credits: "2.0", syllabusUrl },
          ],
        },
        {
          title: "NIVEL 4",
          totalCredits: "15.0",
          courses: [
            { title: "Diseño arquitectónico avanzado ARQ-401", description: "Integra programa, contexto, estructura y materialidad en propuestas complejas con mayor autonomía conceptual y técnica.", credits: "2.0", syllabusUrl },
            { title: "Instalaciones arquitectónicas ARQ-402", description: "Desarrolla criterios para incorporar instalaciones sanitarias, eléctricas y de climatización en proyectos arquitectónicos.", credits: "2.0", syllabusUrl },
            { title: "Taller de vivienda y hábitat ARQ-403", description: "Plantea soluciones para vivienda y entorno inmediato con enfoque social, climático y de uso eficiente del espacio.", credits: "2.0", syllabusUrl },
            { title: "Estructuras intermedias ARQ-404", description: "Profundiza en sistemas estructurales y su aplicación a edificaciones con mayores demandas de estabilidad y desempeño.", credits: "2.0", syllabusUrl },
            { title: "Gestión de proyectos ARQ-405", description: "Introduce herramientas para planificar, presupuestar y coordinar proyectos arquitectónicos en distintas escalas de intervención.", credits: "2.0", syllabusUrl },
          ],
        },
      ],
    },

    personal: {
      title: "Personal docente",
      description: "",
      docentes: [
        { slug: "abel-quimis-chilan", nombre: "Abel Quimis Chilan", titulo: "Arquitecto", foto: "/imagenes/QUIMIS-ABEL-150x150.png", alt: "Abel Quimis Chilan", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "abel-quimis-chilan@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "alejandro-mendoza-chavez", nombre: "Alejandro Mendoza Chávez", titulo: "Arquitecto", foto: "/imagenes/MENDOZA-ALEJANDRO-150x150.png", alt: "Alejandro Mendoza Chávez", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "alejandro-mendoza-chavez@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "andrea-intriago-landazuri", nombre: "Andrea Intriago Landázuri", titulo: "Arquitecta", foto: "/imagenes/INTRIAGO-ANDREA-150x150.png", alt: "Andrea Intriago Landázuri", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "andrea-intriago-landazuri@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "armando-zambrano-loor", nombre: "Armando Zambrano Loor", titulo: "Arquitecto", foto: "/imagenes/ZAMBRANO-ARMANDO-150x150.png", alt: "Armando Zambrano Loor", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "armando-zambrano-loor@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "cesar-palma-espinel", nombre: "César Palma Espinel", titulo: "Arquitecto", foto: "/imagenes/CESAR-PALMA-150x150.png", alt: "César Palma Espinel", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "cesar-palma-espinel@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "cristhian-melgar-veliz", nombre: "Cristhian Melgar Véliz", titulo: "Arquitecto", foto: "/imagenes/MELGAR-CRISTHIAN-150x150.png", alt: "Cristhian Melgar Véliz", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "cristhian-melgar-veliz@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "erick-cevallos-viera", nombre: "Erick Cevallos Viera", titulo: "Arquitecto", foto: "/imagenes/CEVALLOS-ERICK-150x150.png", alt: "Erick Cevallos Viera", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "erick-cevallos-viera@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "fabricio-ormaza-garcia", nombre: "Fabricio Ormaza García", titulo: "Arquitecto", foto: "/imagenes/ORMAZA-FABRICIO-150x150.png", alt: "Fabricio Ormaza García", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "fabricio-ormaza-garcia@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "fernando-represa-perez", nombre: "Fernando Represa Pérez", titulo: "Doctor", foto: "/imagenes/FERNANDO-REPRESA-150x150.png", alt: "Fernando Represa Pérez", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Doctor; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "fernando-represa-perez@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "francisco-delgado-sanz", nombre: "Francisco Delgado Sanz", titulo: "Ingeniero", foto: "/imagenes/DELGADO-FRANCISCO-150x150.png", alt: "Francisco Delgado Sanz", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Ingeniero; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "francisco-delgado-sanz@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "fulton-pesantes-macias", nombre: "Fulton Pesantes Macías", titulo: "Arquitecto", foto: "/imagenes/FULTON-PESANTES-150x150.png", alt: "Fulton Pesantes Macías", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "fulton-pesantes-macias@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "gabriel-barba-espinel", nombre: "Gabriel Barba Espinel", titulo: "Arquitecto", foto: "/imagenes/BARBA-GABRIEL-150x150.png", alt: "Gabriel Barba Espinel", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "gabriel-barba-espinel@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "marcos-gallo-zambrano", nombre: "Marcos Gallo Zambrano", titulo: "Arquitecto", foto: "/imagenes/GALLO-MARCOS-150x150.png", alt: "Marcos Gallo Zambrano", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "marcos-gallo-zambrano@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "nadia-aveiga-villacis", nombre: "Nadia Aveiga Villacís", titulo: "Arquitecta", foto: "/imagenes/AVEIGA-NADIA-150x150.png", alt: "Nadia Aveiga Villacís", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "nadia-aveiga-villacis@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "nemar-torres-reyes", nombre: "Nemar Torres Reyes", titulo: "Arquitecto", foto: "/imagenes/TORRES-NEMAR-150x150.png", alt: "Nemar Torres Reyes", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "nemar-torres-reyes@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "pablo-garcia-delgado", nombre: "Pablo García Delgado", titulo: "Arquitecto", foto: "/imagenes/GARCIA-PABLO-150x150.png", alt: "Pablo García Delgado", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "pablo-garcia-delgado@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "ricardo-avila-avila", nombre: "Ricardo Ávila Ávila", titulo: "Arquitecto", foto: "/imagenes/AVILA-RICARDO-150x150.png", alt: "Ricardo Ávila Ávila", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "ricardo-avila-avila@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "tatiana-cedeno-delgado", nombre: "Tatiana Gabriela Cedeño Delgado", titulo: "Arquitecta", foto: "/imagenes/CEDENO-TATIANA-150x150.png", alt: "Tatiana Gabriela Cedeño Delgado", especializacion: "Planificación territorial, investigación en urbanismo y docencia", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Máster universitario en planificación territorial y gestión Ambiental – Universitat de Barcelona – España"], publicaciones: DEFAULT_PUBLICATIONS, email: "tatiana.cedeno@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "valeria-moreira-zambrano", nombre: "Valeria Moreira Zambrano", titulo: "Arquitecta", foto: "/imagenes/MOREIRA-VALERIA-150x150.png", alt: "Valeria Moreira Zambrano", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "valeria-moreira-zambrano@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
        { slug: "winderson-muentes-rivera", nombre: "Winderson Muentes Rivera", titulo: "Arquitecto", foto: "/imagenes/WINDERSON-MUENTES-150x150.png", alt: "Winderson Muentes Rivera", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "winderson-muentes-rivera@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      ],
    },
    docentes: [
      { slug: "abel-quimis-chilan", nombre: "Abel Quimis Chilan", titulo: "Arquitecto", foto: "/imagenes/QUIMIS-ABEL-150x150.png", alt: "Abel Quimis Chilan", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "abel-quimis-chilan@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "alejandro-mendoza-chavez", nombre: "Alejandro Mendoza Chávez", titulo: "Arquitecto", foto: "/imagenes/MENDOZA-ALEJANDRO-150x150.png", alt: "Alejandro Mendoza Chávez", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "alejandro-mendoza-chavez@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "andrea-intriago-landazuri", nombre: "Andrea Intriago Landázuri", titulo: "Arquitecta", foto: "/imagenes/ANDREA-INTRIAGO-150x150.png", alt: "Andrea Intriago Landázuri", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "andrea-intriago-landazuri@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "armando-zambrano-loor", nombre: "Armando Zambrano Loor", titulo: "Arquitecto", foto: "/imagenes/ZAMBRANO-ARMANDO-150x150.png", alt: "Armando Zambrano Loor", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "armando-zambrano-loor@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "cesar-palma-espinel", nombre: "César Palma Espinel", titulo: "Arquitecto", foto: "/imagenes/PALMA-CESAR-150x150.png", alt: "César Palma Espinel", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "cesar-palma-espinel@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "cristhian-melgar-veliz", nombre: "Cristhian Melgar Veliz", titulo: "Arquitecto", foto: "/imagenes/MELGAR-CRISTHIAN-150x150.png", alt: "Cristhian Melgar Veliz", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "cristhian-melgar-veliz@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "erick-cevallos-viera", nombre: "Erick Cevallos Viera", titulo: "Arquitecto", foto: "/imagenes/CEVALLOS-ERICK-150x150.png", alt: "Erick Cevallos Viera", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "erick-cevallos-viera@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "fabricio-ormaza-garcia", nombre: "Fabricio Ormaza García", titulo: "Arquitecto", foto: "/imagenes/ORMAZA-FABRICIO-150x150.png", alt: "Fabricio Ormaza García", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "fabricio-ormaza-garcia@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "fernando-represa-perez", nombre: "Fernando Represa Pérez", titulo: "Arquitecto", foto: "/imagenes/REPRESA-FERNANDO-150x150.png", alt: "Fernando Represa Pérez", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "fernando-represa-perez@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "francisco-delgado-sanz", nombre: "Francisco Delgado Sanz", titulo: "Arquitecto", foto: "/imagenes/DELGADO-FRANCISCO-150x150.png", alt: "Francisco Delgado Sanz", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "francisco-delgado-sanz@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "fulton-pesantes-macias", nombre: "Fulton Pesantes Macías", titulo: "Arquitecto", foto: "/imagenes/PESANTES-FULTON-150x150.png", alt: "Fulton Pesantes Macías", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "fulton-pesantes-macias@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "gabriel-barba-espinel", nombre: "Gabriel Barba Espinel", titulo: "Arquitecto", foto: "/imagenes/BARBA-GABRIEL-150x150.png", alt: "Gabriel Barba Espinel", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "gabriel-barba-espinel@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "marcos-gallo-zambrano", nombre: "Marcos Gallo Zambrano", titulo: "Arquitecto", foto: "/imagenes/GALLO-MARCOS-150x150.png", alt: "Marcos Gallo Zambrano", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "marcos-gallo-zambrano@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "nadia-aveiga-villacis", nombre: "Nadia Aveiga Villacís", titulo: "Arquitecta", foto: "/imagenes/AVEIGA-NADIA-150x150.png", alt: "Nadia Aveiga Villacís", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "nadia-aveiga-villacis@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "nemar-torres-reyes", nombre: "Nemar Torres Reyes", titulo: "Arquitecto", foto: "/imagenes/TORRES-NEMAR-150x150.png", alt: "Nemar Torres Reyes", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "nemar-torres-reyes@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "pablo-garcia-delgado", nombre: "Pablo García Delgado", titulo: "Arquitecto", foto: "/imagenes/GARCIA-PABLO-150x150.png", alt: "Pablo García Delgado", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "pablo-garcia-delgado@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "ricardo-avila-avila", nombre: "Ricardo Ávila Ávila", titulo: "Arquitecto", foto: "/imagenes/AVILA-RICARDO-150x150.png", alt: "Ricardo Ávila Ávila", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "ricardo-avila-avila@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "tatiana-cedeno-delgado", nombre: "Tatiana Gabriela Cedeño Delgado", titulo: "Arquitecta", foto: "/imagenes/CEDENO-TATIANA-150x150.png", alt: "Tatiana Gabriela Cedeño Delgado", especializacion: "Planificación territorial, investigación en urbanismo y docencia", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Máster universitario en planificación territorial y gestión Ambiental – Universitat de Barcelona – España"], publicaciones: DEFAULT_PUBLICATIONS, email: "tatiana.cedeno@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "valeria-moreira-zambrano", nombre: "Valeria Moreira Zambrano", titulo: "Arquitecta", foto: "/imagenes/MOREIRA-VALERIA-150x150.png", alt: "Valeria Moreira Zambrano", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecta; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "valeria-moreira-zambrano@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
      { slug: "winderson-muentes-rivera", nombre: "Winderson Muentes Rivera", titulo: "Arquitecto", foto: "/imagenes/WINDERSON-MUENTES-150x150.png", alt: "Winderson Muentes Rivera", especializacion: "Diseño arquitectónico, planificación urbana y docencia universitaria", formacionAcademica: ["Arquitecto; Universidad Laica Eloy Alfaro de Manabí", "Formación complementaria en investigación y gestión de proyectos"], publicaciones: DEFAULT_PUBLICATIONS, email: "winderson-muentes-rivera@uleam.edu.ec", ubicacion: "Edificio Carrera de Arquitectura - FIIA B07" },
    ],
  },
};

export const getCarreraContentKey = (facultadSlug: string, carreraSlug: string) =>
  `${facultadSlug}:${carreraSlug}`;

export const upsertCarreraContent = (
  facultadSlug: string,
  carreraSlug: string,
  content: CarreraContent,
) => {
  CARRERAS_CONTENT[getCarreraContentKey(facultadSlug, carreraSlug)] = content;
};
