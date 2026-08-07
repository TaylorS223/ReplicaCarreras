import Link from "next/link";
import { getAccreditationContent } from "@/lib/wordpress/services/getAcreditacion";
import { VideoPlayer } from "@/features/proyectos/components/VideoPlayer";
import { AcreditacionWrapper } from "./AcreditacionWrapper";

type AcreditacionSectionProps = {
  basePath: string;
  facultadSlug?: string;
  carreraSlug?: string;
};

/**
 * Server Component — renderiza el contenido de acreditación en servidor.
 * El reveal-on-scroll lo gestiona AcreditacionWrapper (client).
 */
export const AcreditacionSection = ({
  basePath,
  facultadSlug,
  carreraSlug,
}: AcreditacionSectionProps) => {
  const content = getAccreditationContent(
    facultadSlug && carreraSlug ? { facultadSlug, carreraSlug } : undefined,
  );

  const rawHref =
    typeof content.cta.href === "string"
      ? content.cta.href
      : (content.cta.href as unknown as { url?: string })?.url ?? "";

  const ctaHref = rawHref.startsWith("/")
    ? `/${basePath.replace(/^\//, "")}${rawHref}`
    : rawHref;

  return (
    <AcreditacionWrapper>
      <div className="accreditation-grid">
        <article
          className="surface-card dark"
          style={{ borderRadius: 0, margin: 0, padding: "48px 56px" }}
        >
          <h3
            style={{ textTransform: "uppercase", fontSize: "1.1rem", letterSpacing: "0.05em" }}
          >
            {content.title}
          </h3>
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={`${content.title}-${index}`}
              style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
            >
              {paragraph}
            </p>
          ))}
          <Link className="accreditation-cta" href={ctaHref}>
            Leer mas &rarr;
          </Link>
        </article>

        <div className="video-frame">
          <VideoPlayer
            videoUrl={content.videoUrl ?? ""}
            thumbnailUrl={content.thumbnailUrl}
            fallbackImageSrc={content.image.src}
            fallbackImageAlt={content.image.alt}
            title={content.title}
          />
        </div>
      </div>
    </AcreditacionWrapper>
  );
};
