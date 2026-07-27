"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getHeaderContent } from "@/api/header";

export const SiteHeader = () => {
  const pathname = usePathname();
  const content = getHeaderContent();
  const [isCompact, setIsCompact] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`site-header ${isCompact ? "is-compact" : ""}`}>
      <div className="container header-inner">
        <Link className="brand" href={content.brandHref} aria-label={content.brandAlt}>
          <img src={content.brandImage} alt={content.brandAlt} />
        </Link>
        <nav className="main-nav" aria-label="Navegación principal">
          {content.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <div key={item.href} className="nav-item-group">
                <Link href={item.href} className={isActive ? "is-active" : undefined}>
                  {item.label}
                </Link>

                {item.subItems?.length ? (
                  <div className="nav-dropdown" role="menu" aria-label={`Submenú de ${item.label}`}>
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href} role="menuitem">
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
              onClick={() => setIsSearchOpen((value) => !value)}
            >
              <span aria-hidden="true">⌕</span>
            </button>

            <div className={`search-panel ${isSearchOpen ? "is-open" : ""}`}>
              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Buscar..."
                aria-label="Buscar contenido"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
