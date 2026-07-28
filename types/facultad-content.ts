import type { FooterContent, HeaderContent } from "@/types/api";
import type { AdministracionServiciosContent } from "@/types/administracionServicios";
import type { ComisionesContent } from "@/types/comisiones";
import type { DecanatoContent } from "@/types/decanato";
import type { DireccionCarreraContent } from "@/types/direccionCarrera";

export type FacultadContent = {
  header: HeaderContent;
  footer: FooterContent;
  decanato: DecanatoContent;
  direccionCarrera: DireccionCarreraContent;
  comisiones: ComisionesContent;
  administracionServicios: AdministracionServiciosContent;
};
