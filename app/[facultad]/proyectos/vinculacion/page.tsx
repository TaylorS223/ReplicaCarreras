import { notFound } from "next/navigation";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { hydrateContentForContext } from "@/lib/content/bootstrap";
import { getProyectosVinculacion } from "@/lib/wordpress/graphql/proyectos";

type Props = { params: Promise<{ facultad: string }> };

export default async function VinculacionPage({ params }: Props) {
  const { facultad } = await params;
  const facultadConfig = getFacultadConfig(facultad);
  if (!facultadConfig) notFound();

  await hydrateContentForContext({
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  });

  const proyectos = await getProyectosVinculacion();

  if (proyectos.length === 0) notFound();

  return (
    <div className="container" style={{ padding: "64px 0 80px" }}>
      <h1 style={{ marginBottom: "48px", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1d2f52" }}>
        Vinculación con el Medio
      </h1>

      {proyectos.map((p, i) => (
        <article
          key={p.slug}
          style={{
            marginBottom: i < proyectos.length - 1 ? "80px" : "0",
            paddingBottom: i < proyectos.length - 1 ? "80px" : "0",
            borderBottom: i < proyectos.length - 1 ? "1px solid #e0e8f0" : "none",
          }}
        >
          <h2 style={{ marginBottom: "8px", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", color: "#1d2f52" }}>
            {p.titulo}
          </h2>
          <p style={{ marginBottom: "32px", fontSize: "0.85rem", color: "#8a9ab5" }}>{p.fecha}</p>
          {p.contenido && (
            <div
              className="nd-wp-content"
              dangerouslySetInnerHTML={{ __html: p.contenido }}
            />
          )}
        </article>
      ))}
    </div>
  );
}
