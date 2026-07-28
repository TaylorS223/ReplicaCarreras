import { notFound } from "next/navigation";
import { DocenteDetailSection } from "@/features/personal-docente/components/DocenteDetailSection";
import { getDocenteBySlug } from "@/lib/wordpress/services/getPersonal";
import { getFacultadConfig } from "@/lib/facultades/registry";

type DocenteDetailPageProps = {
  params: Promise<{ facultad: string; slug: string }>;
};

export default async function DocenteDetailPage({ params }: DocenteDetailPageProps) {
  const { facultad, slug } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  const docente = getDocenteBySlug(slug, {
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  });

  if (!docente) {
    notFound();
  }

  return <DocenteDetailSection docente={docente} />;
}
