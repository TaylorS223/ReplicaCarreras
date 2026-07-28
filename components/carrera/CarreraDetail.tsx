import type { Carrera } from "@/types/carrera";

type CarreraDetailProps = {
  carrera: Carrera;
};

export const CarreraDetail = ({ carrera }: CarreraDetailProps) => {
  return (
    <section className="section">
      <div className="container section-header">
        <h2>{carrera.nombre}</h2>
        <p>{carrera.descripcion}</p>
      </div>
    </section>
  );
};
