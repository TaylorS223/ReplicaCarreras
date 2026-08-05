import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoticias } from "@/lib/wordpress/services/getNoticias";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { hydrateContentForContext } from "@/lib/content/bootstrap";
import { ComentarioForm } from "@/features/noticias/components/ComentarioForm";
import { getNoticiaContent } from "@/lib/wordpress/graphql/noticias";
import { isAcfSourceEnabled } from "@/lib/wordpress/source";

type NoticiaDetailPageProps = {
  params: Promise<{ facultad: string; slug: string }>;
};

export default async function NoticiaDetailPage({ params }: NoticiaDetailPageProps) {
  const { facultad, slug } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  await hydrateContentForContext({
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  });

  const noticias = getNoticias({
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  });

  const index = noticias.findIndex((n) => n.slug === slug);

  if (index === -1) {
    notFound();
  }

  const noticia = noticias[index];
  const anteriorNoticia = index > 0 ? noticias[index - 1] : null;
  const siguienteNoticia = noticias[index + 1] ?? null;
  const relacionadas = noticias.filter((n) => n.slug !== slug).slice(0, 3);

  // Obtiene el contenido HTML del editor Gutenberg via GraphQL
  const contenidoHtml = isAcfSourceEnabled()
    ? await getNoticiaContent(slug)
    : "";

  // Fallback: si no hay contenido HTML, usa los párrafos del contenido plano
  const parrafos = !contenidoHtml && noticia.contenido
    ? noticia.contenido.split("\n\n").filter(Boolean)
    : [];

  return (
    <>
      {/* Hero */}
      <div
        className="nd-hero"
        style={{ backgroundImage: `url(${noticia.imagen})` }}
      >
        <div className="nd-hero-overlay" />
        <div className="nd-hero-bottom-overlay" />
        <div className="container nd-hero-inner">
          <div className="nd-meta">
            <Link
              href={`/${facultad}/noticias/autor/${noticia.autor}`}
              className="nd-meta-item nd-meta-author"
            >
              {noticia.autor}
            </Link>
            <span className="nd-meta-sep">•</span>
            <span className="nd-meta-item">Blog</span>
            <span className="nd-meta-sep">•</span>
            <span className="nd-meta-item">0</span>
          </div>
          <h1 className="nd-title">{noticia.titulo}</h1>
        </div>
      </div>

      {/* Cuerpo del artículo */}
      <div className="container nd-body">
        <article className="nd-article">
          {contenidoHtml ? (
            /* Contenido HTML del editor Gutenberg de WordPress */
            <div
              className="nd-wp-content"
              dangerouslySetInnerHTML={{ __html: contenidoHtml }}
            />
          ) : (
            /* Fallback: párrafos planos del campo contenido de ACF */
            parrafos.map((p, i) => {
              const urlRegex = /^https?:\/\/\S+$/;
              if (urlRegex.test(p.trim())) {
                return (
                  <p key={i}>
                    <a href={p.trim()} target="_blank" rel="noopener noreferrer">
                      {p.trim()}
                    </a>
                  </p>
                );
              }
              return <p key={i}>{p}</p>;
            })
          )}
        </article>
      </div>

      {/* Navegación anterior / siguiente */}
      {(anteriorNoticia || siguienteNoticia) && (
        <div className="nd-post-nav">
          {anteriorNoticia ? (
            <Link
              href={`/${facultad}/noticias/${anteriorNoticia.slug}`}
              className="nd-post-nav-item nd-post-nav-prev"
              style={{ backgroundImage: `url(${anteriorNoticia.imagen})` }}
            >
              <div className="nd-post-nav-overlay" />
              <div className="nd-post-nav-inner">
                <span className="nd-post-nav-label">
                  <span className="nd-post-nav-arrow">&larr;</span> Previous Post
                </span>
                <span className="nd-post-nav-title">{anteriorNoticia.titulo}</span>
              </div>
            </Link>
          ) : (
            <div className="nd-post-nav-item nd-post-nav-empty" />
          )}

          {siguienteNoticia ? (
            <Link
              href={`/${facultad}/noticias/${siguienteNoticia.slug}`}
              className="nd-post-nav-item nd-post-nav-next"
              style={{ backgroundImage: `url(${siguienteNoticia.imagen})` }}
            >
              <div className="nd-post-nav-overlay" />
              <div className="nd-post-nav-inner">
                <span className="nd-post-nav-label">
                  Next Post <span className="nd-post-nav-arrow">&rarr;</span>
                </span>
                <span className="nd-post-nav-title">{siguienteNoticia.titulo}</span>
              </div>
            </Link>
          ) : (
            <div className="nd-post-nav-item nd-post-nav-empty" />
          )}
        </div>
      )}

      {/* Related Posts */}
      {relacionadas.length > 0 && (
        <div className="container nd-related">
          <h3 className="nd-related-title">Related Posts</h3>
          <div className="nd-related-grid">
            {relacionadas.map((n) => (
              <Link
                key={n.slug}
                href={`/${facultad}/noticias/${n.slug}`}
                className="nd-related-card"
              >
                <div className="nd-related-img">
                  <img src={n.imagen} alt={n.alt} />
                </div>
                <div className="nd-related-body">
                  <div className="nd-related-meta">
                    <span>{n.fechaTexto}</span>
                    <span className="nd-meta-sep">/</span>
                    <span>By {n.autor}</span>
                    <span className="nd-meta-sep">/</span>
                    <span>Blog</span>
                    <span className="nd-meta-sep">/</span>
                    <span>0</span>
                  </div>
                  <h4 className="nd-related-card-title">{n.titulo}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Leave a Reply */}
      <div className="container nd-comments">
        <h3 className="nd-comments-title">Leave a Reply</h3>
        <ComentarioForm />
      </div>
    </>
  );
}
