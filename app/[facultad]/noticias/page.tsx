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
    <div className="ap-wrapper">
      <div className="ap-page-title">
        <div className="container">
          <h3 className="ap-page-heading">Noticias</h3>
        </div>
      </div>

      <div className="container ap-body">
        <main className="ap-main">
          {noticias.map((noticia) => {
            const fecha = new Date(noticia.fechaISO + "T00:00:00");
            const dia = String(fecha.getDate()).padStart(2, "0");
            const mes = fecha.toLocaleDateString("es-EC", { month: "short" });
            const metaFecha = noticia.fechaTexto.toUpperCase();

            return (
              <article key={noticia.slug} className="ap-post">
                <Link href={`/${facultad}/noticias/${noticia.slug}`} className="ap-post-img-link">
                  <img src={noticia.imagen} alt={noticia.alt} className="ap-post-img" />
                </Link>

                <div className="ap-post-head">
                  <div className="ap-post-date">
                    <span className="ap-date-day">{dia}</span>
                    <span className="ap-date-month">{mes}</span>
                  </div>
                  <div className="ap-post-head-right">
                    <h3 className="ap-post-title">
                      <Link href={`/${facultad}/noticias/${noticia.slug}`}>
                        {noticia.titulo}
                      </Link>
                    </h3>
                    <div className="ap-post-meta">
                      <span>{metaFecha}</span>
                      <span className="ap-meta-sep">/</span>
                      <span>BY</span>
                      <Link
                        href={`/${facultad}/noticias/autor/${noticia.autor}`}
                        className="ap-meta-author"
                      >
                        {noticia.autor.toUpperCase()}
                      </Link>
                      <span className="ap-meta-sep">/</span>
                      <span>BLOG</span>
                    </div>
                  </div>
                </div>

                {noticia.resumen && (
                  <div className="ap-post-excerpt">
                    <p>{noticia.resumen}</p>
                    <Link
                      href={`/${facultad}/noticias/${noticia.slug}`}
                      className="ap-read-more"
                    >
                      Read More
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </main>

        <aside className="ap-sidebar">
          <div className="ap-widget">
            <h4 className="ap-widget-title">Entradas recientes</h4>
            <ul className="ap-widget-list">
              {noticias.slice(0, 5).map((n) => (
                <li key={n.slug}>
                  <Link href={`/${facultad}/noticias/${n.slug}`}>{n.titulo}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ap-widget">
            <h4 className="ap-widget-title">Archivos</h4>
            <ul className="ap-widget-list">
              {Array.from(
                new Map(
                  noticias.map((n) => {
                    const d = new Date(n.fechaISO + "T00:00:00");
                    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                    const label = d.toLocaleDateString("es-EC", { month: "long", year: "numeric" });
                    return [key, { key, label }];
                  }),
                ).values(),
              ).map(({ key, label }) => (
                <li key={key}>
                  <Link href={`/${facultad}/noticias/archivo/${key}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ap-widget">
            <h4 className="ap-widget-title">Categorías</h4>
            <ul className="ap-widget-list">
              <li>
                <Link href={`/${facultad}/noticias`}>Blog</Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
