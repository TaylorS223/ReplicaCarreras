import { notFound } from "next/navigation";
import { DocenteDetailSection } from "@/features/personal-docente/components/DocenteDetailSection";
import { getDocenteBySlug } from "@/lib/wordpress/services/getPersonal";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type DocenteDetailPageProps = {
  params: Promise<{ carrera: string; slug: string }>;
};

export default async function DocenteDetailPage({ params }: DocenteDetailPageProps) {
  const { carrera, slug } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });

  const docente = getDocenteBySlug(slug, { facultadSlug: carrera, carreraSlug: carrera });

  if (!docente) notFound();

  return <DocenteDetailSection docente={docente} />;
}
