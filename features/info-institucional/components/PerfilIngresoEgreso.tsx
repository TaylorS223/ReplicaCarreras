import Link from "next/link";
import { getProfileContent } from "@/lib/wordpress/services/getInfo";
import { PerfilIngresoEgresoWrapper } from "./PerfilIngresoEgresoWrapper";
import type { ContentContext } from "@/lib/content/resolver";

export const PerfilIngresoEgreso = (ctx?: ContentContext) => {
  const content = getProfileContent(ctx);
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
            <Link className="cta" href={card.cta.href} target="_blank" rel="noopener noreferrer">
              {card.cta.label}
            </Link>
          ) : null}
        </article>
      ))}
    </PerfilIngresoEgresoWrapper>
  );
};
