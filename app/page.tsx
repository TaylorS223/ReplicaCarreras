import Link from "next/link";
import { getAllCarreraTerms } from "@/lib/wordpress/services/getCarreraTermId";
import { getFacultadSlugs } from "@/lib/facultades/registry";

export default async function PortalPage() {
  // Lee las carreras desde la taxonomía de WordPress
  const terms = await getAllCarreraTerms();
  // Fallback al registry local si WordPress no está disponible
  const slugs = terms.length > 0
    ? terms.map((t) => t.slug)
    : getFacultadSlugs();

  return (
    <section className="section">
      <div className="container section-header">
        <h1>Portal de micrositios</h1>
        <p>Selecciona una carrera para ingresar a su micrositio.</p>
        <div>
          {slugs.map((slug) => (
            <p key={slug}>
              <Link href={`/${slug}`}>Ir a {slug}</Link>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
