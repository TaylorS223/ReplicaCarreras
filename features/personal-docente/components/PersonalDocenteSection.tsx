import Link from "next/link";
import { getPersonalContent } from "@/lib/wordpress/services/getPersonal";

type PersonalDocenteSectionProps = {
  basePath: string;
};

export const PersonalDocenteSection = ({ basePath }: PersonalDocenteSectionProps) => {
  const content = getPersonalContent();

  return (
    <section id="personal" className="section">
      <div className="container">
        <div className="section-header">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="teacher-grid">
          {content.docentes.map((docente) => (
            <article key={docente.nombre} className="teacher-card">
              <Link className="teacher-link" href={`${basePath}/${docente.slug}`}>
                <figure>
                  <img src={docente.foto} alt={docente.alt} />
                </figure>
                <h3>{docente.nombre}</h3>
              </Link>
              <p>{docente.titulo}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
