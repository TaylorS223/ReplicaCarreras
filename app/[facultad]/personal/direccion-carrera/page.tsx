import { DireccionCarreraSection } from "@/features/personal-docente/components/DireccionCarreraSection";
import { getFacultadConfig } from "@/lib/facultades/registry";

type Props = { params: Promise<{ facultad: string }> };

export default async function FacultadDireccionCarreraPage({ params }: Props) {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);
  const ctx = { facultadSlug: facultad, carreraSlug: config?.defaultCarreraSlug ?? facultad };
  return <DireccionCarreraSection {...ctx} />;
}
