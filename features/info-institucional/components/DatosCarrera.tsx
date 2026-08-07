import { getInfoCards } from "@/lib/wordpress/services/getInfo";

export const DatosCarrera = () => {
  const cards = getInfoCards();

  return (
    <section id="datos" className="container-info-section">
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
            <i className={card.iconClass} aria-hidden="true"></i>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
