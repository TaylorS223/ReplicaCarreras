import { notFound } from "next/navigation";
import { Pensum } from "@/components/carrera/Pensum";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type CarreraPlanEstudiosPageProps = {
  params: Promise<{ carrera: string; slug: string }>;
};

export default async function CarreraPlanEstudiosPage({ params }: CarreraPlanEstudiosPageProps) {
  const { carrera, slug } = await params;

  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: slug });

  return <Pensum facultadSlug={carrera} carreraSlug={slug} />;
}
