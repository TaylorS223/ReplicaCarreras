import type { HeaderContent } from "@/types/api";

const headerContent: HeaderContent = {
  brandImage: "/imagenes/LOGO-HEADER4-scaled.png",
  brandAlt: "Uleam Arquitectura",
  brandHref: "/",
  navItems: [
    { label: "Inicio", href: "/", isActive: true },
    {
      label: "Personal",
      href: "/personal",
      subItems: [
        { label: "Decanato", href: "/personal/decanato" },
        {
          label: "Direccion Carrera Arquitectura",
          href: "/personal/direccion-carrera-arquitectura",
        },
        { label: "Docentes", href: "/personal#docentes" },
        { label: "Comisiones", href: "/personal/comisiones" },
        {
          label: "Administracion y servicios",
          href: "/personal/administracion-servicios",
        },
      ],
    },
    {
      label: "Proyectos",
      href: "/proyectos",
      subItems: [
        { label: "Vinculacion con el medio", href: "/proyectos#vinculacion" },
        { label: "Investigacion", href: "/proyectos#investigacion" },
      ],
    },
    { label: "Plan de estudios", href: "/plan-estudios" },
  ],
};

export const getHeaderContent = (): HeaderContent => headerContent;
