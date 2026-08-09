import { ComisionesSection } from "@/features/personal-docente/components/ComisionesSection";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraComisionesPage({ params }: Props) {
  const { carrera } = await params;
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <ComisionesSection {...ctx} />;
}
