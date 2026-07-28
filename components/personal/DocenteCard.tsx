import Link from "next/link";
import type { Docente } from "@/types/docente";

type DocenteCardProps = {
  docente: Docente;
  basePath: string;
};

export const DocenteCard = ({ docente, basePath }: DocenteCardProps) => {
  return (
    <article className="teacher-card">
      <Link className="teacher-link" href={`${basePath}/${docente.slug}`}>
        <figure>
          <img src={docente.foto} alt={docente.alt} />
        </figure>
        <h3>{docente.nombre}</h3>
      </Link>
      <p>{docente.titulo}</p>
    </article>
  );
};
