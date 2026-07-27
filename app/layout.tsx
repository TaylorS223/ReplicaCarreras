import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/features/footer/components/SiteFooter";
import { SiteHeader } from "@/features/header/components/SiteHeader";

export const metadata: Metadata = {
  title: "Arquitectura | ULEAM",
  description:
    "Micrositio de la carrera de Arquitectura de la Universidad Laica Eloy Alfaro de Manabí.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
