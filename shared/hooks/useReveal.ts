"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  /** Fraction of the element that must be visible before triggering (0–1). Default: 0.12 */
  threshold?: number;
  /** Margin around the root. Default: "0px 0px -48px 0px" (triggers slightly before entering) */
  rootMargin?: string;
}

/**
 * Returns [ref, isVisible].
 * Once the element intersects the viewport it becomes visible and never resets.
 * Respects prefers-reduced-motion: starts as visible immediately if motion is reduced.
 */
export function useReveal<T extends Element = HTMLElement>(
  options: UseRevealOptions = {}
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const { threshold = 0.12, rootMargin = "0px 0px -48px 0px" } = options;

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const [visible, setVisible] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // once — never fires again
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, prefersReduced]);

  return [ref, visible];
}
