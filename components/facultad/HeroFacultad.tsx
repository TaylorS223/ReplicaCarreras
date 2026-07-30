import { HeroSection } from "@/features/hero/components/HeroSection";
import { getHeroContent } from "@/lib/wordpress/services/getHero";

type HeroFacultadProps = {
  facultadSlug?: string;
  carreraSlug?: string;
};

export const HeroFacultad = ({ facultadSlug, carreraSlug }: HeroFacultadProps = {}) => {
  const content = getHeroContent({ facultadSlug, carreraSlug });
  return <HeroSection content={content} />;
};
