"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Course, PlanEstudiosContent, StudyLevel } from "@/types/api";
import { useReveal } from "@/shared/hooks/useReveal";

// ── Sub-componentes ───────────────────────────────────────────────────────────

const PlanCourseAccordion = ({ course }: { course: Course }) => (
  <details className="course-item" {...(course.open ? { open: true } : {})}>
    <summary>
      <span className="course-title">{course.title}</span>
      <span className="course-toggle" aria-hidden="true"></span>
    </summary>
    <div className="course-content">
      <p className="course-description">{course.description}</p>
      <div className="course-meta">
        <span>Créditos:</span> <strong>{course.credits}</strong>
      </div>
      <a
        className="course-syllabus"
        href={course.syllabusUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Sílabo
      </a>
    </div>
  </details>
);

const PlanLevelCard = ({
  level,
  state,
}: {
  level: StudyLevel;
  state: "active" | "prev" | "next" | "hidden";
}) => (
  <article className={`plan-carousel-card plan-carousel-card--${state}`} aria-hidden={state === "hidden"}>
    <div className="plan-level-heading">
      <h3>{level.title}</h3>
      <div className="level-note">Créditos por nivel: {level.totalCredits}</div>
    </div>
    <div className="plan-carousel-courses">
      {level.courses.map((course) => (
        <PlanCourseAccordion key={course.title} course={course} />
      ))}
    </div>
  </article>
);

// ── Componente principal ──────────────────────────────────────────────────────

export const PlanEstudiosSection = ({ content }: { content: PlanEstudiosContent }) => {
  const [active, setActive] = useState(0);
  const total = content.levels.length;
  const [sectionRef, visible] = useReveal<HTMLElement>();

  // Touch / swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prev = useCallback(() => setActive((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActive((i) => Math.min(total - 1, i + 1)), [total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Solo swipe horizontal (dx dominante)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById("plan");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const getState = (i: number): "active" | "prev" | "next" | "hidden" => {
    if (i === active) return "active";
    if (i === active - 1) return "prev";
    if (i === active + 1) return "next";
    return "hidden";
  };

  return (
    <section
      id="plan"
      ref={sectionRef}
      className={`section plan-carousel-section reveal${visible ? " reveal--visible" : ""}`}
    >
      <div className="container">
        <div className="section-header">
          <h2>{content.title}</h2>
          {content.description && <p>{content.description}</p>}
        </div>
      </div>

      {/* ── Carrusel peek — visible en desktop ── */}
      <div
        className="plan-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carrusel"
        aria-label="Niveles del plan de estudios"
      >
        <div className="plan-carousel-track">
          {content.levels.map((level, i) => (
            <PlanLevelCard key={level.title} level={level} state={getState(i)} />
          ))}
        </div>

        <button
          className="plan-carousel-btn plan-carousel-btn--prev"
          onClick={prev}
          disabled={active === 0}
          aria-label="Nivel anterior"
        >
          &#8249;
        </button>
        <button
          className="plan-carousel-btn plan-carousel-btn--next"
          onClick={next}
          disabled={active === total - 1}
          aria-label="Nivel siguiente"
        >
          &#8250;
        </button>
      </div>

      {/* Dots */}
      <div className="plan-carousel-dots" role="tablist" aria-label="Niveles">
        {content.levels.map((level, i) => (
          <button
            key={level.title}
            role="tab"
            aria-selected={i === active}
            aria-label={`Ir a ${level.title}`}
            className={`plan-carousel-dot${i === active ? " plan-carousel-dot--active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      {/* ── Acordeón — visible solo en móvil ── */}
      <div className="container">
        <div className="plan-accordion-mobile">
          {content.levels.map((level) => (
            <details key={level.title} className="study-level">
              <summary>{level.title}</summary>
              <div className="study-items">
                {level.courses.map((course) => (
                  <PlanCourseAccordion key={course.title} course={course} />
                ))}
              </div>
              <div className="level-note">Créditos por nivel: {level.totalCredits}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
