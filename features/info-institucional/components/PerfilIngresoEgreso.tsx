import Link from "next/link";
import { getProfileContent } from "@/lib/wordpress/services/getInfo";
import { PerfilIngresoEgresoWrapper } from "./PerfilIngresoEgresoWrapper";

/**
 * Server Component — lee los datos ya hidratados desde el store del servidor.
 * El reveal-on-scroll y el canvas de partículas los gestiona PerfilIngresoEgresoWrapper (client).
 */
export const PerfilIngresoEgreso = () => {
  const content = getProfileContent();

  return (
    <PerfilIngresoEgresoWrapper sectionTitle={content.sectionTitle}>
      {content.cards.map((card) => (
        <article key={card.title} className="surface-card profile-card">
          <i className={card.iconClass} aria-hidden="true" />
          <h3>{card.title}</h3>
          {card.paragraphs.map((paragraph, index) => (
            <p key={`${card.title}-${index}`}>{paragraph}</p>
          ))}
          {card.cta ? (
            <Link
              className="cta"
              href={card.cta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {card.cta.label}
            </Link>
          ) : null}
        </article>
      ))}
    </PerfilIngresoEgresoWrapper>
  );
};
