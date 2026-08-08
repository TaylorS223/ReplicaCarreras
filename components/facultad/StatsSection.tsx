import { DatosCarrera } from "@/features/info-institucional/components/DatosCarrera";
import type { ContentContext } from "@/lib/content/resolver";

export const StatsSection = (ctx?: ContentContext) => {
  return <DatosCarrera {...ctx} />;
};
