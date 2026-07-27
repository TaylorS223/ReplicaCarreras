import type { Docente } from "@/types/docente";

type DocenteDetailSectionProps = {
  docente: Docente;
};

export const DocenteDetailSection = ({ docente }: DocenteDetailSectionProps) => {
  return (
    <section className="docente-detail section">
      <div className="container docente-detail-grid">
        <aside>
          <figure className="docente-detail-avatar">
            <img src={docente.foto} alt={docente.alt} />
          </figure>
          <div className="docente-detail-contact">
            <p>
              <span aria-hidden="true">✉️</span> {docente.email}
            </p>
            <p>
              <span aria-hidden="true">📍</span> {docente.ubicacion}
            </p>
          </div>
        </aside>

        <article className="docente-detail-content">
          <h1>{docente.nombre}</h1>
          <p className="docente-detail-role">{docente.titulo}</p>

          <hr />

          <h2>Área de especialización</h2>
          <p>{docente.especializacion}</p>

          <h2>Formación Académica</h2>
          <ul>
            {docente.formacionAcademica.map((formacion) => (
              <li key={formacion}>{formacion}</li>
            ))}
          </ul>

          <hr />

          <h2>Publicaciones de investigaciones</h2>
          <div className="docente-publicaciones">
            {docente.publicaciones.map((publicacion) => (
              <a
                key={publicacion.label}
                href={publicacion.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  publicacion.label === "Google Scholar"
                    ? "logo-google-scholar"
                    : "logo-researchgate"
                }
              >
                {publicacion.label === "Google Scholar" ? (
                  <>
                    <span className="g-blue">G</span>
                    <span className="g-red">o</span>
                    <span className="g-yellow">o</span>
                    <span className="g-blue">g</span>
                    <span className="g-green">l</span>
                    <span className="g-red">e</span>
                    <span className="g-space"> </span>
                    <span className="g-dark">Scholar</span>
                  </>
                ) : (
                  publicacion.label
                )}
              </a>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
