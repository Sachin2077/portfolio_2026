"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface LandBackgroundProps {
  /** Tall vertical image (portrait). Hosted anywhere — e.g. ImageKit. */
  src: string;
  /** Element whose scroll range drives the pan. Default `.frame-land`. */
  triggerSelector?: string;
  /** GSAP scrub lag. `1` = 1s catch-up (default), `true` = instant, `0.3` = tight. */
  scrub?: number | boolean;
  /** Pan direction as you scroll DOWN:
   *  "up"   → reveals from the bottom of the image to the top (reads as
   *           climbing up — image composed core-at-bottom, surface-at-top).
   *  "down" → reveals from the top to the bottom.
   *  Default "up". */
  direction?: "up" | "down";
  /** Optional atmospheric blur in px (0 = none, a crisp pan). Default 0. */
  blur?: number;
  /** Flip the image vertically (upside down). Default false. */
  flip?: boolean;
  /** Dim the image via a brightness multiplier (1 = normal, 0.5 = half-bright).
   *  Default 1. Doubles as a legibility aid for bright imagery. */
  dim?: number;
}

/**
 * Scroll-coupled vertical pan of a single tall image for the Land section.
 *
 * As you scroll through the pinned `.frame-land`, the image travels vertically
 * so the section reads as climbing up from the core to solid ground. The image
 * is taller than its clip window (`.land-bg`), and we translateY across that
 * overflow in lockstep with scroll progress. The `.land-bg` gradient remains
 * the graceful fallback until the image loads (or if it 404s).
 */
export default function LandBackground({
  src,
  triggerSelector = ".frame-land",
  scrub = 1,
  direction = "up",
  blur = 0,
  flip = false,
  dim = 1,
}: LandBackgroundProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // When the browser serves the image from cache, the load event can fire
  // before React attaches `onLoad` — so `setLoaded` would never run and the
  // image would stay at opacity:0 forever (the gradient fallback shows, the
  // picture never does). Detect the already-complete case on mount and sync.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = imgRef.current;
    if (!img) return;

    const apply = (p: number) => {
      const parent = img.parentElement;
      if (!parent) return;
      const overflow = Math.max(0, img.offsetHeight - parent.clientHeight);
      // direction "up": p=0 shows the bottom (y = -overflow), p=1 shows the top (y = 0)
      const travel = direction === "up" ? 1 - p : p;
      const y = -overflow * travel;
      // scaleY(-1) flips the content about its centre; the translate is applied
      // in the outer axis, so the pan math is unaffected by the flip.
      img.style.transform = `translate3d(0, ${y}px, 0)${flip ? " scaleY(-1)" : ""}`;
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      apply(0.5); // freeze mid-climb, no scroll coupling
      return;
    }

    const triggerEl =
      document.querySelector(triggerSelector) ?? img.closest("section");
    if (!triggerEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: "bottom bottom",
      scrub,
      onUpdate: (self) => apply(self.progress),
    });

    apply(0);

    const onResize = () => {
      apply(st.progress);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
    // re-run once the image loads so offsetHeight (→ overflow) is correct
  }, [src, triggerSelector, scrub, direction, flip, loaded]);

  const filterParts: string[] = [];
  if (blur) filterParts.push(`blur(${blur}px)`);
  if (dim < 1) filterParts.push(`brightness(${dim})`);
  const filter = filterParts.length ? filterParts.join(" ") : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      className="land-pan-img"
      src={src}
      alt=""
      aria-hidden="true"
      data-loaded={loaded ? "true" : "false"}
      style={filter ? { filter } : undefined}
      onLoad={() => setLoaded(true)}
    />
  );
}
