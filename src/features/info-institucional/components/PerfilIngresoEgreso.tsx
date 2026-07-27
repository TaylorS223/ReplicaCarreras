import Link from "next/link";
import { getProfileContent } from "@/api/info";

export const PerfilIngresoEgreso = () => {
  const content = getProfileContent();

  return (
    <>
      <h2 className="section-title">{content.sectionTitle}</h2>
      <section id="perfil" className="section profile-section">
        <div className="profile-effects" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>
        <div className="container split-grid">
          {content.cards.map((card) => (
            <article key={card.title} className="surface-card profile-card">
              <i className={card.iconClass} aria-hidden="true"></i>
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
        </div>
      </section>
    </>
  );
};
