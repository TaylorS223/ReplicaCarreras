import { DecanatoSection } from "@/features/personal-docente/components/DecanatoSection";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraDecanatoPage({ params }: Props) {
  const { carrera } = await params;
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <DecanatoSection {...ctx} />;
}
