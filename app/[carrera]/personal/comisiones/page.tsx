import { ComisionesSection } from "@/features/personal-docente/components/ComisionesSection";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraComisionesPage({ params }: Props) {
  const { carrera } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <ComisionesSection {...ctx} />;
}
