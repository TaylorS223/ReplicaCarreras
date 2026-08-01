import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBanner } from "@/features/preview/components/PreviewBanner";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { buildFacultadThemeVars } from "@/lib/utils/theme";
import { buildFacultadMetadata } from "@/lib/utils/seo";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type FacultadLayoutProps = {
  children: ReactNode;
  params: Promise<{ facultad: string }>;
};

export async function generateMetadata({ params }: Omit<FacultadLayoutProps, "children">): Promise<Metadata> {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);

  if (!config) {
    return {
      title: "Facultad no encontrada",
    };
  }

  return buildFacultadMetadata({
    facultad: config,
    title: config.nombre,
    description: config.descripcion,
    pathname: `/${config.slug}`,
  });
}

export default async function FacultadLayout({ children, params }: FacultadLayoutProps) {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);

  if (!config) {
    notFound();
  }

  await hydrateContentForContext({
    facultadSlug: facultad,
    carreraSlug: config.defaultCarreraSlug,
  });

  const { isEnabled: isPreview } = await draftMode();

  return (
    <div className="page-shell" style={buildFacultadThemeVars(config.theme)}>
      <Header />
      <main>{children}</main>
      <Footer />
      {isPreview && <PreviewBanner />}
    </div>
  );
}
