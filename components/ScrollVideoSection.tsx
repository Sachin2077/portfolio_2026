"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-driven video section using an image sequence on a canvas,
 * powered by GSAP ScrollTrigger (integrates with Lenis via your
 * existing setup in lib/useLenis.ts).
 *
 * Usage:
 *   <ScrollVideoSection
 *     baseUrl="https://ik.imagekit.io/YOUR_ID/portfolio-scroll-anim"
 *     frameCount={240}
 *     captions={[...]}
 *   />
 *
 * IMPORTANT: This component assumes ScrollTrigger has been told about
 * Lenis in your app bootstrap. See the note at the bottom of this file
 * for the one-time wiring if not already done.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Caption {
  /** Scroll progress at which this caption appears (0–1) */
  from: number;
  /** Scroll progress at which this caption disappears (0–1) */
  to: number;
  title: string;
  subtitle?: string;
}

export interface ScrollVideoSectionProps {
  /** ImageKit (or any CDN) base URL — no trailing slash */
  baseUrl: string;
  /** Total number of frames in the sequence */
  frameCount: number;
  /** Filename pattern. `{n}` is replaced with the padded index. Default: `f_{n}.jpg` */
  filePattern?: string;
  /** Padding width for `{n}`. Default: 3 (→ f_001.jpg) */
  padWidth?: number;
  /** How many viewport heights of scroll runway. Default: 6.
   *  Ignored when `fillParent` is true — the parent's height drives the runway. */
  runwayVh?: number;
  /** GSAP scrub value. true = no lag, number = seconds of catch-up lag. Default: 1 */
  scrub?: number | boolean;
  /** Captions to overlay (optional). Ranges are 0–1, not 0–100. */
  captions?: Caption[];
  /** Show frame counter HUD for debugging */
  showHud?: boolean;
  /** ImageKit transformation string, e.g. `tr:q-70,f-auto`. Optional. */
  imageKitTransform?: string;
  /** Background-layer mode. When true:
   *   - The outer section is `position: absolute; inset: 0` (fills parent)
   *   - No internal sticky wrapper is rendered (parent must already pin)
   *   - Decorative overlay chrome (captions, bottom progress bar) is suppressed
   *   - The ScrollTrigger targets `triggerSelector` instead of the section itself
   *  Default: false (component renders its own sticky runway as before). */
  fillParent?: boolean;
  /** CSS selector for the element whose scroll range drives the canvas.
   *  Only used when `fillParent` is true. Falls back to the section if the
   *  selector matches no element (with a console.warn). */
  triggerSelector?: string;
}

