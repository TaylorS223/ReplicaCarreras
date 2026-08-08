import type { FacultadConfig } from "@/lib/facultades/types";

export const softwareConfig: FacultadConfig = {
  slug: "software",
  nombre: "Carrera de Software",
  descripcion: "Micrositio de Ingeniería en Software",
  logo: "/facultades/software/logo.svg",
  subdominio: null,
  defaultCarreraSlug: "software",
  theme: {
    colorPrimary: "#1d4282",
    colorSecondary: "#a7d129",
  },
  wordpress: {
    baseUrl: "",
    micrositeId: "software",
  },
};
