import { DecanatoSection } from "@/features/personal-docente/components/DecanatoSection";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraDecanatoPage({ params }: Props) {
  const { carrera } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <DecanatoSection {...ctx} />;
}
