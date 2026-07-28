import Link from "next/link";
import { getFacultadSlugs } from "@/lib/facultades/registry";

export default function PortalPage() {
  const facultades = getFacultadSlugs();

  return (
    <section className="section">
      <div className="container section-header">
        <h1>Portal de micrositios ULEAM</h1>
        <p>Selecciona una facultad para ingresar a su micrositio.</p>

        <div>
          {facultades.map((facultad) => (
            <p key={facultad}>
              <Link href={`/${facultad}`}>Ir a {facultad}</Link>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
