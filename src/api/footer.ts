import type { FooterContent } from "@/types/api";

const footerContent: FooterContent = {
  brandImage: "/imagenes/LOGO-VERTICAL-768x384.png",
  brandAlt: "Uleam Arquitectura",
  location: "Manta, Vía San Mateo, Cdla. Universitaria",
  email: "arquitectura@uleam.edu.ec",
  groups: [
    {
      title: "Enlaces de interés",
      links: [
        { label: "Aula virtual Xicse", href: "https://campus.uleam.edu.ec/" },
        { label: "Moodle", href: "https://moodle.uleam.edu.ec/" },
        { label: "Biblioteca", href: "https://biblioteca.uleam.edu.ec/" },
        { label: "Tics", href: "https://tics.uleam.edu.ec/" },
        {
          label: "Aseguramiento de la Calidad",
          href: "https://www.uleam.edu.ec/aseguramiento-de-la-calidad/",
        },
        { label: "Correo institucional", href: "https://correo.uleam.edu.ec/" },
        { label: "Admisión y nivelación", href: "https://admision.uleam.edu.ec/" },
      ],
    },
    {
      title: "Aliados estratégicos",
      links: [
        { label: "MODUS", href: "https://modus.uleam.edu.ec/" },
        { label: "Revista FINIBUS", href: "https://finibus.uleam.edu.ec/" },
        { label: "GAD Manta", href: "https://manta.gob.ec/" },
        { label: "GAD Montecristi", href: "https://gadmontecristi.gob.ec/" },
        { label: "GIZ", href: "https://www.giz.de/en/html/index.html" },
        { label: "ONU Hábitat", href: "https://unhabitat.org/es" },
      ],
    },
  ],
  socialLinks: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61559256246770&locale=es_LA",
      platform: "facebook",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/uleam.arquitectura/",
      platform: "instagram",
    },
  ],
  copyright:
    "Copyright Todos los derechos reservados, Arquitectura - FIIA - ULEAM",
};

export const getFooterContent = (): FooterContent => footerContent;
