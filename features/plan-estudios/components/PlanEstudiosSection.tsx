"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { getPlanEstudiosContent } from "@/lib/wordpress/services/getPlanEstudios";
import type { Course, StudyLevel } from "@/types/api";

const MOBILE_FALLBACK_QUERY =
  "(max-width: 900px), (pointer: coarse), (prefers-reduced-motion: reduce)";

const LEVEL_SCROLL_SENSITIVITY = 0.42;
const LAST_LEVEL_HOLD_FACTOR = 0.45;
const FALLBACK_HEADER_HEIGHT = 91;
const SCROLL_EASING_FACTOR = 0.18;
const MIN_PROGRESS_DELTA = 0.001;

const PlanCourseAccordion = ({ course }: { course: Course }) => (
  <details className="course-item" open={course.open}>
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

const PlanLevelAccordion = ({ level }: { level: StudyLevel }) => (
  <details className="study-level" open={level.open}>
    <summary>{level.title}</summary>
    <div className="study-items">
      {level.courses.map((course) => (
        <PlanCourseAccordion key={course.title} course={course} />
      ))}
    </div>
    <div className="level-note">Créditos por nivel: {level.totalCredits}</div>
  </details>
);

export const PlanEstudiosSection = () => {
  const content = getPlanEstudiosContent();
  const [isFallback, setIsFallback] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const wrapperStyle = useMemo(
    () => ({ "--plan-levels": content.levels.length } as CSSProperties),
    [content.levels.length],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_FALLBACK_QUERY);
    const updateMode = () => {
      const stickySupported = CSS.supports("position", "sticky");
      setIsFallback(mediaQuery.matches || !stickySupported);
    };
    updateMode();
    mediaQuery.addEventListener("change", updateMode);
    return () => mediaQuery.removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    if (isFallback) return;
    setActiveIndex(0);

    const wrapperElement = wrapperRef.current;
    if (!wrapperElement) return;

    const findScrollParent = (element: HTMLElement): HTMLElement | Window => {
      let node = element.parentElement;
      while (node) {
        const style = getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight) {
          return node;
        }
        node = node.parentElement;
      }
      return window;
    };

    const scrollParent = findScrollParent(wrapperElement);

    const getHeaderHeight = () => {
      const header = document.querySelector(".site-header");
      if (header instanceof HTMLElement) {
        return Math.max(0, Math.round(header.getBoundingClientRect().height));
      }

      return FALLBACK_HEADER_HEIGHT;
    };

    const getViewportHeight = () =>
      scrollParent instanceof HTMLElement ? scrollParent.clientHeight : window.innerHeight;

    const applyWrapperHeight = () => {
      const viewportHeight = getViewportHeight();
      const headerHeight = getHeaderHeight();
      const stickyHeight = Math.max(1, viewportHeight - headerHeight);
      const steps = Math.max(0, content.levels.length - 1);
      const stepDistance = Math.max(24, stickyHeight * LEVEL_SCROLL_SENSITIVITY);
      const lastLevelHold = stickyHeight * LAST_LEVEL_HOLD_FACTOR;
      const wrapperHeight = stickyHeight + steps * stepDistance + lastLevelHold;


      wrapperElement.style.setProperty("--plan-pin-top", `${headerHeight}px`);
      wrapperElement.style.setProperty("--plan-level-height", `${stickyHeight}px`);

      wrapperElement.style.height = `${wrapperHeight}px`;
      wrapperElement.style.minHeight = `${wrapperHeight}px`;
    };

    let ticking = false;
    let animationFrameId: number | null = null;
    let isAnimating = false;
    let targetProgress = 0;
    let displayProgress = 0;

    const updateActiveIndex = (progressValue: number) => {
      const rawIndex = Math.floor(progressValue * content.levels.length);
      const clampedIndex = Math.min(content.levels.length - 1, Math.max(0, rawIndex));
      setActiveIndex(clampedIndex);
    };

    const animateProgress = () => {
      const delta = targetProgress - displayProgress;

      if (Math.abs(delta) <= MIN_PROGRESS_DELTA) {
        displayProgress = targetProgress;
        updateActiveIndex(displayProgress);
        isAnimating = false;
        animationFrameId = null;
        return;
      }

      displayProgress += delta * SCROLL_EASING_FACTOR;
      updateActiveIndex(displayProgress);

      animationFrameId = window.requestAnimationFrame(animateProgress);
    };

    const updateActive = () => {
      ticking = false;
      const rect = wrapperElement.getBoundingClientRect();
      const containerTop = scrollParent instanceof HTMLElement ? scrollParent.getBoundingClientRect().top : 0;
      const viewportHeight = getViewportHeight();
      const stickyHeight = Math.max(
        1,
        Number.parseFloat(getComputedStyle(wrapperElement).getPropertyValue("--plan-level-height")) ||
          viewportHeight,
      );
      const totalScrollable = Math.max(1, rect.height - stickyHeight);
      const scrolled = Math.max(0, containerTop - rect.top);
      targetProgress = Math.min(1, scrolled / totalScrollable);

      if (!isAnimating) {
        isAnimating = true;
        animationFrameId = window.requestAnimationFrame(animateProgress);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    const onResize = () => {
      applyWrapperHeight();
      updateActive();
    };

    applyWrapperHeight();
    updateActive();

    const target = scrollParent instanceof HTMLElement ? scrollParent : window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [content.levels.length, isFallback]);

  return (
    <section id="plan" className="section">
      <div className="container">
        <div className="section-header">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>

        {isFallback ? (
          <div className="accordion" data-plan-mode="fallback">
            {content.levels.map((level) => (
              <PlanLevelAccordion key={level.title} level={level} />
            ))}
          </div>
        ) : (
          <div ref={wrapperRef} className="plan-stack-wrapper" style={wrapperStyle}>
            <div className="plan-stack-sticky">
              <div className="plan-stack-stage">
                {content.levels.map((level, index) => {
                  const stacked = index < activeIndex;
                  const active = index === activeIndex;
                  return (
                    <article
                      key={level.title}
                      className={`plan-level-card ${stacked ? "is-stacked" : ""} ${
                        active ? "is-active" : ""
                      }`}
                      aria-hidden={!active}
                    >
                      <div className="plan-level-heading">
                        <h3>{level.title}</h3>
                        <div className="level-note">Créditos por nivel: {level.totalCredits}</div>
                      </div>
                      <div className="study-items">
                        {level.courses.map((course) => (
                          <PlanCourseAccordion key={course.title} course={course} />
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
