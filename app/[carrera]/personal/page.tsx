import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import { DocenteCard } from "@/components/personal/DocenteCard";
import { hydrateContentForContext } from "@/lib/content/bootstrap";
import type { Metadata } from "next";

type PersonalPageProps = {
  params: Promise<{ carrera: string }>;
};

export async function generateMetadata({ params }: PersonalPageProps): Promise<Metadata> {
  const { carrera } = await params;
  return {
    title: `Personal docente | ${carrera}`,
    description: `Conoce al personal docente de la carrera de ${carrera}`,
    openGraph: {
      title: `Personal docente | ${carrera}`,
      description: `Conoce al personal docente de la carrera de ${carrera}`,
    },
  };
}

export default async function PersonalPage({ params }: PersonalPageProps) {
  const { carrera } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });

  const docentes = getDocentes({ facultadSlug: carrera, carreraSlug: carrera }) ?? [];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Personal docente</h2>
        </div>
        {docentes.length === 0 ? (
          <p style={{ color: "#8a9ab5", fontSize: "1rem", padding: "32px 0" }}>
            Próximamente publicaremos la información del personal docente.
          </p>
        ) : (
          <div className="teacher-grid">
            {docentes.map((docente) => (
              <DocenteCard
                key={docente.slug}
                docente={docente}
                basePath={`/${carrera}/personal`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
