import type { FacultadConfig } from "@/lib/facultades/types";

export const arquitecturaConfig: FacultadConfig = {
  slug: "arquitectura",
  nombre: "Facultad de Ingeniería, Industria y Arquitectura",
  descripcion: "Micrositio de Arquitectura ULEAM",
  logo: "/facultades/arquitectura/logo.svg",
  subdominio: "arquitectura.uleam.edu.ec",
  defaultCarreraSlug: "arquitectura",
  theme: {
    colorPrimary: "#1d4282",
    colorSecondary: "#a7d129",
  },
  wordpressUrl: "https://carreras.uleam.edu.ec/arquitectura-internacional",
  wordpress: {
    baseUrl: "https://carreras.uleam.edu.ec/arquitectura-internacional",
    micrositeId: "arquitectura-internacional",
  },
};
