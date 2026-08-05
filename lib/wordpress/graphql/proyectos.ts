import { gqlFetch } from "@/lib/wordpress/graphql/client";

/**
 * Verifica si los CPTs de proyectos tienen posts publicados.
 * Usado para controlar la visibilidad de los submenús del navbar.
 */

type ProyectosExistenceResult = {
  proyectosVinculacion: { nodes: Array<{ slug: string }> };
  proyectosInvestigacion: { nodes: Array<{ slug: string }> };
};

const PROYECTOS_EXISTENCE_QUERY = `
  query CheckProyectosExistence {
    proyectosVinculacion(first: 1) {
      nodes {
        slug
      }
    }
    proyectosInvestigacion(first: 1) {
      nodes {
        slug
      }
    }
  }
`;

export type ProyectosVisibility = {
  hasVinculacion: boolean;
  hasInvestigacion: boolean;
};

export const checkProyectosVisibility = async (): Promise<ProyectosVisibility> => {
  try {
    const data = await gqlFetch<ProyectosExistenceResult>(PROYECTOS_EXISTENCE_QUERY);
    return {
      hasVinculacion: (data?.proyectosVinculacion?.nodes?.length ?? 0) > 0,
      hasInvestigacion: (data?.proyectosInvestigacion?.nodes?.length ?? 0) > 0,
    };
  } catch (error) {
    console.error("Error checking proyectos visibility:", error);
    return { hasVinculacion: false, hasInvestigacion: false };
  }
};

/**
 * Obtiene todos los posts de Vinculación con el Medio
 */

type ProyectoNode = {
  slug: string;
  title: string;
  content: string | null;
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
};

type ProyectosListResult = {
  proyectosVinculacion?: { nodes: ProyectoNode[] };
  proyectosInvestigacion?: { nodes: ProyectoNode[] };
};

const PROYECTOS_VINCULACION_QUERY = `
  query GetProyectosVinculacion {
    proyectosVinculacion(first: 100) {
      nodes {
        slug
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const PROYECTOS_INVESTIGACION_QUERY = `
  query GetProyectosInvestigacion {
    proyectosInvestigacion(first: 100) {
      nodes {
        slug
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export type ProyectoItem = {
  slug: string;
  titulo: string;
  contenido: string;
  fecha: string;
  imagen: string;
  imagenAlt: string;
};

const mapProyectoNode = (node: ProyectoNode): ProyectoItem => ({
  slug: node.slug,
  titulo: node.title,
  contenido: node.content ?? "",
  fecha: node.date.slice(0, 10),
  imagen: node.featuredImage?.node?.sourceUrl ?? "",
  imagenAlt: node.featuredImage?.node?.altText ?? node.title,
});

export const getProyectosVinculacion = async (): Promise<ProyectoItem[]> => {
  try {
    const data = await gqlFetch<ProyectosListResult>(PROYECTOS_VINCULACION_QUERY);
    return (data?.proyectosVinculacion?.nodes ?? []).map(mapProyectoNode);
  } catch (error) {
    console.error("Error fetching proyectos vinculacion:", error);
    return [];
  }
};

export const getProyectosInvestigacion = async (): Promise<ProyectoItem[]> => {
  try {
    const data = await gqlFetch<ProyectosListResult>(PROYECTOS_INVESTIGACION_QUERY);
    return (data?.proyectosInvestigacion?.nodes ?? []).map(mapProyectoNode);
  } catch (error) {
    console.error("Error fetching proyectos investigacion:", error);
    return [];
  }
};
