import Link from "next/link";
import { getProyectosContent } from "@/lib/wordpress/services/getProyectosContent";
import { getHeaderContentByContext } from "@/lib/content/resolver";

type ProyectosSectionProps = {
  facultadSlug: string;
};

export const ProyectosSection = ({ facultadSlug }: ProyectosSectionProps) => {
  const content = getProyectosContent({ facultadSlug });

  const buildHref = (itemHref: string) => {
    if (!itemHref) return `/${facultadSlug}/noticias`;
    if (itemHref.startsWith("http")) return itemHref;
    // Si el href ya tiene el facultadSlug lo dejamos, si no lo añadimos
    if (itemHref.startsWith(`/${facultadSlug}`)) return itemHref;
    return `/${facultadSlug}${itemHref.startsWith("/") ? itemHref : `/${itemHref}`}`;
  };

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <div className="section-header">
          <Link href={`/${facultadSlug}/noticias`} className="section-title-link">
            <h2>{content.title}</h2>
          </Link>
          {content.description && <p>{content.description}</p>}
        </div>
        <div className="news-grid">
          {content.items.slice(0, 4).map((item) => (
            <Link
              key={`${item.titulo}-${item.fechaISO}`}
              className="news-card"
              href={buildHref(item.href)}
            >
              <figure>
                {item.imagen ? <img src={item.imagen} alt={item.alt} /> : null}
              </figure>
              <time dateTime={item.fechaISO}>{item.fechaTexto}</time>
              <h3>{item.titulo}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
