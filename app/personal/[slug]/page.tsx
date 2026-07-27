import { notFound } from "next/navigation";
import { DocenteDetailSection } from "@/features/personal-docente/components/DocenteDetailSection";
import { getDocenteBySlug, getDocenteSlugs } from "@/api/personal";

type PersonalDocentePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export const generateStaticParams = () =>
  getDocenteSlugs().map((slug) => ({
    slug,
  }));

export default async function PersonalDocentePage({ params }: PersonalDocentePageProps) {
  const { slug } = await params;
  const docente = getDocenteBySlug(slug);

  if (!docente) {
    notFound();
  }

  return <DocenteDetailSection docente={docente} />;
}
