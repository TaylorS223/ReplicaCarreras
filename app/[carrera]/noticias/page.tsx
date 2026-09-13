import Link from "next/link";
import Image from "next/image";
import { getNoticias } from "@/lib/wordpress/services/getNoticias";
import { hydrateContentForContext } from "@/lib/content/bootstrap";
import type { Metadata } from "next";

type NoticiasPageProps = {
  params: Promise<{ carrera: string }>;
};

export async function generateMetadata({ params }: NoticiasPageProps): Promise<Metadata> {
  const { carrera } = await params;
  return {
    title: `Noticias | ${carrera}`,
    description: `Últimas noticias y actualidad de ${carrera}`,
    openGraph: {
      title: `Noticias | ${carrera}`,
      description: `Últimas noticias y actualidad de ${carrera}`,
    },
  };
}

export default async function NoticiasPage({ params }: NoticiasPageProps) {
  const { carrera } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });

  const noticias = getNoticias({
    facultadSlug: carrera,
    carreraSlug: carrera,
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
                <Link href={`/${carrera}/noticias/${noticia.slug}`} className="ap-post-img-link" style={{ position: "relative", display: "block", aspectRatio: "16/9", overflow: "hidden" }}>
                  {noticia.imagen ? (
                    <Image
                      src={noticia.imagen}
                      alt={noticia.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 680px"
                    />
                  ) : null}
                </Link>

                <div className="ap-post-head">
                  <div className="ap-post-date">
                    <span className="ap-date-day">{dia}</span>
                    <span className="ap-date-month">{mes}</span>
                  </div>
                  <div className="ap-post-head-right">
                    <h3 className="ap-post-title">
                      <Link href={`/${carrera}/noticias/${noticia.slug}`}>
                        {noticia.titulo}
                      </Link>
                    </h3>
                    <div className="ap-post-meta">
                      <span>{metaFecha}</span>
                      <span className="ap-meta-sep">/</span>
                      <span>BY</span>
                      <Link
                        href={`/${carrera}/noticias/autor/${noticia.autor}`}
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
                      href={`/${carrera}/noticias/${noticia.slug}`}
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
                  <Link href={`/${carrera}/noticias/${n.slug}`}>{n.titulo}</Link>
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
                  <Link href={`/${carrera}/noticias/archivo/${key}`}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ap-widget">
            <h4 className="ap-widget-title">Categorías</h4>
            <ul className="ap-widget-list">
              <li>
                <Link href={`/${carrera}/noticias`}>Blog</Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
