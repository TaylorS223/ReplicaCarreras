import type { PlanEstudiosContent } from "@/types/api";

const syllabusUrl =
  "https://drive.google.com/file/d/1q1QYfHX8_9qY4cv5BmOkjPy2DJTcpLby/view?usp=drive_link";

const planEstudiosContent: PlanEstudiosContent = {
  title: "Plan de estudios",
  description:
    "",
  levels: [
    {
      title: "NIVEL 1",
      totalCredits: "15.0",
      open: true,
      courses: [
        {
          title: "Geometría plana ARQ-101",
          description:
            "Expresa habilidad para percibir, concebir y manejar el espacio en sus tres dimensiones y en las diferentes escalas, comunicando sus propuestas tanto urbanas como arquitectónicas mediante superficies y volúmenes creativos e innovadores plasmados a través del dominio de los medios y herramientas para comunicar de forma oral, escrita o de manera gráfica los detalles de sus ideas.",
          credits: "2.0",
          syllabusUrl,
          open: true,
        },
        {
          title: "Medios de expresión y representación ARQ-103",
          description:
            "Desarrolla el manejo de técnicas de representación para comunicar ideas arquitectónicas con claridad, precisión y criterio gráfico.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Geometría descriptiva ARQ-105",
          description:
            "Fortalece la lectura espacial y la traducción de formas tridimensionales a sistemas de representación técnica.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Diseño básico ARQ-102A",
          description:
            "Introduce fundamentos de composición, proporción y organización espacial para el desarrollo de propuestas iniciales.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Dibujo técnico para arquitectos ARQ-104",
          description:
            "Apoya la precisión gráfica y la normalización técnica para el registro y la comunicación de proyectos arquitectónicos.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Cátedra Alfaro 9901V01-R22",
          description:
            "Refuerza la formación humanista y el compromiso institucional desde una perspectiva histórica, ética y social.",
          credits: "1.0",
          syllabusUrl,
        },
      ],
    },
    {
      title: "NIVEL 2",
      totalCredits: "15.0",
      courses: [
        {
          title: "Cálculo aplicado a la arquitectura ARQ-201",
          description:
            "Aporta herramientas matemáticas para resolver problemas de análisis, medición y dimensionamiento en arquitectura.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Taller de perspectiva y sombras ARQ-203",
          description:
            "Desarrolla recursos de representación visual para profundizar volumen, profundidad y percepción espacial.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Dibujo arquitectónico ARQ-204",
          description:
            "Consolida la comunicación técnica de ideas, planos y detalles con lenguaje arquitectónico claro y coherente.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Metodología de la investigación PDU-5202",
          description:
            "Introduce criterios para formular, analizar y sustentar procesos de investigación aplicada al proyecto arquitectónico.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Taller de plástica arquitectónica ARQ-202A",
          description:
            "Potencia la expresión formal y material de las propuestas arquitectónicas mediante ejercicios creativos y experimentales.",
          credits: "2.0",
          syllabusUrl,
        },
      ],
    },
    {
      title: "NIVEL 3",
      totalCredits: "15.0",
      courses: [
        {
          title: "Historia de la arquitectura ARQ-301",
          description:
            "Analiza la evolución histórica de la disciplina para comprender referentes, lenguajes y criterios de proyecto en distintos contextos culturales.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Construcción y materiales ARQ-302",
          description:
            "Introduce sistemas constructivos, propiedades de materiales y criterios técnicos para la materialización segura y eficiente del proyecto.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Taller de diseño intermedio ARQ-303",
          description:
            "Desarrolla propuestas de mayor complejidad incorporando programa arquitectónico, contexto y criterios de habitabilidad.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Estructuras básicas ARQ-304",
          description:
            "Brinda fundamentos estructurales para comprender esfuerzos, sistemas portantes y estabilidad en edificaciones de baja complejidad.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Urbanismo y territorio ARQ-305",
          description:
            "Aborda la lectura del territorio, la estructura urbana y los criterios iniciales para intervenir espacios colectivos y públicos.",
          credits: "2.0",
          syllabusUrl,
        },
      ],
    },
    {
      title: "NIVEL 4",
      totalCredits: "15.0",
      courses: [
        {
          title: "Diseño arquitectónico avanzado ARQ-401",
          description:
            "Integra programa, contexto, estructura y materialidad en propuestas complejas con mayor autonomía conceptual y técnica.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Instalaciones arquitectónicas ARQ-402",
          description:
            "Desarrolla criterios para incorporar instalaciones sanitarias, eléctricas y de climatización en proyectos arquitectónicos.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Taller de vivienda y hábitat ARQ-403",
          description:
            "Plantea soluciones para vivienda y entorno inmediato con enfoque social, climático y de uso eficiente del espacio.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Estructuras intermedias ARQ-404",
          description:
            "Profundiza en sistemas estructurales y su aplicación a edificaciones con mayores demandas de estabilidad y desempeño.",
          credits: "2.0",
          syllabusUrl,
        },
        {
          title: "Gestión de proyectos ARQ-405",
          description:
            "Introduce herramientas para planificar, presupuestar y coordinar proyectos arquitectónicos en distintas escalas de intervención.",
          credits: "2.0",
          syllabusUrl,
        },
      ],
    },
  ],
};

export const getPlanEstudiosContent = (): PlanEstudiosContent => planEstudiosContent;
