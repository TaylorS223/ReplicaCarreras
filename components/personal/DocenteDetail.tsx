import { DocenteDetailSection } from "@/features/personal-docente/components/DocenteDetailSection";
import type { Docente } from "@/types/docente";

type DocenteDetailProps = {
  docente: Docente;
};

export const DocenteDetail = ({ docente }: DocenteDetailProps) => {
  return <DocenteDetailSection docente={docente} />;
};
