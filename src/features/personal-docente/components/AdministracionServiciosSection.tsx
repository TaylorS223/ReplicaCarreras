import { getAdministracionServiciosContent } from "@/api/administracionServicios";

export const AdministracionServiciosSection = () => {
  const content = getAdministracionServiciosContent();

  return (
    <section className="section administracion-servicios-section">
      <div className="container">
        {content.groups.map((group) => (
          <article key={group.title} className="administracion-group">
            <h2>{group.title}</h2>

            <div className="administracion-grid">
              {group.items.map((item) => (
                <div key={item.slug} className="administracion-card">
                  <figure>
                    <img src={item.foto} alt={item.alt} />
                  </figure>

                  <h3>{item.nombre}</h3>
                  <p className="administracion-cargo">{item.cargo}</p>

                  <p>
                    <span className="administracion-icon" aria-hidden="true">
                      ✉
                    </span>
                    {item.email}
                  </p>
                  <p>
                    <span className="administracion-icon" aria-hidden="true">
                      ➤
                    </span>
                    {item.ubicacion}
                  </p>
                  <p className="administracion-horario-title">
                    <span className="administracion-icon" aria-hidden="true">
                      ◷
                    </span>
                    Horario de atención
                  </p>
                  <p className="administracion-horario">{item.horario}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
