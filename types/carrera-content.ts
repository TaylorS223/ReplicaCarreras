import type {
  AccreditationContent,
  HeroContent,
  InfoCard,
  InicioPaginaContent,
  MisionVisionItem,
  PersonalContent,
  PlanEstudiosContent,
  ProfileSectionContent,
  ProyectosContent,
} from "@/types/api";
import type { Docente } from "@/types/docente";
import type { Noticia } from "@/types/noticia";

// Tipos de slide del hero carrusel
export type HeroSlide =
  | {
      type: "acreditacion";
      position: "center" | "right";
      bg: string;
      overlay: string;
      logoAcreditacion: string;
      titulo: string;
      badgeTexto: string;
      duracion: string;
      modalidadSedes: string;
      textoAcreditacion: string;
      botonEnlace: string;
    }
  | {
      type: "carrera" | "taller" | "espacios";
      position: "center" | "left" | "right";
      bg: string;
      overlay: string;
      titulo: string;
      eyebrow: string;
      subtitulo: string;
    };

export type CarreraContent = {
  hero: HeroContent;
  heroSlides?: HeroSlide[];
  infoCards: InfoCard[];
  misionVision: MisionVisionItem[];
  profile: ProfileSectionContent;
  proyectos: ProyectosContent;
  accreditation: AccreditationContent;
  planEstudios: PlanEstudiosContent;
  personal: PersonalContent;
  docentes: Docente[];
  noticias: Noticia[];
  inicioPagina?: InicioPaginaContent;
};
