import type { ContentContext } from "@/lib/content/resolver";
import type { Noticia } from "@/types/noticia";
import { getProyectosContentByContext } from "@/lib/content/resolver";

export const getNoticias = (context?: ContentContext): Noticia[] => {
  const sourceItems = getProyectosContentByContext(context).items;
  const facultadSlug = context?.facultadSlug ?? "arquitectura";

  return sourceItems.map((item, index) => ({
    slug: `noticia-${index + 1}`,
    titulo: item.titulo,
    fechaISO: item.fechaISO,
    fechaTexto: item.fechaTexto,
    resumen: item.titulo,
    contenido: item.titulo,
    imagen: item.imagen,
    alt: item.alt,
    href: `/${facultadSlug}/noticias/noticia-${index + 1}`,
  }));
};
