import Link from "next/link";
import Image from "next/image";
import type { Docente } from "@/types/docente";

type DocenteCardProps = {
  docente: Docente;
  basePath: string;
};

export const DocenteCard = ({ docente, basePath }: DocenteCardProps) => {
  return (
    <article className="teacher-card">
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
  );
};
