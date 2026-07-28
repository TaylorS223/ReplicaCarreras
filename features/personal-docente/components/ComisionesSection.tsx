import { getComisionesContent } from "@/lib/wordpress/services/getComisiones";

export const ComisionesSection = () => {
  const content = getComisionesContent();

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
              <p className="docente-detail-role decanato-role">{profile.comision}</p>

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
              </div>

              <hr />

              <ul>
                {profile.formacionAcademica.map((item) => (
                  <li key={item} className="decanato-bio-paragraph">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
