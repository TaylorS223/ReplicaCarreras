import type { Metadata } from "next";
import type { FacultadConfig } from "@/lib/facultades/types";

type SeoInput = {
  facultad: FacultadConfig;
  title?: string;
  description?: string;
  pathname?: string;
};

export const buildFacultadMetadata = ({
  facultad,
  title,
  description,
  pathname = "",
}: SeoInput): Metadata => {
  const resolvedTitle = title ? `${title} | ${facultad.nombre}` : facultad.nombre;
  const resolvedDescription = description ?? facultad.descripcion;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: pathname,
      siteName: facultad.nombre,
      images: [
        {
          url: facultad.logo,
          alt: facultad.nombre,
        },
      ],
    },
  };
};
