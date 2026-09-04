import Image from "next/image";
import { getDireccionCarreraContent } from "@/lib/wordpress/services/getDireccionCarrera";
import type { ContentContext } from "@/lib/content/resolver";

export const DireccionCarreraSection = ({ facultadSlug, carreraSlug }: { facultadSlug?: string; carreraSlug?: string } = {}) => {
  const content = getDireccionCarreraContent({ facultadSlug, carreraSlug });

  if (content.profiles.length === 0) return null;

  return (
    <section className="docente-detail section decanato-section">
      <div className="container">
        {content.profiles.map((profile) => (
          <div key={profile.slug} className="docente-detail-grid decanato-profile">
            <aside>
              <figure className="docente-detail-avatar" style={{ position: "relative" }}>
                {profile.foto ? (
                  <Image src={profile.foto} alt={profile.alt} fill style={{ objectFit: "cover" }} sizes="160px" />
                ) : (
                  <svg viewBox="0 0 160 160" aria-hidden="true" className="docente-placeholder-avatar">
                    <circle cx="80" cy="80" r="80" fill="#e8edf5" />
                    <circle cx="80" cy="62" r="28" fill="#b0bdd0" />
                    <ellipse cx="80" cy="130" rx="46" ry="30" fill="#b0bdd0" />
                  </svg>
                )}
              </figure>
            </aside>

            <article className="docente-detail-content">
              <h1>{profile.nombre}</h1>
              {profile.cargo && (
                <p className="docente-detail-role decanato-role">{profile.cargo}</p>
              )}

              <div className="decanato-contact-lines">
                {profile.email && (
                  <p>
                    <span className="decanato-contact-icon" aria-hidden="true">✉</span>
                    {profile.email}
                  </p>
                )}
                {profile.ubicacion && (
                  <p>
                    <span className="decanato-contact-icon" aria-hidden="true">➤</span>
                    {profile.ubicacion}
                  </p>
                )}
                {profile.horario && (
                  <>
                    <p className="decanato-horario-title">
                      <span className="decanato-contact-icon" aria-hidden="true">◷</span>
                      Horario de atención
                    </p>
                    <p className="decanato-horario-value">{profile.horario}</p>
                  </>
                )}
              </div>

              {profile.biografia.length > 0 && profile.biografia.some(b => b.trim()) ? (
                <>
                  <hr />
                  {profile.biografia.map((paragraph) => (
                    <p key={paragraph} className="decanato-bio-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </>
              ) : null}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
