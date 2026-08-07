import { getMisionVisionItems } from "@/lib/wordpress/services/getInfo";
import { MisionVisionWrapper } from "./MisionVisionWrapper";

/**
 * Server Component — renderiza el contenido en servidor.
 * El reveal-on-scroll lo gestiona MisionVisionWrapper (client).
 */
export const MisionVision = () => {
  const items = getMisionVisionItems();

  return (
    <MisionVisionWrapper>
      <div className="container card-grid">
        {items.map((item) => (
          <article key={item.title} className="surface-card info-panel">
            <i className={item.iconClass} aria-hidden="true" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </MisionVisionWrapper>
  );
};
