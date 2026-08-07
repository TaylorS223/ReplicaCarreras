"use client";

import { useReveal } from "@/shared/hooks/useReveal";
import type { ReactNode } from "react";

export function ProyectosSectionWrapper({ children }: { children: ReactNode }) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      id="proyectos"
      ref={ref}
      className={`section reveal${visible ? " reveal--visible" : ""}`}
    >
      {children}
    </section>
  );
}
