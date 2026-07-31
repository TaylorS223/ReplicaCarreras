"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getHeaderContent } from "@/lib/wordpress/services/getHeader";
import { getFacultadConfig } from "@/lib/facultades/registry";

export const SiteHeader = () => {
  const pathname = usePathname();
  const content = getHeaderContent();
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const currentFacultad = getFacultadConfig(firstSegment) ? firstSegment : null;

  const resolveHref = (href: string) => {
    if (!currentFacultad || !href.startsWith("/")) {
      return href;
    }

    if (href === "/") {
      return `/${currentFacultad}`;
    }

    return `/${currentFacultad}${href}`;
  };
  const [isCompact, setIsCompact] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

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
              resolveHref(item.href) === "/"
                ? pathname === "/"
                : pathname === resolveHref(item.href) ||
                  pathname.startsWith(`${resolveHref(item.href)}/`);

            return (
              <div key={item.href} className="nav-item-group">
                <Link href={resolveHref(item.href)} className={isActive ? "is-active" : undefined}>
                  {item.label}
                </Link>

                {item.subItems?.length ? (
                  <div className="nav-dropdown" role="menu" aria-label={`Submenú de ${item.label}`}>
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
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Buscar..."
                  aria-label="Buscar contenido"
                />
              </form>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
