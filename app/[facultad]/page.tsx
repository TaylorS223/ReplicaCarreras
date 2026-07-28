import { HeroFacultad } from "@/components/facultad/HeroFacultad";
import { StatsSection } from "@/components/facultad/StatsSection";
import { MisionVision } from "@/features/info-institucional/components/MisionVision";
import { PerfilIngresoEgreso } from "@/features/info-institucional/components/PerfilIngresoEgreso";
import { ProyectosSection } from "@/features/proyectos/components/ProyectosSection";
import { AcreditacionSection } from "@/features/proyectos/components/AcreditacionSection";
import { PlanEstudiosSection } from "@/features/plan-estudios/components/PlanEstudiosSection";
import { PersonalDocenteSection } from "@/features/personal-docente/components/PersonalDocenteSection";

export default function FacultadHomePage() {
  return (
    <>
      <HeroFacultad />
      <StatsSection />
      <MisionVision />
      <PerfilIngresoEgreso />
      <ProyectosSection />
      <AcreditacionSection />
      <PlanEstudiosSection />
      <PersonalDocenteSection />
    </>
  );
}
