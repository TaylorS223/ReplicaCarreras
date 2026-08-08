"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Returns [ref, isVisible].
 * Once the element intersects the viewport it becomes visible and never resets.
 * Respects prefers-reduced-motion — handled entirely client-side to avoid hydration mismatch.
 */
export function useReveal<T extends Element = HTMLElement>(
  options: UseRevealOptions = {}
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const { threshold = 0.12, rootMargin = "0px 0px -48px 0px" } = options;

  // Always start as false on server and client — avoids hydration mismatch.
  // prefers-reduced-motion is checked inside useEffect (client-only).
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
