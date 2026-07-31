import Link from "next/link";
import { notFound } from "next/navigation";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { BuscarForm } from "@/features/buscar/components/BuscarForm";
import {
  getNoticiasContentByContext,
  getPersonalContentByContext,
  getMisionVisionItemsByContext,
  getProfileContentByContext,
  getAccreditationContentByContext,
  getPlanEstudiosContentByContext,
  getDecanatoContentByContext,
  getDireccionCarreraContentByContext,
  getComisionesContentByContext,
  getAdministracionServiciosContentByContext,
  getInfoCardsByContext,
} from "@/lib/content/resolver";
import type { ContentContext } from "@/lib/content/resolver";

type BuscarPageProps = {
  params: Promise<{ facultad: string }>;
  searchParams: Promise<{ q?: string }>;
};

type ResultadoBusqueda = {
  categoria: string;
  titulo: string;
  descripcion?: string;
  href: string;
};

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function incluye(texto: string | undefined, query: string): boolean {
  return !!texto && normalizar(texto).includes(query);
}

export default async function BuscarPage({ params, searchParams }: BuscarPageProps) {
  const { facultad } = await params;
  const { q } = await searchParams;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  const query = normalizar((q ?? "").trim());
  const ctx: ContentContext = {
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  };

  const resultados: ResultadoBusqueda[] = [];

  if (query) {
    // ── Noticias ──────────────────────────────────────────────
    getNoticiasContentByContext(ctx).forEach((n) => {
      if (
        incluye(n.titulo, query) ||
        incluye(n.resumen, query) ||
        incluye(n.contenido, query) ||
        incluye(n.autor, query)
      ) {
        resultados.push({
          categoria: "Noticias",
          titulo: n.titulo,
          descripcion: n.resumen || undefined,
          href: `/${facultad}/noticias/${n.slug}`,
        });
      }
    });

    // ── Docentes ──────────────────────────────────────────────
    getPersonalContentByContext(ctx).docentes.forEach((d) => {
      if (
        incluye(d.nombre, query) ||
        incluye(d.titulo, query) ||
        incluye(d.especializacion, query) ||
        d.formacionAcademica.some((f) => incluye(f, query))
      ) {
        resultados.push({
          categoria: "Personal docente",
          titulo: d.nombre,
          descripcion: `${d.titulo}${d.especializacion ? ` — ${d.especializacion}` : ""}`,
          href: `/${facultad}/personal/${d.slug}`,
        });
      }
    });

    // ── Decanato ──────────────────────────────────────────────
    getDecanatoContentByContext(ctx).profiles.forEach((p) => {
      if (
        incluye(p.nombre, query) ||
        incluye(p.cargo, query) ||
        p.biografia.some((b) => incluye(b, query))
      ) {
        resultados.push({
          categoria: "Decanato",
          titulo: p.nombre,
          descripcion: p.cargo,
          href: `/${facultad}/personal/decanato`,
        });
      }
    });

    // ── Dirección de Carrera ───────────────────────────────────
    getDireccionCarreraContentByContext(ctx).profiles.forEach((p) => {
      if (
        incluye(p.nombre, query) ||
        incluye(p.cargo, query) ||
        p.biografia.some((b) => incluye(b, query))
      ) {
        resultados.push({
          categoria: "Dirección de Carrera",
          titulo: p.nombre,
          descripcion: p.cargo,
          href: `/${facultad}/personal/direccion-carrera`,
        });
      }
    });

    // ── Comisiones ────────────────────────────────────────────
    getComisionesContentByContext(ctx).profiles.forEach((p) => {
      if (
        incluye(p.nombre, query) ||
        incluye(p.comision, query) ||
        p.formacionAcademica.some((f) => incluye(f, query))
      ) {
        resultados.push({
          categoria: "Comisiones",
          titulo: p.nombre,
          descripcion: p.comision,
          href: `/${facultad}/personal/comisiones`,
        });
      }
    });

    // ── Administración y servicios ────────────────────────────
    getAdministracionServiciosContentByContext(ctx).groups.forEach((g) => {
      g.items.forEach((item) => {
        if (
          incluye(item.nombre, query) ||
          incluye(item.cargo, query)
        ) {
          resultados.push({
            categoria: "Administración y Servicios",
            titulo: item.nombre,
            descripcion: item.cargo,
            href: `/${facultad}/personal/administracion-servicios`,
          });
        }
      });
    });

    // ── Misión / Visión ───────────────────────────────────────
    getMisionVisionItemsByContext(ctx).forEach((mv) => {
      if (incluye(mv.title, query) || incluye(mv.description, query)) {
        resultados.push({
          categoria: "Misión / Visión",
          titulo: mv.title,
          descripcion: mv.description.slice(0, 160),
          href: `/${facultad}#mision`,
        });
      }
    });

    // ── Perfil de egreso / Campo laboral ──────────────────────
    const profile = getProfileContentByContext(ctx);
    if (incluye(profile.sectionTitle, query)) {
      resultados.push({
        categoria: "Información institucional",
        titulo: profile.sectionTitle,
        href: `/${facultad}#perfil`,
      });
    }
    profile.cards.forEach((card) => {
      if (
        incluye(card.title, query) ||
        card.paragraphs.some((p) => incluye(p, query))
      ) {
        resultados.push({
          categoria: "Información institucional",
          titulo: card.title,
          descripcion: card.paragraphs[0]?.slice(0, 160),
          href: `/${facultad}#perfil`,
        });
      }
    });

    // ── Acreditación ──────────────────────────────────────────
    const accreditation = getAccreditationContentByContext(ctx);
    if (
      incluye(accreditation.title, query) ||
      accreditation.paragraphs.some((p) => incluye(p, query))
    ) {
      resultados.push({
        categoria: "Acreditación Internacional",
        titulo: accreditation.title,
        descripcion: accreditation.paragraphs[0]?.slice(0, 160),
        href: `/${facultad}#acreditacion`,
      });
    }

    // ── Plan de estudios (materias) ───────────────────────────
    const planEstudios = getPlanEstudiosContentByContext(ctx);
    planEstudios.levels.forEach((level) => {
      level.courses.forEach((course) => {
        if (
          incluye(course.title, query) ||
          incluye(course.description, query)
        ) {
          resultados.push({
            categoria: `Plan de estudios — ${level.title}`,
            titulo: course.title,
            descripcion: course.description?.slice(0, 160) || undefined,
            href: `/${facultad}#planestudios`,
          });
        }
      });
    });

    // ── Info cards (título profesional, jornada, duración, modalidad) ──
    getInfoCardsByContext(ctx).forEach((card) => {
      if (incluye(card.title, query) || incluye(card.value, query)) {
        resultados.push({
          categoria: "Información de la carrera",
          titulo: card.title,
          descripcion: card.value,
          href: `/${facultad}`,
        });
      }
    });
  }

  return (
    <div className="buscar-wrapper">
      <div className="buscar-hero">
        <div className="container">
          {query && (
            <p className="buscar-caption">
              {resultados.length} resultado{resultados.length !== 1 ? "s" : ""} para &ldquo;{q}&rdquo;
            </p>
          )}
          <h1 className="buscar-title">Búsqueda</h1>
        </div>
      </div>

      <div className="container buscar-body">
        <BuscarForm facultad={facultad} initialQuery={q ?? ""} />

        {query && resultados.length === 0 && (
          <p className="buscar-empty">
            No se encontraron resultados para &ldquo;{q}&rdquo;.
          </p>
        )}

        {resultados.length > 0 && (() => {
          const porCategoria = resultados.reduce<Record<string, ResultadoBusqueda[]>>(
            (acc, r) => {
              if (!acc[r.categoria]) acc[r.categoria] = [];
              acc[r.categoria].push(r);
              return acc;
            },
            {},
          );

          return Object.entries(porCategoria).map(([categoria, items]) => (
            <section key={categoria} className="buscar-section">
              <h2 className="buscar-section-title">{categoria}</h2>
              <ul className="buscar-list">
                {items.map((item, i) => (
                  <li key={`${item.href}-${i}`} className="buscar-item">
                    <Link href={item.href} className="buscar-item-link">
                      <span className="buscar-item-title">{item.titulo}</span>
                    </Link>
                    {item.descripcion && (
                      <p className="buscar-item-excerpt">{item.descripcion}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ));
        })()}
      </div>
    </div>
  );
}
