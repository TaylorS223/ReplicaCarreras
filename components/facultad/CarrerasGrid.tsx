import { CarreraCard } from "@/components/carrera/CarreraCard";
import type { Carrera } from "@/types/carrera";

type CarrerasGridProps = {
  carreras: Carrera[];
};

export const CarrerasGrid = ({ carreras }: CarrerasGridProps) => {
  return (
    <section className="section">
      <div className="container teacher-grid">
        {carreras.map((carrera) => (
          <CarreraCard key={carrera.slug} carrera={carrera} />
        ))}
      </div>
    </section>
  );
};
