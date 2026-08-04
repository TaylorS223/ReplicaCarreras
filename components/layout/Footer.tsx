import { SiteFooter } from "@/features/footer/components/SiteFooter";
import { getFooterContent } from "@/lib/wordpress/services/getFooter";

export const Footer = () => {
  const content = getFooterContent();
  return <SiteFooter content={content} />;
};
