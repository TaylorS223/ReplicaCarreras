import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";

export type WpRestCollectionResponse<T> = T[];

export type WpAcfEnvelope<TAcf> = {
  id: number;
  slug: string;
  acf?: TAcf;
};

export type FacultadAcfSchema = {
  content?: FacultadContent;
};

export type CarreraAcfSchema = {
  content?: CarreraContent;
};
