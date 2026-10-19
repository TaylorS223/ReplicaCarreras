/**
 * Header.tsx
 *
 * Server Component que construye el navbar para cada carrera.
 *
 * ## Responsabilidades
 * - Recibe el header de esta petición desde bootstrap.ts; usa el store como fallback.
 * - Filtra los subitems de "Personal" según qué CPTs tienen datos reales en WordPress
 *   (decano, dirección de carrera, docentes, comisiones, administración).
 * - El filtro de visibilidad de "Proyectos" NO se aplica aquí — ya viene aplicado
 *   en el header retornado por syncFacultadContentFromAcf.
 *
 * ## Por qué no filtramos Proyectos aquí
 * Anteriormente se llamaba a checkProyectosVisibility() dos veces por request:
 * una en syncFacultadContentFromAcf y otra aquí. Si la segunda fallaba o devolvía
 * false, borraba el ítem de Proyectos del navbar aunque el sync lo hubiera incluido
 * correctamente, causando el bug de navbar intermitente. La solución fue eliminar
 * la segunda llamada y recibir el header filtrado de esta petición.
 */

import { SiteHeader } from "@/features/header/components/SiteHeader";
import { getHeaderContent } from "@/lib/wordpress/services/getHeader";
import { getAdministracionServiciosContent } from "@/lib/wordpress/services/getAdministracionServicios";
import { getDecanatoContent } from "@/lib/wordpress/services/getDecanato";
import { getDireccionCarreraContent } from "@/lib/wordpress/services/getDireccionCarrera";
import { getComisionesContent } from "@/lib/wordpress/services/getComisiones";
import { getDocentes } from "@/lib/wordpress/services/getDocentes";
import type { NavItem } from "@/types/nav";
import type { ContentContext } from "@/lib/content/resolver";
import type { HeaderContent } from "@/types/api";

type HeaderProps = {
  context?: ContentContext;
  content?: HeaderContent;
};

export const Header = async ({ context, content: hydratedContent }: HeaderProps = {}) => {
  const content = hydratedContent ?? getHeaderContent(context);

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
  // el layout entrega los navItems filtrados de esta petición.
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
