import { SiteHeader } from "@/features/header/components/SiteHeader";
import { getHeaderContent } from "@/lib/wordpress/services/getHeader";
import { getAdministracionServiciosContent } from "@/lib/wordpress/services/getAdministracionServicios";
import { getDecanatoContent } from "@/lib/wordpress/services/getDecanato";
import { getDireccionCarreraContent } from "@/lib/wordpress/services/getDireccionCarrera";
import { getComisionesContent } from "@/lib/wordpress/services/getComisiones";
import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import { checkProyectosVisibility } from "@/lib/wordpress/graphql/proyectos";
import type { NavItem } from "@/types/nav";

export const Header = async () => {
  const content = getHeaderContent();

  // Determina qué subitems de Personal tienen datos en el store
  const hasDecano = (() => { try { return getDecanatoContent().profiles.length > 0; } catch { return false; } })();
  const hasDireccion = (() => { try { return getDireccionCarreraContent().profiles.length > 0; } catch { return false; } })();
  const hasDocentes = (() => { try { return getDocentes().length > 0; } catch { return false; } })();
  const hasComisiones = (() => { try { return getComisionesContent().profiles.length > 0; } catch { return false; } })();
  const hasAdmin = (() => { try { return getAdministracionServiciosContent().groups.some((g) => g.items.length > 0); } catch { return false; } })();

  const SUBMENU_FLAGS: Record<string, boolean> = {
    decanato: hasDecano,
    "direccion-carrera": hasDireccion,
    docentes: hasDocentes,
    comisiones: hasComisiones,
    "administracion-servicios": hasAdmin,
  };

  // Verifica visibilidad de proyectos via GraphQL — siempre activo si hay WordPress configurado
  const proyectosVisibility = await checkProyectosVisibility().catch(() => ({
    hasVinculacion: false,
    hasInvestigacion: false,
  }));

  const PROYECTOS_FLAGS: Record<string, boolean> = {
    vinculacion: proyectosVisibility.hasVinculacion,
    investigacion: proyectosVisibility.hasInvestigacion,
  };

  // Filtra subitems según qué CPTs tienen datos
  const filteredNavItems: NavItem[] = content.navItems.map((item) => {
    if (!item.subItems?.length) return item;

    const filtered = item.subItems.filter((sub) => {
      // Filtro Personal
      const personalKey = Object.keys(SUBMENU_FLAGS).find((k) => sub.href.includes(k));
      if (personalKey) return SUBMENU_FLAGS[personalKey];

      // Filtro Proyectos
      const proyectosKey = Object.keys(PROYECTOS_FLAGS).find((k) => sub.href.includes(k));
      if (proyectosKey) return PROYECTOS_FLAGS[proyectosKey];

      return true;
    });

    return { ...item, subItems: filtered };
  }).filter((item) => {
    // Ocultar "Proyectos" si no tiene subItems visibles
    if (item.href.includes("proyectos")) {
      return (item.subItems?.length ?? 0) > 0;
    }
    return true;
  });

  return <SiteHeader content={{ ...content, navItems: filteredNavItems }} />;
};
