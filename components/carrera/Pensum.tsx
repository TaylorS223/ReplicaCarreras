import { PlanEstudiosSection } from "@/features/plan-estudios/components/PlanEstudiosSection";
import { getPlanEstudiosContent } from "@/lib/wordpress/services/getPlanEstudios";

type PensumProps = {
  facultadSlug?: string;
  carreraSlug?: string;
};

export const Pensum = ({ facultadSlug, carreraSlug }: PensumProps = {}) => {
  const content = getPlanEstudiosContent({ facultadSlug, carreraSlug });
  return <PlanEstudiosSection content={content} />;
};
