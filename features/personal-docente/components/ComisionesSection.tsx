import Image from "next/image";
import { getComisionesContent } from "@/lib/wordpress/services/getComisiones";
import type { ContentContext } from "@/lib/content/resolver";

const splitBySemicolon = (value: string): string[] =>
  value.split(";").map((item) => item.trim()).filter(Boolean);

export const ComisionesSection = ({ facultadSlug, carreraSlug }: { facultadSlug?: string; carreraSlug?: string } = {}) => {
  const content = getComisionesContent({ facultadSlug, carreraSlug });

  return (
    <section className="docente-detail section decanato-section">
      <div className="container">
        {content.profiles.map((profile) => {
          const formacionItems =
            profile.formacionAcademica.length === 1
              ? splitBySemicolon(profile.formacionAcademica[0])
              : profile.formacionAcademica.filter(Boolean);

          return (
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
                {profile.comision && (
                  <p className="docente-detail-role decanato-role">{profile.comision}</p>
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
                </div>

                {formacionItems.length > 0 && (
                  <>
                    <hr />
                    <ul>
                      {formacionItems.map((item) => (
                        <li key={item} className="decanato-bio-paragraph">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};
