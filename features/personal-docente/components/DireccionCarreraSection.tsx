import { getDireccionCarreraContent } from "@/lib/wordpress/services/getDireccionCarrera";

export const DireccionCarreraSection = () => {
  const content = getDireccionCarreraContent();

  return (
    <section className="docente-detail section decanato-section">
      <div className="container">
        {content.profiles.map((profile) => (
          <div key={profile.slug} className="docente-detail-grid decanato-profile">
            <aside>
              <figure className="docente-detail-avatar">
                <img src={profile.foto} alt={profile.alt} />
              </figure>
            </aside>

            <article className="docente-detail-content">
              <h1>{profile.nombre}</h1>
              <p className="docente-detail-role decanato-role">{profile.cargo}</p>

              <div className="decanato-contact-lines">
                <p>
                  <span className="decanato-contact-icon" aria-hidden="true">
                    ✉
                  </span>
                  {profile.email}
                </p>
                <p>
                  <span className="decanato-contact-icon" aria-hidden="true">
                    ➤
                  </span>
                  {profile.ubicacion}
                </p>
                <p className="decanato-horario-title">
                  <span className="decanato-contact-icon" aria-hidden="true">
                    ◷
                  </span>
                  Horario de atención
                </p>
                <p className="decanato-horario-value">{profile.horario}</p>
              </div>

              {profile.biografia.length ? <hr /> : null}

              {profile.biografia.map((paragraph) => (
                <p key={paragraph} className="decanato-bio-paragraph">
                  {paragraph}
                </p>
              ))}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