export default function ScrollVideoSection({
  baseUrl,
  frameCount,
  filePattern = "f_{n}.jpg",
  padWidth = 3,
  runwayVh = 6,
  scrub = 1,
  captions = [],
  showHud = false,
  imageKitTransform,
  fillParent = false,
  triggerSelector,
}: ScrollVideoSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const lastIdxRef = useRef(-1);

  const [loaded, setLoaded] = useState(0);
  const [hudFrame, setHudFrame] = useState(1);
  const [hudPct, setHudPct] = useState(0);

  const allLoaded = loaded === frameCount;
  const loadPct = Math.round((loaded / frameCount) * 100);

  const frameUrl = (i: number) => {
    const padded = String(i).padStart(padWidth, "0");
    const filename = filePattern.replace("{n}", padded);
    const transform = imageKitTransform ? `${imageKitTransform}/` : "";
    return `${baseUrl}/${transform}${filename}`;
  };

  // --- Preload all frames ---
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(count);
      };
      img.onerror = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(count);
      };
      img.src = frameUrl(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, frameCount, filePattern, imageKitTransform]);

  const sizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawAt = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgs = imagesRef.current;
    if (imgs.length === 0) return;

    const fpos = progress * (imgs.length - 1);
    const idx = Math.floor(fpos);
    const next = Math.min(imgs.length - 1, idx + 1);
    const t = fpos - idx;

    const a = imgs[idx];
    if (!a || !a.complete || !a.naturalWidth) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const drawCover = (img: HTMLImageElement, alpha: number) => {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    ctx.clearRect(0, 0, w, h);
    drawCover(a, 1);

    const b = imgs[next];
    if (b && b.complete && b.naturalWidth && t > 0) {
      drawCover(b, t);
    }
    ctx.globalAlpha = 1;

    if (idx !== lastIdxRef.current) {
      lastIdxRef.current = idx;
      setHudFrame(idx + 1);
    }
  };

  // --- GSAP ScrollTrigger setup ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    sizeCanvas();

    // In fillParent mode, the canvas's scroll progress is driven by an
    // external element (e.g. the pin-driving section). Otherwise the section
    // itself defines the runway.
    let triggerEl: Element = section;
    if (fillParent && triggerSelector) {
      const found = document.querySelector(triggerSelector);
      if (found) {
        triggerEl = found;
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `ScrollVideoSection: triggerSelector "${triggerSelector}" matched no element — falling back to section.`,
        );
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: "bottom bottom",
      scrub,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        drawAt(self.progress);
        setHudPct(Math.round(self.progress * 100));
      },
    });

    const onResize = () => {
      sizeCanvas();
      drawAt(progressRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    drawAt(0);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub, fillParent, triggerSelector]);

  useEffect(() => {
    if (loaded > 0) drawAt(progressRef.current);
    if (allLoaded) ScrollTrigger.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, allLoaded]);

  const loadingBar = !allLoaded && (
    <div className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur p-3 border-b border-orange-900/40">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between text-xs mb-1 text-orange-200 tracking-wider">
          <span>Loading frames…</span>
          <span>{loadPct}%</span>
        </div>
        <div className="h-[3px] bg-neutral-800 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-300 transition-all duration-150"
            style={{ width: `${loadPct}%` }}
          />
        </div>
      </div>
    </div>
  );

  // Background mode — fills the parent, no internal sticky, no overlay chrome.
  // The parent (e.g. .core-stage) is expected to already pin this layer.
  if (fillParent) {
    return (
      <section
        ref={sectionRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-black text-white"
      >
        {loadingBar}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </section>
    );
  }

  // Standalone mode — original self-contained sticky runway layout.
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white"
      style={{ height: `${runwayVh * 100}vh` }}
    >
      {loadingBar}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10">
          {showHud ? (
            <div className="flex justify-between text-[0.65rem] uppercase tracking-[0.2em] text-orange-300/80">
              <span>
                Frame {hudFrame} / {frameCount}
              </span>
              <span>{hudPct}%</span>
            </div>
          ) : (
            <div />
          )}

          <div className="relative">
            {captions.length > 0 && (
              <div className="relative h-40 md:h-48 max-w-2xl">
                {captions.map((c, i) => {
                  const p = hudPct / 100;
                  const active = p >= c.from && p < c.to;
                  return (
                    <p
                      key={i}
                      className={`absolute bottom-0 left-0 text-4xl md:text-6xl font-light leading-tight transition-all duration-700 ease-out ${
                        active
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-5"
                      }`}
                    >
                      {c.title}
                      {c.subtitle && (
                        <>
                          <br />
                          <span className="italic font-serif text-orange-300">
                            {c.subtitle}
                          </span>
                        </>
                      )}
                    </p>
                  );
                })}
              </div>
            )}

            <div className="mt-6 h-px w-full bg-white/10 relative">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-yellow-300"
                style={{ width: `${hudPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   ONE-TIME LENIS ↔ GSAP WIRING (if not already done in lib/useLenis.ts)

   For ScrollTrigger to read scroll position from Lenis instead of the
   native window scroll, your Lenis init must include something like:

     lenis.on("scroll", ScrollTrigger.update);
     gsap.ticker.add((time) => lenis.raf(time * 1000));
     gsap.ticker.lagSmoothing(0);

   If your existing lib/useLenis.ts already does this, you're good — the
   component above works out of the box. If not, add those lines once
   in the Lenis init and every ScrollTrigger in the project benefits.
--------------------------------------------------------------------------- */
