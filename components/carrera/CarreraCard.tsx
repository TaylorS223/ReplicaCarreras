import Link from "next/link";
import type { Carrera } from "@/types/carrera";

type CarreraCardProps = {
  carrera: Carrera;
};

export const CarreraCard = ({ carrera }: CarreraCardProps) => {
  return (
    <article className="teacher-card">
      <h3>{carrera.nombre}</h3>
      <p>{carrera.descripcion}</p>
      <Link href={carrera.href}>Ver carrera</Link>
    </article>
  );
};
