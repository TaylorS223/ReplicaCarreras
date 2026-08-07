import Link from "next/link";
import Image from "next/image";
import { getPersonalContent } from "@/lib/wordpress/services/getPersonal";
import { PersonalDocenteWrapper } from "./PersonalDocenteWrapper";

type PersonalDocenteSectionProps = {
  basePath: string;
};

/**
 * Server Component — renderiza las tarjetas de docentes en servidor.
 * El reveal-on-scroll lo gestiona PersonalDocenteWrapper (client).
 */
export const PersonalDocenteSection = ({ basePath }: PersonalDocenteSectionProps) => {
  const content = getPersonalContent();

  return (
    <PersonalDocenteWrapper>
      <div className="container">
        <div className="section-header">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="teacher-grid">
          {content.docentes.map((docente) => (
            <article key={docente.nombre} className="teacher-card">
              <Link className="teacher-link" href={`${basePath}/${docente.slug}`}>
                <figure style={{ position: "relative" }}>
                  {docente.foto ? (
                    <Image
                      src={docente.foto}
                      alt={docente.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="92px"
                    />
                  ) : null}
                </figure>
                <h3>{docente.nombre}</h3>
              </Link>
              <p>{docente.titulo}</p>
            </article>
          ))}
        </div>
      </div>
    </PersonalDocenteWrapper>
  );
};
