"use client";

import dynamic from "next/dynamic";
import { useReveal } from "@/shared/hooks/useReveal";
import type { ReactNode } from "react";

// Canvas cargado con ssr:false — depende de window/requestAnimationFrame
const ParticleNetwork = dynamic(
  () => import("@/shared/components/ParticleNetwork").then((m) => m.ParticleNetwork),
  { ssr: false, loading: () => null },
);

interface PerfilIngresoEgresoWrapperProps {
  sectionTitle: string;
  children: ReactNode;
}

/**
 * Wrapper client-only para PerfilIngresoEgreso.
 * Gestiona el reveal-on-scroll y el canvas de partículas.
 * El contenido (cards) se renderiza en el Server Component padre.
 */
export function PerfilIngresoEgresoWrapper({
  sectionTitle,
  children,
}: PerfilIngresoEgresoWrapperProps) {
  const [ref, visible] = useReveal<HTMLElement>();

  return (
    <>
      <h2 className={`section-title reveal${visible ? " reveal--visible" : ""}`}>
        {sectionTitle}
      </h2>
      <section
        id="perfil"
        ref={ref}
        className={`section profile-section reveal reveal--fade${visible ? " reveal--visible" : ""}`}
      >
        <ParticleNetwork
          particleCount={90}
          colors={["#ffffff", "#c8db39", "#8ba3d6"]}
          lineColor="#a0b8e0"
          maxDistance={160}
        />
        <div className="container split-grid">
          {children}
        </div>
      </section>
    </>
  );
}
