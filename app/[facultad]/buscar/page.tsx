import Link from "next/link";
import { notFound } from "next/navigation";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { getNoticias } from "@/lib/wordpress/services/getNoticias";
import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import { BuscarForm } from "@/features/buscar/components/BuscarForm";

type BuscarPageProps = {
  params: Promise<{ facultad: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function BuscarPage({ params, searchParams }: BuscarPageProps) {
  const { facultad } = await params;
  const { q } = await searchParams;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  const query = (q ?? "").trim().toLowerCase();

  const context = { facultadSlug: facultad, carreraSlug: facultadConfig.defaultCarreraSlug };

  const noticias = query
    ? getNoticias(context).filter(
        (n) =>
          n.titulo.toLowerCase().includes(query) ||
          n.resumen.toLowerCase().includes(query) ||
          n.contenido.toLowerCase().includes(query),
      )
    : [];

  const docentes = query
    ? getDocentes(context).filter(
        (d) =>
          d.nombre.toLowerCase().includes(query) ||
          d.titulo.toLowerCase().includes(query) ||
          d.especializacion.toLowerCase().includes(query),
      )
    : [];

  const totalResultados = noticias.length + docentes.length;

  return (
    <div className="buscar-wrapper">
      <div className="buscar-hero">
        <div className="container">
          {query && (
            <p className="buscar-caption">
              {totalResultados} resultado{totalResultados !== 1 ? "s" : ""} para &ldquo;{q}&rdquo;
            </p>
          )}
          <h1 className="buscar-title">Búsqueda</h1>
        </div>
      </div>

      <div className="container buscar-body">
        <BuscarForm facultad={facultad} initialQuery={q ?? ""} />

        {query && totalResultados === 0 && (
          <p className="buscar-empty">
            No se encontraron resultados para &ldquo;{q}&rdquo;.
          </p>
        )}

        {noticias.length > 0 && (
          <section className="buscar-section">
            <h2 className="buscar-section-title">Noticias</h2>
            <ul className="buscar-list">
              {noticias.map((n) => (
                <li key={n.slug} className="buscar-item">
                  <Link href={`/${facultad}/noticias/${n.slug}`} className="buscar-item-link">
                    <span className="buscar-item-title">{n.titulo}</span>
                    <span className="buscar-item-meta">{n.fechaTexto}</span>
                  </Link>
                  {n.resumen && <p className="buscar-item-excerpt">{n.resumen}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {docentes.length > 0 && (
          <section className="buscar-section">
            <h2 className="buscar-section-title">Personal docente</h2>
            <ul className="buscar-list">
              {docentes.map((d) => (
                <li key={d.slug} className="buscar-item">
                  <Link href={`/${facultad}/personal/${d.slug}`} className="buscar-item-link">
                    <span className="buscar-item-title">{d.nombre}</span>
                    <span className="buscar-item-meta">{d.titulo}</span>
                  </Link>
                  {d.especializacion && (
                    <p className="buscar-item-excerpt">{d.especializacion}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
