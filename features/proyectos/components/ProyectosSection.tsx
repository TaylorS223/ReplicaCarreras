import Link from "next/link";
import { getProyectosContent } from "@/lib/wordpress/services/getProyectosContent";

export const ProyectosSection = () => {
  const content = getProyectosContent();

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <div className="section-header">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="news-grid">
          {content.items.slice(0, 4).map((item) => (
            <Link key={`${item.titulo}-${item.fechaISO}`} className="news-card" href={item.href}>
              <figure>
                <img src={item.imagen} alt={item.alt} />
              </figure>
              <time dateTime={item.fechaISO}>{item.fechaTexto}</time>
              <h3>{item.titulo}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
