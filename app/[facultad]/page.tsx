import { HeroFacultad } from "@/components/facultad/HeroFacultad";
import { StatsSection } from "@/components/facultad/StatsSection";
import { MisionVision } from "@/features/info-institucional/components/MisionVision";
import { PerfilIngresoEgreso } from "@/features/info-institucional/components/PerfilIngresoEgreso";
import { ProyectosSection } from "@/features/proyectos/components/ProyectosSection";
import { AcreditacionSection } from "@/features/proyectos/components/AcreditacionSection";
import { Pensum } from "@/components/carrera/Pensum";
import { PersonalDocenteSection } from "@/features/personal-docente/components/PersonalDocenteSection";
import { getFacultadConfig } from "@/lib/facultades/registry";

type FacultadHomePageProps = {
  params: Promise<{ facultad: string }>;
};

export default async function FacultadHomePage({ params }: FacultadHomePageProps) {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);

  // El carreraSlug puede venir del config local o usar el slug de la URL por convención
  const carreraSlug = config?.defaultCarreraSlug ?? facultad;
  const ctx = { facultadSlug: facultad, carreraSlug };

  return (
    <>
      <HeroFacultad facultadSlug={facultad} carreraSlug={carreraSlug} />
      <StatsSection {...ctx} />
      <MisionVision {...ctx} />
      <PerfilIngresoEgreso {...ctx} />
      <ProyectosSection facultadSlug={facultad} carreraSlug={carreraSlug} />
      <AcreditacionSection basePath={`/${facultad}`} facultadSlug={facultad} carreraSlug={carreraSlug} />
      <Pensum facultadSlug={facultad} carreraSlug={carreraSlug} />
      <PersonalDocenteSection basePath={`/${facultad}/personal`} facultadSlug={facultad} carreraSlug={carreraSlug} />
    </>
  );
}
