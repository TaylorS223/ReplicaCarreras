import { SiteHeader } from "@/features/header/components/SiteHeader";
import { getHeaderContent } from "@/lib/wordpress/services/getHeader";
import { getAdministracionServiciosContent } from "@/lib/wordpress/services/getAdministracionServicios";
import { getDecanatoContent } from "@/lib/wordpress/services/getDecanato";
import { getDireccionCarreraContent } from "@/lib/wordpress/services/getDireccionCarrera";
import { getComisionesContent } from "@/lib/wordpress/services/getComisiones";
import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import { checkProyectosVisibility } from "@/lib/wordpress/graphql/proyectos";
import type { NavItem } from "@/types/nav";
import type { ContentContext } from "@/lib/content/resolver";

type HeaderProps = {
  context?: ContentContext;
};

export const Header = async ({ context }: HeaderProps = {}) => {
  const content = getHeaderContent(context);

  // Determina qué subitems de Personal tienen datos en el store
  const hasDecano = (() => { try { return getDecanatoContent(context).profiles.length > 0; } catch { return false; } })();
  const hasDireccion = (() => { try { return getDireccionCarreraContent(context).profiles.length > 0; } catch { return false; } })();
  const hasDocentes = (() => { try { return (getDocentes(context) ?? []).length > 0; } catch { return false; } })();
  const hasComisiones = (() => { try { return getComisionesContent(context).profiles.length > 0; } catch { return false; } })();
  const hasAdmin = (() => { try { return getAdministracionServiciosContent(context).groups.some((g) => g.items.length > 0); } catch { return false; } })();

  const SUBMENU_FLAGS: Record<string, boolean> = {
    decanato: hasDecano,
    "direccion-carrera": hasDireccion,
    docentes: hasDocentes,
    comisiones: hasComisiones,
    "administracion-servicios": hasAdmin,
  };

  // Filtra subitems de Personal según qué CPTs tienen datos.
  // El filtro de Proyectos ya fue aplicado en syncFacultadContentFromAcf —
  // los navItems que llegan del store ya tienen la visibilidad correcta.
  const filteredNavItems: NavItem[] = content.navItems.map((item) => {
    if (!item.subItems?.length) return item;

    const filtered = item.subItems.filter((sub) => {
      const personalKey = Object.keys(SUBMENU_FLAGS).find((k) => sub.href.includes(k));
      if (personalKey) return SUBMENU_FLAGS[personalKey];
      return true;
    });

    return { ...item, subItems: filtered };
  });

  return <SiteHeader content={{ ...content, navItems: filteredNavItems }} />;
};
