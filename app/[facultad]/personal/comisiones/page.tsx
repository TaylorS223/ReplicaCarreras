import { ComisionesSection } from "@/features/personal-docente/components/ComisionesSection";
import { getFacultadConfig } from "@/lib/facultades/registry";

type Props = { params: Promise<{ facultad: string }> };

export default async function FacultadComisionesPage({ params }: Props) {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);
  const ctx = { facultadSlug: facultad, carreraSlug: config?.defaultCarreraSlug ?? facultad };
  return <ComisionesSection {...ctx} />;
}
