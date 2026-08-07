"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getFacultadConfig } from "@/lib/facultades/registry";
import type { HeaderContent } from "@/types/api";

type SiteHeaderProps = {
  content: HeaderContent;
};

export const SiteHeader = ({ content }: SiteHeaderProps) => {
  const pathname = usePathname();
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const currentFacultad = getFacultadConfig(firstSegment) ? firstSegment : null;

  const [isCompact, setIsCompact] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
  const [searchValue, setSearchValue] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const resolveHref = (href: string) => {
    if (!currentFacultad || !href.startsWith("/")) return href;
    if (href === "/") return `/${currentFacultad}`;
    return `/${currentFacultad}${href}`;
  };

  const toggleMobileSubmenu = (href: string) => {
    setOpenMobileSubmenus((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    const base = currentFacultad ? `/${currentFacultad}` : "";
    router.push(`${base}/buscar?q=${encodeURIComponent(q)}`);
    setIsSearchOpen(false);
    setSearchValue("");
  };

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú mobile cuando cambia la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenus({});
  }, [pathname]);

  const getDisplayLabel = (href: string, defaultLabel: string) => {
    const labels = content.menuLabels;
    if (!labels) return defaultLabel;
    const h = href.toLowerCase();
    if (h === "/" && labels.inicio) return labels.inicio;
    if (h.includes("personal") && labels.personal) return labels.personal;
    if (h.includes("proyecto") && labels.proyectos) return labels.proyectos;
    if (h.includes("plan") && labels.planEstudio) return labels.planEstudio;
    return defaultLabel;
  };

  // Mueve el indicador al elemento hovereado
  const moveIndicatorTo = (el: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const padding = 6; // px extra a cada lado
    setIndicatorStyle({
      left: elRect.left - navRect.left - padding,
      width: elRect.width + padding * 2,
      opacity: 1,
    });
  };

  // Vuelve el indicador al elemento activo
  const resetIndicatorToActive = () => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>("a.is-active");
    if (active) {
      moveIndicatorTo(active);
    } else {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }));
    }
  };

  // Posiciona el indicador en el activo al montar y cuando cambia la ruta
  useEffect(() => {
    // Pequeño delay para que el DOM esté listo
    const t = setTimeout(resetIndicatorToActive, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <header className={`site-header ${isCompact ? "is-compact" : ""}`}>
      <div className="container header-inner">
        <Link className="brand" href={content.brandHref} aria-label={content.brandAlt}>
          <img
            src={content.logoAcreditadoraNavbar ?? content.brandImage}
            alt={content.logoAcreditadoraNavbar ? "Logo acreditadora" : content.brandAlt}
          />
        </Link>

        {/* Botón hamburguesa */}
        <button
          type="button"
          className={`mobile-menu-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav desktop */}
        <nav ref={navRef} className="main-nav desktop-nav" aria-label="Navegación principal" onMouseLeave={resetIndicatorToActive}>
          {/* Indicador deslizante */}
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              height: 4,
              borderRadius: 999,
              background: "#c8db39",
              opacity: indicatorStyle.opacity,
              transition: "left 220ms ease, width 220ms ease, opacity 180ms ease",
              pointerEvents: "none",
            }}
          />
          {content.navItems.map((item) => {
            const resolvedHref = resolveHref(item.href);
            const isHome = item.href === "/" || resolvedHref === `/${currentFacultad}`;
            const isActive = isHome
              ? pathname === resolvedHref
              : pathname === resolvedHref ||
                pathname.startsWith(`${resolvedHref}/`);
            const displayLabel = getDisplayLabel(item.href, item.label);

            return (
              <div
                key={item.href}
                className="nav-item-group"
                onMouseEnter={(e) => {
                  const link = e.currentTarget.querySelector<HTMLElement>("a");
                  if (link) moveIndicatorTo(link);
                }}
              >
                <Link href={resolvedHref} className={isActive ? "is-active" : undefined}>
                  {displayLabel}
                </Link>
                {item.subItems?.length ? (
                  <div className="nav-dropdown" role="menu" aria-label={`Submenú de ${displayLabel}`}>
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.href} href={resolveHref(subItem.href)} role="menuitem">
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="nav-search">
            <button
              type="button"
              className="search-toggle"
              aria-label="Abrir búsqueda"
              aria-expanded={isSearchOpen}
              onClick={() => {
                setIsSearchOpen((v) => !v);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
            >
              <span aria-hidden="true">⌕</span>
            </button>
            <div className={`search-panel ${isSearchOpen ? "is-open" : ""}`}>
              <form onSubmit={handleSearchSubmit} role="search">
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Buscar..."
                  aria-label="Buscar contenido"
                />
              </form>
            </div>
          </div>
        </nav>

        {/* Nav mobile — panel deslizable */}
        {isMobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Navegación mobile">
            {content.navItems.map((item) => {
              const displayLabel = getDisplayLabel(item.href, item.label);
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isSubOpen = openMobileSubmenus[item.href] ?? false;

              return (
                <div key={item.href} className="mobile-nav-item">
                  {hasSubItems ? (
                    <>
                      <button
                        type="button"
                        className={`mobile-nav-toggle ${isSubOpen ? "is-open" : ""}`}
                        onClick={() => toggleMobileSubmenu(item.href)}
                        aria-expanded={isSubOpen}
                      >
                        <span>{displayLabel}</span>
                        <span className="mobile-nav-arrow" aria-hidden="true">
                          {isSubOpen ? "▲" : "▼"}
                        </span>
                      </button>
                      {isSubOpen && (
                        <div className="mobile-nav-submenu">
                          {item.subItems!.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={resolveHref(subItem.href)}
                              className="mobile-nav-sublink"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={resolveHref(item.href)} className="mobile-nav-link">
                      {displayLabel}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
