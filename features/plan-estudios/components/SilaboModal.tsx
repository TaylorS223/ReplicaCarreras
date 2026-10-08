"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { SilaboData, SilaboUnidad } from "@/types/api";
import "./SilaboModal.css";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatRevision = (raw: string): string => {
  if (!raw) return "";
  // Acepta YYYYMMDD (ACF date picker) o YYYY-MM-DD
  const clean = raw.replace(/-/g, "");
  if (/^\d{8}$/.test(clean)) {
    return `${clean.slice(6, 8)}/${clean.slice(4, 6)}/${clean.slice(0, 4)}`;
  }
  return raw;
};

// ── Sub-componente: Sección acordeón ─────────────────────────────────────────

const SilaboSection = ({
  number,
  title,
  children,
  defaultOpen = false,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`silabo-section${open ? " silabo-section--open" : ""}`}>
      <button
        className="silabo-section__header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        type="button"
      >
        <span className="silabo-section__title">
          {number}. {title}
        </span>
        <span className="silabo-section__icon" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="silabo-section__body">{children}</div>}
    </div>
  );
};

// ── Sub-componente: Unidad de contenido ──────────────────────────────────────

const SilaboUnidadCard = ({ unidad, index }: { unidad: SilaboUnidad; index: number }) => {
  const [open, setOpen] = useState(index === 0);
  const temas = unidad.temasUnidad
    .split(/\n|\.(?=\s)/)
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className={`silabo-unidad${open ? " silabo-unidad--open" : ""}`}>
      <button
        className="silabo-unidad__header"
        onClick={() => setOpen((o) => !o)}
        type="button"
        aria-expanded={open}
      >
        <div className="silabo-unidad__meta">
          <span className="silabo-unidad__label">UNIDAD {unidad.numeroUnidad}</span>
          <span className="silabo-unidad__titulo">{unidad.tituloUnidad}</span>
        </div>
        <span className="silabo-unidad__toggle" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="silabo-unidad__body">
          <ul className="silabo-unidad__temas">
            {temas.map((tema, i) => (
              <li key={i} className="silabo-unidad__tema">
                <span className="silabo-unidad__tema-num">
                  {unidad.numeroUnidad}.{i + 1}
                </span>
                {tema}
              </li>
            ))}
          </ul>

          {unidad.resultadoAprendizajeUnidad && (
            <div className="silabo-unidad__resultado">
              <span className="silabo-unidad__resultado-label">
                {unidad.codigoResultado && (
                  <span className="silabo-unidad__codigo">{unidad.codigoResultado}</span>
                )}
                Resultado de aprendizaje
              </span>
              <p>{unidad.resultadoAprendizajeUnidad}</p>
            </div>
          )}

          {unidad.actividadesPracticas && (
            <div className="silabo-unidad__actividades">
              <span className="silabo-unidad__actividades-label">Actividades prácticas</span>
              <p>{unidad.actividadesPracticas}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────

type SilaboModalProps = {
  courseTitle: string;
  credits: string;
  silabo: SilaboData;
  onClose: () => void;
};

export const SilaboModal = ({ courseTitle, credits, silabo, onClose }: SilaboModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Cerrar con Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Bloquear scroll del body
    document.body.style.overflow = "hidden";
    // Foco inicial al dialog
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Cerrar al hacer clic fuera del panel
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const totalUnidades = silabo.unidadesContenido.length;
  const fechaRevision = formatRevision(silabo.ultimaRevision);

  // Agrupar criterios por ámbito para la vista de la sección 4
  const basicas = silabo.referenciasBibliograficas.filter((r) => r.tipoReferencia === "basica");
  const complementarias = silabo.referenciasBibliograficas.filter(
    (r) => r.tipoReferencia === "complementaria",
  );

  return (
    <div
      className="silabo-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Sílabo de ${courseTitle}`}
    >
      <div
        className="silabo-panel"
        ref={dialogRef}
        tabIndex={-1}
      >
        {/* ── Encabezado ── */}
        <div className="silabo-panel__head">
          <div className="silabo-head-top">
            <div className="silabo-badges">
              {silabo.codigoAsignatura && (
                <span className="silabo-badge">{silabo.codigoAsignatura}</span>
              )}
              {silabo.nivelMalla && (
                <span className="silabo-badge">NIVEL {silabo.nivelMalla}</span>
              )}
            </div>
            <button
              className="silabo-close"
              onClick={onClose}
              aria-label="Cerrar sílabo"
              type="button"
            >
              ✕
            </button>
          </div>

          <h2 className="silabo-panel__title">{courseTitle}</h2>
          <p className="silabo-panel__subtitle">
            {silabo.planCurricular}
            {silabo.modalidad && ` · Modalidad ${silabo.modalidad}`}
          </p>

          {/* Tarjetas de resumen */}
          <div className="silabo-stats">
            <div className="silabo-stat">
              <span className="silabo-stat__label">CRÉDITOS</span>
              <span className="silabo-stat__value">{credits} ECTS</span>
            </div>
            <div className="silabo-stat">
              <span className="silabo-stat__label">HORAS TOTALES</span>
              <span className="silabo-stat__value">
                {silabo.horasTotales > 0 ? `${silabo.horasTotales} h` : "—"}
              </span>
            </div>
            <div className="silabo-stat">
              <span className="silabo-stat__label">UNIDADES</span>
              <span className="silabo-stat__value">
                {totalUnidades > 0 ? `${totalUnidades} Unidades` : "—"}
              </span>
            </div>
            <div className="silabo-stat">
              <span className="silabo-stat__label">CURRICULAR</span>
              <span className="silabo-stat__value">
                {silabo.unidadOrganizacionCurricular || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Cuerpo con secciones acordeón ── */}
        <div className="silabo-panel__body">

          {/* 1. Datos generales */}
          <SilaboSection number={1} title="DATOS GENERALES Y ESPECÍFICOS DE LA ASIGNATURA">
            <div className="silabo-datos-generales">
              {fechaRevision && (
                <div className="silabo-revision-badge">
                  Última revisión realizada: <strong>{fechaRevision}</strong>
                </div>
              )}
              <table className="silabo-table">
                <tbody>
                  {[
                    ["Unidad académica:", silabo.unidadAcademica],
                    ["Modalidad:", silabo.modalidad],
                    ["Sistema de estudio:", silabo.sistemaEstudio],
                    ["Nivel en la malla:", silabo.nivelMalla],
                    ["Unidad de organización curricular:", silabo.unidadOrganizacionCurricular],
                    ["Núcleos / Campo de formación:", silabo.nucleoFormacion],
                    ["Plan curricular:", silabo.planCurricular],
                    ["Período académico:", silabo.periodoInicioVigencia],
                  ]
                    .filter(([, val]) => val)
                    .map(([label, value]) => (
                      <tr key={label} className="silabo-table__row">
                        <td className="silabo-table__label">{label}</td>
                        <td className="silabo-table__value">{value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {(silabo.horasContactoDocente > 0 || silabo.horasPracticoExperimental > 0 || silabo.horasAutonomas > 0) && (
                <div className="silabo-horas">
                  <span className="silabo-horas__label">Distribución de horas</span>
                  <div className="silabo-horas__grid">
                    {silabo.horasContactoDocente > 0 && (
                      <div className="silabo-hora-item">
                        <span className="silabo-hora-item__num">{silabo.horasContactoDocente}</span>
                        <span className="silabo-hora-item__desc">Contacto con docente</span>
                      </div>
                    )}
                    {silabo.horasPracticoExperimental > 0 && (
                      <div className="silabo-hora-item">
                        <span className="silabo-hora-item__num">{silabo.horasPracticoExperimental}</span>
                        <span className="silabo-hora-item__desc">Práctico-experimental</span>
                      </div>
                    )}
                    {silabo.horasAutonomas > 0 && (
                      <div className="silabo-hora-item">
                        <span className="silabo-hora-item__num">{silabo.horasAutonomas}</span>
                        <span className="silabo-hora-item__desc">Autónomo</span>
                      </div>
                    )}
                    {silabo.horasTotales > 0 && (
                      <div className="silabo-hora-item silabo-hora-item--total">
                        <span className="silabo-hora-item__num">{silabo.horasTotales}</span>
                        <span className="silabo-hora-item__desc">Total</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SilaboSection>

          {/* 2. Contribución a la formación profesional */}
          {(silabo.objetoEstudioCarrera || silabo.resultadoAprendizajeAsignatura) && (
            <SilaboSection number={2} title="CONTRIBUCIÓN DE LA ASIGNATURA A LA FORMACIÓN PROFESIONAL">
              <div className="silabo-contribucion">
                {silabo.objetoEstudioCarrera && (
                  <div className="silabo-contrib-card">
                    <span className="silabo-contrib-card__label">OBJETO DE ESTUDIO DE LA CARRERA</span>
                    <p>{silabo.objetoEstudioCarrera}</p>
                  </div>
                )}
                {silabo.perfilEgreso && (
                  <div className="silabo-contrib-card">
                    <span className="silabo-contrib-card__label">PERFIL DE EGRESO</span>
                    <p>{silabo.perfilEgreso}</p>
                  </div>
                )}
                {silabo.resultadoAprendizajePerfil && (
                  <div className="silabo-contrib-card">
                    <span className="silabo-contrib-card__label">RESULTADO DE APRENDIZAJE DEL PERFIL</span>
                    <p>{silabo.resultadoAprendizajePerfil}</p>
                  </div>
                )}
                {silabo.resultadoAprendizajeAsignatura && (
                  <div className="silabo-contrib-card">
                    <span className="silabo-contrib-card__label">RESULTADO DE APRENDIZAJE DE LA ASIGNATURA</span>
                    <p>{silabo.resultadoAprendizajeAsignatura}</p>
                  </div>
                )}
              </div>
            </SilaboSection>
          )}

          {/* 3. Contenidos */}
          {silabo.unidadesContenido.length > 0 && (
            <SilaboSection number={3} title="CONTENIDOS">
              <div className="silabo-unidades">
                {silabo.unidadesContenido.map((unidad, i) => (
                  <SilaboUnidadCard key={i} unidad={unidad} index={i} />
                ))}
              </div>
            </SilaboSection>
          )}

          {/* 4. Criterios de evaluación */}
          {silabo.criteriosEvaluacion.length > 0 && (
            <SilaboSection number={4} title="CRITERIOS DE EVALUACIÓN">
              <div className="silabo-evaluacion">
                {silabo.criteriosEvaluacion.map((criterio, i) => (
                  <div key={i} className="silabo-eval-card">
                    <div className="silabo-eval-card__header">
                      <strong>
                        {criterio.tipoEvaluacion}
                        {criterio.porcentaje > 0 && `: ${criterio.porcentaje}%`}
                      </strong>
                    </div>
                    {criterio.ambito && (
                      <p className="silabo-eval-card__ambito">
                        <span className="silabo-eval-card__ambito-label">Ámbito: </span>
                        {criterio.ambito}
                      </p>
                    )}
                    {criterio.estrategias && (
                      <p className="silabo-eval-card__estrategias">{criterio.estrategias}</p>
                    )}
                  </div>
                ))}
              </div>
            </SilaboSection>
          )}

          {/* 5. Referencias bibliográficas */}
          {silabo.referenciasBibliograficas.length > 0 && (
            <SilaboSection number={5} title="REFERENCIAS BIBLIOGRÁFICAS">
              <div className="silabo-referencias">
                {basicas.length > 0 && (
                  <div className="silabo-refs-group">
                    <span className="silabo-refs-group__label">Básica</span>
                    <ul className="silabo-refs-list">
                      {basicas.map((ref, i) => (
                        <li key={i} className="silabo-ref-item">
                          {ref.autores && <span>{ref.autores}</span>}
                          {ref.anio && <span> ({ref.anio}). </span>}
                          {ref.tituloObra && <em>{ref.tituloObra}. </em>}
                          {ref.editorial && <span>{ref.editorial}. </span>}
                          {ref.urlReferencia && (
                            <a
                              href={ref.urlReferencia}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="silabo-ref-link"
                            >
                              {ref.urlReferencia}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {complementarias.length > 0 && (
                  <div className="silabo-refs-group">
                    <span className="silabo-refs-group__label">Complementaria</span>
                    <ul className="silabo-refs-list">
                      {complementarias.map((ref, i) => (
                        <li key={i} className="silabo-ref-item">
                          {ref.autores && <span>{ref.autores}</span>}
                          {ref.anio && <span> ({ref.anio}). </span>}
                          {ref.tituloObra && <em>{ref.tituloObra}. </em>}
                          {ref.editorial && <span>{ref.editorial}. </span>}
                          {ref.urlReferencia && (
                            <a
                              href={ref.urlReferencia}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="silabo-ref-link"
                            >
                              {ref.urlReferencia}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </SilaboSection>
          )}

        </div>
      </div>
    </div>
  );
};
