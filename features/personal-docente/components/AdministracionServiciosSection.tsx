import Image from "next/image";
import { getAdministracionServiciosContent } from "@/lib/wordpress/services/getAdministracionServicios";
import type { ContentContext } from "@/lib/content/resolver";

export const AdministracionServiciosSection = (ctx?: ContentContext) => {
  const content = getAdministracionServiciosContent(ctx);

  return (
    <section className="section administracion-servicios-section">
      <div className="container">
        {content.groups.map((group) => (
          <article key={group.title} className="administracion-group">
            <h2>{group.title}</h2>

            <div className="administracion-grid">
              {group.items.map((item) => (
                <div key={item.slug} className="administracion-card">
                  <figure style={{ position: "relative" }}>
                    {item.foto ? (
                      <Image src={item.foto} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="120px" />
                    ) : (
                      <svg viewBox="0 0 160 160" aria-hidden="true" className="docente-placeholder-avatar">
                        <circle cx="80" cy="80" r="80" fill="#e8edf5" />
                        <circle cx="80" cy="62" r="28" fill="#b0bdd0" />
                        <ellipse cx="80" cy="130" rx="46" ry="30" fill="#b0bdd0" />
                      </svg>
                    )}
                  </figure>

                  <h3>{item.nombre}</h3>
                  {item.cargo && (
                    <p className="administracion-cargo">{item.cargo}</p>
                  )}
                  {item.email && (
                    <p>
                      <span className="administracion-icon" aria-hidden="true">✉</span>
                      {item.email}
                    </p>
                  )}
                  {item.ubicacion && (
                    <p>
                      <span className="administracion-icon" aria-hidden="true">➤</span>
                      {item.ubicacion}
                    </p>
                  )}
                  {item.horario && (
                    <>
                      <p className="administracion-horario-title">
                        <span className="administracion-icon" aria-hidden="true">◷</span>
                        Horario de atención
                      </p>
                      <p className="administracion-horario">{item.horario}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
