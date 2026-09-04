import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PreviewBanner } from "@/features/preview/components/PreviewBanner";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { buildFacultadThemeVars } from "@/lib/utils/theme";
import { buildFacultadMetadata } from "@/lib/utils/seo";
import { hydrateContentForContext } from "@/lib/content/bootstrap";
import { getAllCarreraTerms } from "@/lib/wordpress/services/getCarreraTermId";

type CarreraLayoutProps = {
  children: ReactNode;
  params: Promise<{ carrera: string }>;
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
    return terms.map((term) => ({ carrera: term.slug }));
  }

  // Fallback al registry local
  const { getFacultadSlugs } = await import("@/lib/facultades/registry");
  return getFacultadSlugs().map((slug) => ({ carrera: slug }));
}

export async function generateMetadata({ params }: Omit<CarreraLayoutProps, "children">): Promise<Metadata> {
  const { carrera } = await params;
  const config = getFacultadConfig(carrera);

  return buildFacultadMetadata({
    facultad: config ?? {
      slug: carrera,
      nombre: carrera.charAt(0).toUpperCase() + carrera.slice(1),
      descripcion: `Micrositio de la carrera de ${carrera}`,
      logo: "",
      defaultCarreraSlug: carrera,
      theme: { colorPrimary: "#1d4282", colorSecondary: "#a7d129" },
      wordpress: { baseUrl: "", micrositeId: carrera },
    },
    title: carrera.charAt(0).toUpperCase() + carrera.slice(1),
    pathname: `/${carrera}`,
  });
}

// Slugs que Next.js puede resolver con el layout dinámico pero no son carreras reales
const RESERVED_SLUGS = new Set(["favicon.ico", "robots.txt", "sitemap.xml"]);

export default async function CarreraLayout({ children, params }: CarreraLayoutProps) {
  const { carrera } = await params;

  // Evita intentar hidratar rutas reservadas que no son carreras
  if (RESERVED_SLUGS.has(carrera)) {
    return <>{children}</>;
  }

  const config = getFacultadConfig(carrera);

  // Si no hay config local, inicializamos el store vacío para esa carrera
  // (hydrateContentForContext llenará los datos desde WordPress)
  if (!config) {
    const { CARRERAS_CONTENT, upsertCarreraContent } = await import("@/lib/content/carreras-data");
    if (!CARRERAS_CONTENT[carrera]) {
      // Inicializar con objeto vacío — WordPress llenará los datos reales
      upsertCarreraContent(carrera, carrera, {
        hero: { eyebrow: "", title: "", badge: "", description: "", images: [] },
        infoCards: [
          { iconClass: "fa fa-graduation-cap", title: "Titulo profesional", value: "", imagenFondo: "" },
          { iconClass: "fa fa-calendar", title: "Jornada", value: "", imagenFondo: "" },
          { iconClass: "fa fa-clock-o", title: "Duración", value: "", imagenFondo: "" },
          { iconClass: "fa fa-users", title: "Modalidad", value: "", imagenFondo: "" },
        ],
        misionVision: [
          { iconClass: "fa fa-bullseye", title: "Misión", description: "" },
          { iconClass: "fa fa-lightbulb-o", title: "Visión", description: "" },
        ],
        profile: { sectionTitle: "", cards: [
          { iconClass: "fa fa-pencil-square-o", title: "Perfil de egreso", paragraphs: [""] },
          { iconClass: "fa fa-briefcase", title: "Campo laboral", paragraphs: [""], cta: { label: "Malla curricular", href: "" } },
        ]},
        proyectos: { title: "Noticias & Actualidad", description: "", items: [] },
        accreditation: { title: "Acreditación internacional", paragraphs: [""], cta: { label: "Conocer más", href: "" }, image: { src: "", alt: "" } },
        planEstudios: { title: "Plan de estudios", description: "", levels: [] },
        personal: { title: "Personal docente", description: "", docentes: [] },
        docentes: [],
        noticias: [],
      });
    }

    const { FACULTADES_CONTENT, upsertFacultadContent } = await import("@/lib/content/facultades-data");
    if (!FACULTADES_CONTENT[carrera]) {
      // Inicializar con navItems genéricos — WordPress actualizará los labels vía ACF
      upsertFacultadContent(carrera, {
        header: {
          brandImage: "/imagenes/LOGO-HEADER4-scaled.png",
          brandAlt: "Uleam",
          brandHref: "/",
          navItems: [
            { label: "Inicio", href: "/" },
            {
              label: "Personal",
              href: "/personal",
              subItems: [
                { label: "Decanato", href: "/personal/decanato" },
                { label: "Dirección de Carrera", href: "/personal/direccion-carrera" },
                { label: "Docentes", href: "/personal#docentes" },
                { label: "Comisiones", href: "/personal/comisiones" },
                { label: "Administración y servicios", href: "/personal/administracion-servicios" },
              ],
            },
            { label: "Plan de estudios", href: `/carreras/${carrera}/plan-estudios` },
          ],
        },
        footer: { brandImage: "/imagenes/LOGO-VERTICAL-768x384.png", brandAlt: "Uleam", location: "", email: "", groups: [], socialLinks: [], copyright: "" },
        decanato: { title: "Decanato", description: "", profiles: [] },
        direccionCarrera: { title: "Dirección de Carrera", description: "", profiles: [] },
        comisiones: { title: "Comisiones", description: "", profiles: [] },
        administracionServicios: { title: "Administración y servicios", description: "", groups: [] },
      });
    }
  }

  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });

  const { isEnabled: isPreview } = await draftMode();

  // Construir theme vars: usa config local si existe, o defaults genéricos
  const themeVars = config
    ? buildFacultadThemeVars(config.theme)
    : buildFacultadThemeVars({ colorPrimary: "#1d4282", colorSecondary: "#a7d129" });

  return (
    <div className="page-shell" style={themeVars}>
      <Header context={{ facultadSlug: carrera, carreraSlug: carrera }} />
      <main>{children}</main>
      <Footer context={{ facultadSlug: carrera, carreraSlug: carrera }} />
      {isPreview && <PreviewBanner />}
    </div>
  );
}
