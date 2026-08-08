import Link from "next/link";
import Image from "next/image";
import { getProyectosContent } from "@/lib/wordpress/services/getProyectosContent";
import { ProyectosSectionWrapper } from "./ProyectosSectionWrapper";

type ProyectosSectionProps = {
  facultadSlug: string;
  carreraSlug?: string;
};

/**
 * Server Component — renderiza las tarjetas de noticias/proyectos en servidor.
 * El reveal-on-scroll lo gestiona ProyectosSectionWrapper (client).
 */
export const ProyectosSection = ({ facultadSlug, carreraSlug }: ProyectosSectionProps) => {
  const content = getProyectosContent({ facultadSlug, carreraSlug });

  const buildHref = (itemHref: string) => {
    if (!itemHref) return `/${facultadSlug}/noticias`;
    if (itemHref.startsWith("http")) return itemHref;
    if (itemHref.startsWith(`/${facultadSlug}`)) return itemHref;
    return `/${facultadSlug}${itemHref.startsWith("/") ? itemHref : `/${itemHref}`}`;
  };

  return (
    <ProyectosSectionWrapper>
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
              <figure style={{ position: "relative" }}>
                {item.imagen ? (
                  <Image
                    src={item.imagen}
                    alt={item.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 85vw, 25vw"
                  />
                ) : null}
              </figure>
              <time dateTime={item.fechaISO}>{item.fechaTexto}</time>
              <h3>{item.titulo}</h3>
            </Link>
          ))}
        </div>
      </div>
    </ProyectosSectionWrapper>
  );
};
