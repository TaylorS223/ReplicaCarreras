import Link from "next/link";
import { getAccreditationContent } from "@/lib/wordpress/services/getAcreditacion";

type AcreditacionSectionProps = {
  basePath: string;
};

export const AcreditacionSection = ({ basePath }: AcreditacionSectionProps) => {
  const content = getAccreditationContent();

  const ctaHref = content.cta.href.startsWith("/")
    ? `/${basePath.replace(/^\//, "")}${content.cta.href}`
    : content.cta.href;

  return (
    <section id="acreditacion" className="section">
      <div className="container accreditation-grid">
        <article className="surface-card dark">
          <h3>{content.title}</h3>
          {content.paragraphs.map((paragraph, index) => (
            <p key={`${content.title}-${index}`}>{paragraph}</p>
          ))}
          <Link className="cta" href={ctaHref}>
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
