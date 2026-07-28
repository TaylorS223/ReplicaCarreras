import { getInfoCards } from "@/lib/wordpress/services/getInfo";

export const DatosCarrera = () => {
  const cards = getInfoCards();

  return (
    <section id="datos" className="container-info-section">
      <div className="container">
        <div className="container-info-grid">
          {cards.map((card) => (
            <article key={card.title} className="info-card">
              <i className={card.iconClass} aria-hidden="true"></i>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
