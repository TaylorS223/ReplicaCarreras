import Link from "next/link";
import { getNoticias } from "@/lib/wordpress/services/getNoticias";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { notFound } from "next/navigation";

type NoticiasPageProps = {
  params: Promise<{ facultad: string }>;
};

export default async function NoticiasPage({ params }: NoticiasPageProps) {
  const { facultad } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  const noticias = getNoticias({
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  });

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Noticias</h2>
        </div>

        <div className="news-grid">
          {noticias.map((noticia) => (
            <article key={noticia.slug} className="news-card">
              <img src={noticia.imagen} alt={noticia.alt} />
              <div className="news-date">{noticia.fechaTexto}</div>
              <h3>{noticia.titulo}</h3>
              <Link href={`noticias/${noticia.slug}`}>Leer más</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
