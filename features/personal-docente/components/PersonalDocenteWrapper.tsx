"use client";

import { useReveal } from "@/shared/hooks/useReveal";
import type { ReactNode } from "react";

export function PersonalDocenteWrapper({ children }: { children: ReactNode }) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      id="personal"
      ref={ref}
      className={`section reveal${visible ? " reveal--visible" : ""}`}
    >
      {children}
    </section>
  );
}
