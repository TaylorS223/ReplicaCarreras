import type { Docente } from "@/types/docente";

type DocenteDetailSectionProps = {
  docente: Docente;
};

// Separa un string por comas y filtra items vacíos
const splitByComa = (value: string): string[] =>
  value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);

export const DocenteDetailSection = ({ docente }: DocenteDetailSectionProps) => {
  // La formación académica puede venir como un string con ";" o como array
  const formacionItems =
    docente.formacionAcademica.length === 1
      ? splitByComa(docente.formacionAcademica[0])
      : docente.formacionAcademica.filter(Boolean);

  return (
    <section className="docente-detail section">
      <div className="container docente-detail-grid">
        <aside>
          <figure className="docente-detail-avatar">
            {docente.foto ? (
              <img src={docente.foto} alt={docente.alt} />
            ) : (
              <svg viewBox="0 0 160 160" aria-hidden="true" className="docente-placeholder-avatar">
                <circle cx="80" cy="80" r="80" fill="#e8edf5" />
                <circle cx="80" cy="62" r="28" fill="#b0bdd0" />
                <ellipse cx="80" cy="130" rx="46" ry="30" fill="#b0bdd0" />
              </svg>
            )}
          </figure>

          <div className="docente-detail-contact">
            {docente.email && (
              <p>
                <span aria-hidden="true">✉</span>
                {" "}{docente.email}
              </p>
            )}
            {docente.ubicacion && (
              <p>
                <span aria-hidden="true">➤</span>
                {" "}{docente.ubicacion}
              </p>
            )}
          </div>

          {docente.horario && (
            <div className="docente-detail-horario">
              <p><strong>Horario de atención</strong></p>
              <p>{docente.horario}</p>
            </div>
          )}
        </aside>

        <article className="docente-detail-content">
          <h1>{docente.nombre}</h1>
          {docente.areadocencia && (
            <p className="docente-detail-role">{docente.areadocencia}</p>
          )}

          <hr />

          {docente.especializacion && (
            <>
              <h2>Área de especialización</h2>
              <p>{docente.especializacion}</p>
            </>
          )}

          {formacionItems.length > 0 && (
            <>
              <h2>Formación Académica</h2>
              <ul>
                {formacionItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {docente.publicaciones.length > 0 && (
            <>
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
            </>
          )}
        </article>
      </div>
    </section>
  );
};
