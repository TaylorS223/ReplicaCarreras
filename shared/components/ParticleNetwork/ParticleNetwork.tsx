"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParticleNetworkProps {
  particleCount?: number;
  colors?: string[];
  lineColor?: string;
  maxDistance?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  // lifecycle
  life: number;      // 0..1 — current opacity multiplier
  lifeState: "in" | "hold" | "out";
  holdTimer: number; // frames remaining in "hold" state
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FADE_SPEED = 0.018;   // opacity delta per frame during fade-in/out
const HOLD_FRAMES_MIN = 60; // ~1 s at 60 fps
const HOLD_FRAMES_MAX = 180; // ~3 s
const SPEED_BASE = 1.1;     // max component velocity (px/frame on logical pixels)
const DOT_RADIUS = 3.2;     // visible anchor dot

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createParticle(
  w: number,
  h: number,
  colors: string[]
): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = randomBetween(SPEED_BASE * 0.3, SPEED_BASE);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 0,
    lifeState: "in",
    holdTimer: Math.round(randomBetween(HOLD_FRAMES_MIN, HOLD_FRAMES_MAX)),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParticleNetwork({
  particleCount = 60,
  colors = ["#ffffff", "#c8db39", "#8ba3d6"],
  lineColor = "#8ba3d6",
  maxDistance = 140,
  className,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Reduced-motion check ─────────────────────────────────────────────────
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── DPR & sizing ─────────────────────────────────────────────────────────
    const dpr = window.devicePixelRatio ?? 1;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;

    // Mobile: halve particle count to save CPU
    function resolvedCount() {
      const isMobile = window.innerWidth <= 768;
      return isMobile ? Math.ceil(particleCount / 2) : particleCount;
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      ctx!.scale(dpr, dpr);

      // Rebuild particles on resize — preserve count intent
      const count = resolvedCount();
      particles = Array.from({ length: count }, () =>
        createParticle(width, height, colors)
      );
      // Stagger initial lifecycle so they don't all fade in at once
      particles.forEach((p) => {
        p.life = Math.random();
        p.lifeState = "hold";
        p.holdTimer = Math.round(
          randomBetween(HOLD_FRAMES_MIN, HOLD_FRAMES_MAX)
        );
      });
    }

    // ── Parse line color ─────────────────────────────────────────────────────
    const lineRgb = hexToRgb(lineColor) ?? { r: 139, g: 163, b: 214 };

    // ── Draw one frame ───────────────────────────────────────────────────────
    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Update lifecycle & positions
      for (const p of particles) {
        // Lifecycle
        if (p.lifeState === "in") {
          p.life = Math.min(1, p.life + FADE_SPEED);
          if (p.life >= 1) {
            p.life = 1;
            p.lifeState = "hold";
          }
        } else if (p.lifeState === "hold") {
          p.holdTimer--;
          if (p.holdTimer <= 0) {
            p.lifeState = "out";
          }
        } else {
          // "out"
          p.life = Math.max(0, p.life - FADE_SPEED);
          if (p.life <= 0) {
            // Rebirth at a new random position
            const next = createParticle(width, height, colors);
            p.x = next.x;
            p.y = next.y;
            p.vx = next.vx;
            p.vy = next.vy;
            p.color = next.color;
            p.life = 0;
            p.lifeState = "in";
            p.holdTimer = Math.round(
              randomBetween(HOLD_FRAMES_MIN, HOLD_FRAMES_MAX)
            );
          }
        }

        // Movement — wrap around edges smoothly
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // proximity factor: 1 = touching, 0 = at maxDistance
            const proximity = 1 - dist / maxDistance;
            // combine with both particles' lifecycle opacity
            const opacity = proximity * Math.min(a.life, b.life) * 0.75;
            if (opacity <= 0.005) continue;

            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${lineRgb.r},${lineRgb.g},${lineRgb.b},${opacity})`;
            ctx!.lineWidth = 1.1;
            ctx!.stroke();
          }
        }
      }

      // Draw dots (almost invisible — they're just the anchor of the lines)
      for (const p of particles) {
        if (p.life <= 0.01) continue;
        const dotRgb = hexToRgb(p.color) ?? { r: 255, g: 255, b: 255 };
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${dotRgb.r},${dotRgb.g},${dotRgb.b},${p.life * 0.7})`;
        ctx!.fill();
      }
    }

    // ── Animation loop ───────────────────────────────────────────────────────
    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    resize();

    if (prefersReduced) {
      // Single static frame — no animation
      draw();
    } else {
      rafId = requestAnimationFrame(loop);
    }

    // ── Resize observer ──────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      // Cancel current RAF, resize, then restart
      cancelAnimationFrame(rafId);
      ctx!.setTransform(1, 0, 0, 1, 0, 0); // reset transform before rescaling
      resize();
      if (!prefersReduced) {
        rafId = requestAnimationFrame(loop);
      } else {
        draw();
      }
    });

    const parent = canvas.parentElement;
    if (parent) ro.observe(parent);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, colors, lineColor, maxDistance]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
