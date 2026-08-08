import { DecanatoSection } from "@/features/personal-docente/components/DecanatoSection";
import { getFacultadConfig } from "@/lib/facultades/registry";

type Props = { params: Promise<{ facultad: string }> };

export default async function FacultadDecanatoPage({ params }: Props) {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);
  const ctx = { facultadSlug: facultad, carreraSlug: config?.defaultCarreraSlug ?? facultad };
  return <DecanatoSection {...ctx} />;
}
