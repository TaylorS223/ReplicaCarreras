import { notFound } from "next/navigation";
import { CarreraDetail } from "@/components/carrera/CarreraDetail";
import { getCarreraBySlug } from "@/lib/wordpress/services/getCarreras";
import { hydrateContentForContext } from "@/lib/content/bootstrap";
import type { Metadata } from "next";

type CarreraDetailPageProps = {
  params: Promise<{ carrera: string; slug: string }>;
};

export async function generateMetadata({ params }: CarreraDetailPageProps): Promise<Metadata> {
  const { carrera, slug } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: slug });
  const carreraData = getCarreraBySlug(slug, { facultadSlug: carrera });
  if (!carreraData) return { title: "Carrera" };

  const title = carreraData.nombre ?? slug;
  const description = carreraData.descripcion ?? "";
  const ogImage = undefined;

  return {
    title: `${title} | ${carrera}`,
    description,
    openGraph: {
      title: `${title} | ${carrera}`,
      description,
      images: ogImage ? [{ url: ogImage, alt: title }] : [],
    },
  };
}

export default async function CarreraDetailPage({ params }: CarreraDetailPageProps) {
  const { carrera, slug } = await params;

  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: slug });

  const carreraData = getCarreraBySlug(slug, { facultadSlug: carrera });
  if (!carreraData) notFound();

  return <CarreraDetail carrera={carreraData} />;
}
