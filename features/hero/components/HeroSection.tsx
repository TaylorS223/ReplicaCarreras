"use client";

import { useEffect, useState } from "react";
import { getHeroContent } from "@/lib/wordpress/services/getHero";
import styles from "./HeroSection.module.css";

const AUTOPLAY_DELAY_MS = 7000;

export const HeroSection = () => {
  const content = getHeroContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sequenceKey, setSequenceKey] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? content.images.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % content.images.length);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || content.images.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(goToNext, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reducedMotion, content.images.length]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    setSequenceKey((prev) => prev + 1);
  }, [currentIndex, reducedMotion]);

  return (
    <section className={styles.hero} data-reduced-motion={reducedMotion}>
      <div className={styles.slideLayer}>
        {content.images.map((image, index) => (
          <div
            key={image.src}
            className={`${styles.slide} ${index === currentIndex ? styles.slideActive : ""}`}
            style={{ backgroundImage: `url(${image.src})` }}
            aria-hidden={index !== currentIndex}
          />
        ))}
      </div>

      <div className={styles.heroShade} aria-hidden="true" />

      <button
        type="button"
        className={`${styles.carouselControl} ${styles.carouselControlPrev}`}
        onClick={goToPrevious}
        aria-label="Imagen anterior"
      >
        &lt;
      </button>
      <button
        type="button"
        className={`${styles.carouselControl} ${styles.carouselControlNext}`}
        onClick={goToNext}
        aria-label="Siguiente imagen"
      >
        &gt;
      </button>

      <div className={`container ${styles.heroInner}`}>
        <article key={sequenceKey} className={styles.infoPanel}>
          <div className={styles.panelRule} />
          <div className={styles.panelEyebrow}>{content.eyebrow}</div>
          <h1 className={styles.panelTitle}>{content.title}</h1>
          <div className={styles.panelBadge}>{content.badge}</div>
          <p className={styles.panelDescription}>{content.description}</p>
        </article>
      </div>
    </section>
  );
};
