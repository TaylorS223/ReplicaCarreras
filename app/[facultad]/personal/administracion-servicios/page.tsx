import { AdministracionServiciosSection } from "@/features/personal-docente/components/AdministracionServiciosSection";
import { getFacultadConfig } from "@/lib/facultades/registry";

type Props = { params: Promise<{ facultad: string }> };

export default async function FacultadAdministracionServiciosPage({ params }: Props) {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);
  const ctx = { facultadSlug: facultad, carreraSlug: config?.defaultCarreraSlug ?? facultad };
  return <AdministracionServiciosSection {...ctx} />;
}
