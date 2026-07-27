import { HeroSection } from "@/features/hero/components/HeroSection";
import { DatosCarrera } from "@/features/info-institucional/components/DatosCarrera";
import { MisionVision } from "@/features/info-institucional/components/MisionVision";
import { PerfilIngresoEgreso } from "@/features/info-institucional/components/PerfilIngresoEgreso";
import { PersonalDocenteSection } from "@/features/personal-docente/components/PersonalDocenteSection";
import { PlanEstudiosSection } from "@/features/plan-estudios/components/PlanEstudiosSection";
import { AcreditacionSection } from "@/features/proyectos/components/AcreditacionSection";
import { ProyectosSection } from "@/features/proyectos/components/ProyectosSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DatosCarrera />
      <MisionVision />
      <PerfilIngresoEgreso />
      <ProyectosSection />
      <AcreditacionSection />
      <PlanEstudiosSection />
      <PersonalDocenteSection />
    </>
  );
}
