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
import { getAllCarreraTerms } from "@/lib/wordpress/services/getCarreraTermId";

type FacultadLayoutProps = {
  children: ReactNode;
  params: Promise<{ facultad: string }>;
};

/**
 * Genera las rutas estáticas a partir de los términos de la taxonomía "carrera"
 * en WordPress. Así agregar una carrera nueva solo requiere crear el término en WP,
 * sin tocar código.
 *
 * Fallback: si WordPress no está disponible (ej. build en CI sin WP), usa el registry
 * local para no romper el build.
 */
export async function generateStaticParams() {
  const terms = await getAllCarreraTerms();

  if (terms.length > 0) {
    return terms.map((term) => ({ facultad: term.slug }));
  }

  // Fallback al registry local
  const { getFacultadSlugs } = await import("@/lib/facultades/registry");
  return getFacultadSlugs().map((slug) => ({ facultad: slug }));
}

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

  // Si no está en el registry local, verificamos si existe como término en WP
  // En ese caso usamos el slug como carreraSlug por convención
  const carreraSlug = config?.defaultCarreraSlug ?? facultad;

  // Si no hay config local, inicializamos el store vacío para esa carrera
  // (hydrateContentForContext llenará los datos desde WordPress)
  if (!config) {
    // Inicializar dinámicamente el store para esta carrera si no existe
    const { CARRERAS_CONTENT, upsertCarreraContent } = await import("@/lib/content/carreras-data");
    const key = `${facultad}:${carreraSlug}`;
    if (!CARRERAS_CONTENT[key]) {
      const { CARRERAS_CONTENT: ARQCONTENT } = await import("@/lib/content/carreras-data");
      const baseTemplate = ARQCONTENT["arquitectura:arquitectura"];
      if (baseTemplate) {
        upsertCarreraContent(facultad, carreraSlug, { ...baseTemplate });
      }
    }

    const { FACULTADES_CONTENT, upsertFacultadContent } = await import("@/lib/content/facultades-data");
    if (!FACULTADES_CONTENT[facultad]) {
      const baseTemplate = FACULTADES_CONTENT["arquitectura"];
      if (baseTemplate) {
        upsertFacultadContent(facultad, { ...baseTemplate });
      }
    }
  }

  await hydrateContentForContext({ facultadSlug: facultad, carreraSlug });

  const { isEnabled: isPreview } = await draftMode();

  // Construir theme vars: usa config local si existe, o defaults genéricos
  const themeVars = config
    ? buildFacultadThemeVars(config.theme)
    : buildFacultadThemeVars({ colorPrimary: "#1d4282", colorSecondary: "#a7d129" });

  return (
    <div className="page-shell" style={themeVars}>
      <Header />
      <main>{children}</main>
      <Footer />
      {isPreview && <PreviewBanner />}
    </div>
  );
}
