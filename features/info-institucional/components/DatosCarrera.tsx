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
                    backgroundImage: `linear-gradient(rgba(10,10,12,0.82), rgba(10,10,12,0.82)), url(${card.imagenFondo})`,
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
