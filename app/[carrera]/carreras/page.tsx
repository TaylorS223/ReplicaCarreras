import { CarrerasGrid } from "@/components/facultad/CarrerasGrid";
import { getCarreras } from "@/lib/wordpress/services/getCarreras";
import { hydrateContentForContext } from "@/lib/content/bootstrap";

type CarrerasPageProps = {
  params: Promise<{ carrera: string }>;
};

export default async function CarrerasPage({ params }: CarrerasPageProps) {
  const { carrera } = await params;

  await hydrateContentForContext({ facultadSlug: carrera });
  const carreras = getCarreras({ facultadSlug: carrera });

  return <CarrerasGrid carreras={carreras} />;
}
