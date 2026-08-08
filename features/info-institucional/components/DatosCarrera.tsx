import { getInfoCards } from "@/lib/wordpress/services/getInfo";
import { DatosCarreraWrapper } from "./DatosCarreraWrapper";
import type { ContentContext } from "@/lib/content/resolver";

export const DatosCarrera = (ctx?: ContentContext) => {
  const cards = getInfoCards(ctx);
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
