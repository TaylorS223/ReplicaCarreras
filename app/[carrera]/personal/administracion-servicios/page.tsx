import { AdministracionServiciosSection } from "@/features/personal-docente/components/AdministracionServiciosSection";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraAdministracionServiciosPage({ params }: Props) {
  const { carrera } = await params;
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <AdministracionServiciosSection {...ctx} />;
}
