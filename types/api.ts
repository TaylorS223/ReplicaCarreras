import type { Docente } from "@/types/docente";
import type { NavItem } from "@/types/nav";
import type { Proyecto } from "@/types/proyecto";

export type HeroContent = {
  eyebrow: string;
  title: string;
  badge: string;
  description: string;
  images: Array<{ src: string; alt: string }>;
};

export type InfoCard = {
  iconClass: string;
  title: string;
  value: string;
  imagenFondo?: string;
};

export type MisionVisionItem = {
  iconClass: string;
  title: string;
  description: string;
};

export type ProfileCard = {
  iconClass: string;
  title: string;
  paragraphs: string[];
  cta?: {
    label: string;
    href: string;
  };
};

export type ProfileSectionContent = {
  sectionTitle: string;
  cards: ProfileCard[];
};

export type AccreditationContent = {
  title: string;
  paragraphs: string[];
  cta: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
  videoUrl?: string;
  thumbnailUrl?: string;
};

export type Course = {
  title: string;
  description: string;
  credits: string;
  syllabusUrl: string;
  open?: boolean;
};

export type StudyLevel = {
  title: string;
  totalCredits: string;
  courses: Course[];
  open?: boolean;
};

export type PlanEstudiosContent = {
  title: string;
  description: string;
  levels: StudyLevel[];
};

export type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

export type FooterContent = {
  brandImage: string;
  brandAlt: string;
  location: string;
  email: string;
  groups: Array<FooterLinkGroup & { fromWordPress?: boolean }>;
  socialLinks: Array<{
    label: string;
    href: string;
    platform: "facebook" | "instagram" | "tiktok" | "youtube";
  }>;
  copyright: string;
  logoAcreditadoraFooter?: string;
  aliadosEstrategicos?: string;
  enlacesFromWordPress?: boolean;
};

export type HeaderContent = {
  brandImage: string;
  brandAlt: string;
  brandHref: string;
  navItems: NavItem[];
  logoAcreditadoraNavbar?: string;
  menuLabels?: {
    inicio?: string;
    personal?: string;
    proyectos?: string;
    planEstudio?: string;
  };
};

export type PersonalContent = {
  title: string;
  description: string;
  docentes: Docente[];
};

export type ProyectosContent = {
  title: string;
  description: string;
  items: Proyecto[];
};

export type MateriaPlanEstudios = {
  nombreMateria: string;
  resultadoAprendizaje: string;
  creditos: string;
  silaboEnlace: string;
};

export type InicioPaginaContent = {
  bannerImagen: string;
  bannerImagenTexto: string;
  bannerImagenEnlace: string;
  tituloProfesional: string;
  jornada: string;
  duracion: string;
  modalidad: string;
  mision: string;
  vision: string;
  eslogaMotivacional: string;
  perfilEgreso: string;
  campoLaboral: string;
  mallaCurricular: string;
  imagenNoticia: string;
  fechaNoticia: string;
  descripcionAcreditacionInternacional: string;
  enlaceAcreditacionInternacional: string;
  materiasPlanEstudios: MateriaPlanEstudios[];
};
