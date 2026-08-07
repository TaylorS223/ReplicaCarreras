"use client";

import { useReveal } from "@/shared/hooks/useReveal";
import type { ReactNode } from "react";

export function DatosCarreraWrapper({ children }: { children: ReactNode }) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      id="datos"
      ref={ref}
      className={`container-info-section reveal reveal--fade${visible ? " reveal--visible" : ""}`}
    >
      {children}
    </section>
  );
}
