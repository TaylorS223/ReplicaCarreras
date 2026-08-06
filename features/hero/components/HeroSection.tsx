"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroContent } from "@/types/api";
import type { HeroSlide } from "@/types/carrera-content";
import styles from "./HeroSection.module.css";

const AUTOPLAY_DELAY_MS = 7000;

type SlideText =
  | {
      type: "acreditacion";
      position: "center";
      logoAcreditacion?: string;
      titulo?: string;
      badgeTexto?: string;
      duracion?: string;
      modalidadSedes?: string;
      textoAcreditacion?: string;
      botonEnlace?: string;
    }
  | {
      type: "carrera";
      position: "center";
      eyebrow: string;
      title: string;
      subtitle: string;
    }
  | {
      type: "taller";
      position: "left";
      eyebrow: string;
      title: string;
      subtitle: string;
    }
  | {
      type: "espacios";
      position: "left";
      eyebrow: string;
      title: string;
      items: string[];
    };

type Slide = {
  bg: string;
  overlay: string;
  text: SlideText;
};

// Slides estáticos — usados como fallback cuando no hay datos de WordPress
const STATIC_SLIDES: Slide[] = [
  {
    bg: "/imagenes/SLIDER-1.jpg",
    overlay: "/imagenes/SLIDER - PERSONAL .png",
    text: { type: "acreditacion", position: "center" },
  },
  {
    bg: "/imagenes/SLIDER-2.jpg",
    overlay: "/imagenes/SLIDER - PERSONAL 2.png",
    text: {
      type: "carrera",
      position: "center",
      eyebrow: "Carrera de",
      title: "ARQUITECTURA",
      subtitle: "Facultad de Ingeniería, Industria y Arquitectura",
    },
  },
  {
    bg: "/imagenes/SLIDER-3.jpg",
    overlay: "/imagenes/SLIDER - PERSONAL 3.png",
    text: {
      type: "taller",
      position: "left",
      eyebrow: "Taller de",
      title: "SISTEMAS CONSTRUCTIVOS",
      subtitle: "Materiales de la construcción",
    },
  },
  {
    bg: "/imagenes/SLIDER-4.jpg",
    overlay: "/imagenes/SLIDER - PERSONAL 4.png",
    text: {
      type: "espacios",
      position: "left",
      eyebrow: "Nuevos espacios para",
      title: "APRENDIZAJE",
      items: [
        "Taller de materiales y sistemas constructivos",
        "Centro de capacitaciones",
        "Centro de Cómputo",
      ],
    },
  },
];

// Convierte HeroSlide[] de WordPress al formato interno Slide[]
const mapHeroSlidesToSlides = (heroSlides: HeroSlide[]): Slide[] =>
  heroSlides.map((hs): Slide => {
    if (hs.type === "acreditacion") {
      return {
        bg: hs.bg,
        overlay: hs.overlay,
        text: {
          type: "acreditacion",
          position: "center",
          logoAcreditacion: hs.logoAcreditacion,
          titulo: hs.titulo,
          badgeTexto: hs.badgeTexto,
          duracion: hs.duracion,
          modalidadSedes: hs.modalidadSedes,
          textoAcreditacion: hs.textoAcreditacion,
          botonEnlace: hs.botonEnlace,
        },
      };
    }
    // carrera | taller | espacios
    return {
      bg: hs.bg,
      overlay: hs.overlay,
      text: {
        type: hs.type as "carrera" | "taller" | "espacios",
        position: hs.position as "center" | "left",
        eyebrow: hs.eyebrow,
        title: hs.titulo,
        subtitle: hs.subtitulo,
      },
    };
  });

