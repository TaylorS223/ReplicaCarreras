import { getMisionVisionItems } from "@/lib/wordpress/services/getInfo";
import { MisionVisionWrapper } from "./MisionVisionWrapper";
import type { ContentContext } from "@/lib/content/resolver";

export const MisionVision = (ctx?: ContentContext) => {
  const items = getMisionVisionItems(ctx);
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
