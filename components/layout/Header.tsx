import { SiteHeader } from "@/features/header/components/SiteHeader";
import { getHeaderContent } from "@/lib/wordpress/services/getHeader";
import { getAdministracionServiciosContent } from "@/lib/wordpress/services/getAdministracionServicios";
import { getDecanatoContent } from "@/lib/wordpress/services/getDecanato";
import { getDireccionCarreraContent } from "@/lib/wordpress/services/getDireccionCarrera";
import { getComisionesContent } from "@/lib/wordpress/services/getComisiones";
import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import type { NavItem } from "@/types/nav";

export const Header = () => {
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

  // Filtra subitems de Personal según qué CPTs tienen datos
  const filteredNavItems: NavItem[] = content.navItems.map((item) => {
    if (!item.subItems?.length) return item;
    const filtered = item.subItems.filter((sub) => {
      const key = Object.keys(SUBMENU_FLAGS).find((k) => sub.href.includes(k));
      return key ? SUBMENU_FLAGS[key] : true;
    });
    return { ...item, subItems: filtered };
  });

  return <SiteHeader content={{ ...content, navItems: filteredNavItems }} />;
};
