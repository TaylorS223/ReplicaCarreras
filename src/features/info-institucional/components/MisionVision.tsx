import { getMisionVisionItems } from "@/api/info";

export const MisionVision = () => {
  const items = getMisionVisionItems();

  return (
    <section id="mision-vision" className="card-enfoque">
      <div className="container card-grid">
        {items.map((item) => (
          <article key={item.title} className="surface-card info-panel">
            <i className={item.iconClass} aria-hidden="true"></i>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
