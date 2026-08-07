"use client";

import { useReveal } from "@/shared/hooks/useReveal";
import type { ReactNode } from "react";

/**
 * Wrapper client-only que aplica el reveal-on-scroll a la sección.
 * El contenido pesado (artículos) se renderiza en el Server Component padre (MisionVision.tsx).
 */
export function MisionVisionWrapper({ children }: { children: ReactNode }) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      id="mision-vision"
      ref={ref}
      className={`card-enfoque reveal${visible ? " reveal--visible" : ""}`}
    >
      {children}
    </section>
  );
}
