import { SiteFooter } from "@/features/footer/components/SiteFooter";
import { getFooterContent } from "@/lib/wordpress/services/getFooter";
import type { ContentContext } from "@/lib/content/resolver";

type FooterProps = {
  context?: ContentContext;
};

export const Footer = ({ context }: FooterProps = {}) => {
  const content = getFooterContent(context);
  return <SiteFooter content={content} />;
};
