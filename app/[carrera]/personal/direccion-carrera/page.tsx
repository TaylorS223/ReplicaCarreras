import { DireccionCarreraSection } from "@/features/personal-docente/components/DireccionCarreraSection";

type Props = { params: Promise<{ carrera: string }> };

export default async function CarreraDireccionCarreraPage({ params }: Props) {
  const { carrera } = await params;
  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  return <DireccionCarreraSection {...ctx} />;
}
