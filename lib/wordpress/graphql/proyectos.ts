import { gqlFetch } from "@/lib/wordpress/graphql/client";
import { getAcfProyectos } from "@/lib/wordpress/acf/proyectos";

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

export type { ProyectoItem } from "@/lib/wordpress/acf/proyectos";
export const getProyectosVinculacion = (carreraSlug?: string) => getAcfProyectos("vinculacion", carreraSlug);
export const getProyectosInvestigacion = (carreraSlug?: string) => getAcfProyectos("investigacion", carreraSlug);
