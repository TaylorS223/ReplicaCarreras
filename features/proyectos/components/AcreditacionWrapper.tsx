"use client";

import { useReveal } from "@/shared/hooks/useReveal";
import type { ReactNode } from "react";

export function AcreditacionWrapper({ children }: { children: ReactNode }) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      id="acreditacion"
      ref={ref}
      className={`section reveal${visible ? " reveal--visible" : ""}`}
      style={{ padding: 0 }}
    >
      {children}
    </section>
  );
}
