import { CarrerasGrid } from "@/components/facultad/CarrerasGrid";
import { getCarreras } from "@/lib/wordpress/services/getCarreras";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { notFound } from "next/navigation";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type CarrerasPageProps = {
  params: Promise<{ facultad: string }>;
};

export default async function CarrerasPage({ params }: CarrerasPageProps) {
  const { facultad } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  await hydrateContentForContext({ facultadSlug: facultad });
  const carreras = getCarreras({ facultadSlug: facultad });

  return <CarrerasGrid carreras={carreras} />;
}
