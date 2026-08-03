import { SiteHeader } from "@/features/header/components/SiteHeader";
import { getHeaderContent } from "@/lib/wordpress/services/getHeader";

export const Header = () => {
  const content = getHeaderContent();
  return <SiteHeader content={content} />;
};
