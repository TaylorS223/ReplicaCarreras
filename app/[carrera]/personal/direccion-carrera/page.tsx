import { DireccionCarreraSection } from "@/features/personal-docente/components/DireccionCarreraSection";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraDireccionCarreraPage({ params }: Props) {
  const { carrera } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <DireccionCarreraSection {...ctx} />;
}
