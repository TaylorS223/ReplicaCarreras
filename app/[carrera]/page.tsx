import { HeroFacultad } from "@/components/facultad/HeroFacultad";
import { StatsSection } from "@/components/facultad/StatsSection";
import { MisionVision } from "@/features/info-institucional/components/MisionVision";
import { PerfilIngresoEgreso } from "@/features/info-institucional/components/PerfilIngresoEgreso";
import { ProyectosSection } from "@/features/proyectos/components/ProyectosSection";
import { AcreditacionSection } from "@/features/proyectos/components/AcreditacionSection";
import { Pensum } from "@/components/carrera/Pensum";
import { PersonalDocenteSection } from "@/features/personal-docente/components/PersonalDocenteSection";

type CarreraHomePageProps = {
  params: Promise<{ carrera: string }>;
};

export default async function CarreraHomePage({ params }: CarreraHomePageProps) {
  const { carrera } = await params;
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };

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
