import { notFound } from "next/navigation";
import { Pensum } from "@/components/carrera/Pensum";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type CarreraPlanEstudiosPageProps = {
  params: Promise<{ facultad: string; carrera: string }>;
};

export default async function CarreraPlanEstudiosPage({ params }: CarreraPlanEstudiosPageProps) {
  const { facultad, carrera } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  await hydrateContentForContext({ facultadSlug: facultad, carreraSlug: carrera });

  return <Pensum />;
}
