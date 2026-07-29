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

export type CarreraContent = {
  hero: HeroContent;
  infoCards: InfoCard[];
  misionVision: MisionVisionItem[];
  profile: ProfileSectionContent;
  proyectos: ProyectosContent;
  accreditation: AccreditationContent;
  planEstudios: PlanEstudiosContent;
  personal: PersonalContent;
  docentes: Docente[];
  /** Campos ACF de la página Inicio (opcionales: se rellenan desde WordPress) */
  inicioPagina?: InicioPaginaContent;
};
