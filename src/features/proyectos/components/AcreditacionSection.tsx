import Link from "next/link";
import { getAccreditationContent } from "@/api/proyectos";

export const AcreditacionSection = () => {
  const content = getAccreditationContent();

  return (
    <section id="acreditacion" className="section">
      <div className="container accreditation-grid">
        <article className="surface-card dark">
          <h3>{content.title}</h3>
          {content.paragraphs.map((paragraph, index) => (
            <p key={`${content.title}-${index}`}>{paragraph}</p>
          ))}
          <Link className="cta" href={content.cta.href}>
            {content.cta.label}
          </Link>
        </article>
        <div className="video-frame">
          <img src={content.image.src} alt={content.image.alt} />
        </div>
      </div>
    </section>
  );
};
