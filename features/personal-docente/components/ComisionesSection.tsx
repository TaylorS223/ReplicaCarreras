import { getComisionesContent } from "@/lib/wordpress/services/getComisiones";

const splitBySemicolon = (value: string): string[] =>
  value.split(";").map((item) => item.trim()).filter(Boolean);

export const ComisionesSection = () => {
  const content = getComisionesContent();

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
                {profile.foto && (
                  <figure className="docente-detail-avatar">
                    <img src={profile.foto} alt={profile.alt} />
                  </figure>
                )}
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
