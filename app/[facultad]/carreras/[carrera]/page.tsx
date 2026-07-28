import { notFound } from "next/navigation";
import { CarreraDetail } from "@/components/carrera/CarreraDetail";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { getCarreraBySlug } from "@/lib/wordpress/services/getCarreras";

type CarreraDetailPageProps = {
  params: Promise<{ facultad: string; carrera: string }>;
};

export default async function CarreraDetailPage({ params }: CarreraDetailPageProps) {
  const { facultad, carrera } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  const carreraData = getCarreraBySlug(carrera, { facultadSlug: facultad });

  if (!carreraData) {
    notFound();
  }

  return <CarreraDetail carrera={carreraData} />;
}
