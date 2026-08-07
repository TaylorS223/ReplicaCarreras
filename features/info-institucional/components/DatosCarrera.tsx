import { getInfoCards } from "@/lib/wordpress/services/getInfo";
import { DatosCarreraWrapper } from "./DatosCarreraWrapper";

/**
 * Server Component — renderiza las tarjetas de datos en servidor.
 * El reveal-on-scroll lo gestiona DatosCarreraWrapper (client).
 */
export const DatosCarrera = () => {
  const cards = getInfoCards();

  return (
    <DatosCarreraWrapper>
      <div className="container-info-grid">
        {cards.map((card) => (
          <article
            key={card.title}
            className="info-card"
            style={
              card.imagenFondo
                ? {
                    backgroundImage: `linear-gradient(rgba(20,20,24,0.55), rgba(20,20,24,0.55)), url(${card.imagenFondo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            <i className={card.iconClass} aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </article>
        ))}
      </div>
    </DatosCarreraWrapper>
  );
};
