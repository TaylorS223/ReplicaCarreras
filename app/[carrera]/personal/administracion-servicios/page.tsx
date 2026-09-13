import { AdministracionServiciosSection } from "@/features/personal-docente/components/AdministracionServiciosSection";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraAdministracionServiciosPage({ params }: Props) {
  const { carrera } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <AdministracionServiciosSection {...ctx} />;
}
