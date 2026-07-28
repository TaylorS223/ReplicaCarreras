import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import { DocenteCard } from "@/components/personal/DocenteCard";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { notFound } from "next/navigation";

type PersonalPageProps = {
  params: Promise<{ facultad: string }>;
};

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
