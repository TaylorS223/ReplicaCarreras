import { HeroFacultad } from "@/components/facultad/HeroFacultad";
import { StatsSection } from "@/components/facultad/StatsSection";
import { MisionVision } from "@/features/info-institucional/components/MisionVision";
import { PerfilIngresoEgreso } from "@/features/info-institucional/components/PerfilIngresoEgreso";
import { ProyectosSection } from "@/features/proyectos/components/ProyectosSection";
import { AcreditacionSection } from "@/features/proyectos/components/AcreditacionSection";
import { Pensum } from "@/components/carrera/Pensum";
import { PersonalDocenteSection } from "@/features/personal-docente/components/PersonalDocenteSection";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

// Slugs que Next.js puede resolver con la ruta dinámica pero no son carreras reales
const RESERVED_SLUGS = new Set(["favicon.ico", "robots.txt", "sitemap.xml"]);

type CarreraHomePageProps = {
  params: Promise<{ carrera: string }>;
};

export default async function CarreraHomePage({ params }: CarreraHomePageProps) {
  const { carrera } = await params;

  // No intentar hidratar ni renderizar para rutas reservadas
  if (RESERVED_SLUGS.has(carrera)) return null;

  const ctx = { facultadSlug: carrera, carreraSlug: carrera };

  // Garantiza que el store esté lleno antes de que cualquier componente
  // de esta página lea los datos. React.cache deduplica esta llamada
  // si el layout ya la ejecutó en el mismo request.
  await hydrateContentForContext(ctx);

  return (
    <>
      <HeroFacultad facultadSlug={carrera} carreraSlug={carrera} />
      <StatsSection {...ctx} />
      <MisionVision {...ctx} />
      <PerfilIngresoEgreso {...ctx} />
      <ProyectosSection facultadSlug={carrera} carreraSlug={carrera} />
      <AcreditacionSection basePath={`/${carrera}`} facultadSlug={carrera} carreraSlug={carrera} />
      <Pensum facultadSlug={carrera} carreraSlug={carrera} />
      <PersonalDocenteSection basePath={`/${carrera}/personal`} facultadSlug={carrera} carreraSlug={carrera} />
    </>
  );
}