// Contenido del panel según el tipo de slide
function SlidePanel({ text }: { text: SlideText }) {
  if (text.type === "acreditacion") {
    const logo = text.logoAcreditacion || "/imagenes/LOGO-ACREDITADORA-BLANCO.png";
    const titulo = text.titulo || "ARQUITECTURA";
    const badge = text.badgeTexto || "CARRERA ACREDITADA";
    const duracion = text.duracion || "6 AÑOS | HASTA JULIO DE 2031";
    const sedes = text.modalidadSedes || "PRESENCIAL · MATRIZ MANTA · SEDE SANTO DOMINGO · EXTENSIONES CHONE, PEDERNALES";
    const highlight = text.textoAcreditacion || "ACREDITACIÓN DE EXCELENCIA";
    const ctaHref = text.botonEnlace || "#";

    return (
      <article className={`${styles.infoPanel} ${styles.infoPanelAccreditacion}`}>
        <div className={styles.acreditadoraRow}>
          <div className={styles.acreditadoraLogo}>
            <Image
              src={logo}
              alt="Acreditadora de Chile — Acreditación & Calidad"
              width={170}
              height={170}
              className={styles.acreditadoraLogoImg}
            />
          </div>
          <div className={styles.acreditadoraDivider} />
          <div className={styles.acreditadoraText}>
            <h1 className={styles.acreditadoraTitulo}>{titulo}</h1>
            <div className={styles.acreditadoraBadge}>{badge}</div>
            <p className={styles.panelMeta}><strong>{duracion}</strong></p>
            <p className={styles.panelMetaSub}>{sedes}</p>
            <p className={styles.panelHighlight}>{highlight}</p>
            <a href={ctaHref} className={styles.panelCta}>
              LEER MAS &rsaquo;
            </a>
          </div>
        </div>
      </article>
    );
  }

  if (text.type === "carrera") {
    return (
      <article className={styles.infoPanel}>
        <div className={styles.panelEyebrow}>{text.eyebrow}</div>
        <h1 className={styles.panelTitle}>{text.title}</h1>
        <p className={styles.panelDescription}>{text.subtitle}</p>
      </article>
    );
  }

  if (text.type === "taller") {
    return (
      <article className={styles.infoPanel}>
        <div className={styles.panelEyebrow}>{text.eyebrow}</div>
        <h1 className={styles.panelTitle}>{text.title}</h1>
        <p className={styles.panelDescription}>{text.subtitle}</p>
      </article>
    );
  }

  // type === "espacios"
  return (
    <article className={styles.infoPanel}>
      <div className={styles.panelEyebrow}>{text.eyebrow}</div>
      <h1 className={styles.panelTitle}>{text.title}</h1>
      <ul className={styles.panelList}>
        {text.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export const HeroSection = ({ content, heroSlides }: { content: HeroContent; heroSlides?: HeroSlide[] }) => {
  // Usa slides de WordPress si están disponibles, si no usa los estáticos
  const SLIDES = heroSlides && heroSlides.length > 0
    ? mapHeroSlidesToSlides(heroSlides)
    : STATIC_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sequenceKey, setSequenceKey] = useState(0);

  const total = SLIDES.length;

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % total);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || total <= 1) return;
    const id = window.setInterval(goToNext, AUTOPLAY_DELAY_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, total]);

  useEffect(() => {
    if (!reducedMotion) setSequenceKey((prev) => prev + 1);
  }, [currentIndex, reducedMotion]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <section className={styles.hero} data-reduced-motion={reducedMotion}>
      {/* Capa de slides — solo el fondo */}
      <div className={styles.slideLayer}>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.bg}
            className={`${styles.slide} ${index === currentIndex ? styles.slideActive : ""}`}
            style={{ backgroundImage: `url(${slide.bg})` }}
            aria-hidden={index !== currentIndex}
          />
        ))}
      </div>

      {/* Overlay de persona — solo el slide activo, por encima del heroShade */}
      {currentSlide.overlay && (
        <div
          className={`${styles.slideOverlay} ${styles.slideOverlayActive}`}
          aria-hidden="true"
          key={`overlay-${currentIndex}`}
        >
          <img
            src={currentSlide.overlay}
            alt=""
            className={styles.slideOverlayImg}
            aria-hidden="true"
          />
        </div>
      )}

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
        <div
          key={sequenceKey}
          className={styles.panelWrapper}
          data-position={currentSlide.text.position}
          data-type={currentSlide.text.type}
        >
          <SlidePanel text={currentSlide.text} />
        </div>
      </div>
    </section>
  );
};
