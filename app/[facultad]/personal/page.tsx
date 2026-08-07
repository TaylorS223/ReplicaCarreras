import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import { DocenteCard } from "@/components/personal/DocenteCard";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PersonalPageProps = {
  params: Promise<{ facultad: string }>;
};

export async function generateMetadata({ params }: PersonalPageProps): Promise<Metadata> {
  const { facultad } = await params;
  const config = getFacultadConfig(facultad);
  if (!config) return { title: "Personal" };
  return {
    title: `Personal docente | ${config.nombre}`,
    description: `Conoce al personal docente de ${config.nombre}`,
    openGraph: {
      title: `Personal docente | ${config.nombre}`,
      description: `Conoce al personal docente de ${config.nombre}`,
    },
  };
}

export default async function PersonalPage({ params }: PersonalPageProps) {
  const { facultad } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  const docentes = getDocentes({
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  });

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Personal docente</h2>
        </div>
        <div className="teacher-grid">
          {docentes.map((docente) => (
            <DocenteCard
              key={docente.slug}
              docente={docente}
              basePath={`/${facultad}/personal`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
