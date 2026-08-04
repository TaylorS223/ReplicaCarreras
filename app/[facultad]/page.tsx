import { HeroFacultad } from "@/components/facultad/HeroFacultad";
import { StatsSection } from "@/components/facultad/StatsSection";
import { MisionVision } from "@/features/info-institucional/components/MisionVision";
import { PerfilIngresoEgreso } from "@/features/info-institucional/components/PerfilIngresoEgreso";
import { ProyectosSection } from "@/features/proyectos/components/ProyectosSection";
import { AcreditacionSection } from "@/features/proyectos/components/AcreditacionSection";
import { Pensum } from "@/components/carrera/Pensum";
import { PersonalDocenteSection } from "@/features/personal-docente/components/PersonalDocenteSection";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { notFound } from "next/navigation";

type FacultadHomePageProps = {
  params: Promise<{ facultad: string }>;
};

export default async function FacultadHomePage({ params }: FacultadHomePageProps) {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);
  const carreraSlug = config?.defaultCarreraSlug;

  if (!config) {
    notFound();
  }

  return (
    <>
      <HeroFacultad facultadSlug={facultad} carreraSlug={carreraSlug} />
      <StatsSection />
      <MisionVision />
      <PerfilIngresoEgreso />
      <ProyectosSection facultadSlug={facultad} />
      <AcreditacionSection basePath={`/${facultad}`} />
      <Pensum facultadSlug={facultad} carreraSlug={carreraSlug} />
      <PersonalDocenteSection basePath={`/${facultad}/personal`} />
    </>
  );
}
