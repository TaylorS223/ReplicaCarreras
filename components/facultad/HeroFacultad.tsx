import { HeroSection } from "@/features/hero/components/HeroSection";
import { getHeroContent } from "@/lib/wordpress/services/getHero";
import { getHeroContentByContext } from "@/lib/content/resolver";
import { CARRERAS_CONTENT } from "@/lib/content/carreras-data";

type HeroFacultadProps = {
  facultadSlug?: string;
  carreraSlug?: string;
};

export const HeroFacultad = ({ facultadSlug, carreraSlug }: HeroFacultadProps = {}) => {
  const content = getHeroContent({ facultadSlug, carreraSlug });

  // Key simplificada: solo carreraSlug
  const key = carreraSlug ?? "arquitectura";
  const carreraContent = CARRERAS_CONTENT[key];
  const heroSlides = carreraContent?.heroSlides;

  return <HeroSection content={content} heroSlides={heroSlides} />;
};
