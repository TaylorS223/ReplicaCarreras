import { notFound } from "next/navigation";
import { CarreraDetail } from "@/components/carrera/CarreraDetail";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { getCarreraBySlug } from "@/lib/wordpress/services/getCarreras";
import { hydrateContentForContext } from "@/lib/content/bootstrap";
import type { Metadata } from "next";

type CarreraDetailPageProps = {
  params: Promise<{ facultad: string; carrera: string }>;
};

export async function generateMetadata({ params }: CarreraDetailPageProps): Promise<Metadata> {
  const { facultad, carrera } = await params;
  const config = getFacultadConfig(facultad);
  if (!config) return { title: "Carrera" };

  await hydrateContentForContext({ facultadSlug: facultad, carreraSlug: carrera });
  const carreraData = getCarreraBySlug(carrera, { facultadSlug: facultad });
  if (!carreraData) return { title: "Carrera" };

  const title = carreraData.hero?.title ?? carrera;
  const description = carreraData.hero?.description ?? config.descripcion;
  const ogImage = carreraData.hero?.images?.[0]?.src;

  return {
    title: `${title} | ${config.nombre}`,
    description,
    openGraph: {
      title: `${title} | ${config.nombre}`,
      description,
      images: ogImage ? [{ url: ogImage, alt: title }] : [],
    },
  };
}

export default async function CarreraDetailPage({ params }: CarreraDetailPageProps) {
  const { facultad, carrera } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  await hydrateContentForContext({ facultadSlug: facultad, carreraSlug: carrera });

  const carreraData = getCarreraBySlug(carrera, { facultadSlug: facultad });

  if (!carreraData) {
    notFound();
  }

  return <CarreraDetail carrera={carreraData} />;
}
