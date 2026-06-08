"use client";

import { useEffect, useRef, useState } from "react";
import { activeFrame, computeFrameRanges, FRAME_ENV, type FrameId, type LayerId } from "./layerStateMachine";
import { getLenis } from "./useLenis";

/**
 * Single source of truth for scroll progress, active frame, and active layer.
 *
 * Driven by Lenis when present (smooth scroll), falls back to native scroll
 * otherwise. Either way the progress value is monotonic and updated on rAF.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState<FrameId>("hero");
  const [layer, setLayer] = useState<LayerId>("space");
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const lenis = getLenis();
      const y = lenis ? lenis.scroll : window.scrollY;
      const vh = window.innerHeight;
      const total = document.documentElement.scrollHeight - vh;
      const t = total > 0 ? Math.min(1, Math.max(0, y / total)) : 0;
      setProgress(t);
      const f = activeFrame(t);
      setFrame(f);
      setLayer(FRAME_ENV[f]);
    };

    const lenis = getLenis();
    let unsubscribe: (() => void) | null = null;

    if (lenis) {
      // Lenis path — subscribe to its scroll event (fires on every frame Lenis updates)
      const onLenisScroll = () => {
        if (raf.current != null) return;
        raf.current = requestAnimationFrame(() => {
          raf.current = null;
          update();
        });
      };
      lenis.on("scroll", onLenisScroll);
      unsubscribe = () => lenis.off("scroll", onLenisScroll);
    } else {
      // Native fallback
      const onScroll = () => {
        if (raf.current != null) return;
        raf.current = requestAnimationFrame(() => {
          raf.current = null;
          update();
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      unsubscribe = () => window.removeEventListener("scroll", onScroll);
    }

    const onResize = () => {
      computeFrameRanges();
      update();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Compute ranges once on mount (covers the reduced-motion path where Lenis is off)
    computeFrameRanges();
    update();

    return () => {
      unsubscribe?.();
      window.removeEventListener("resize", onResize);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return { progress, frame, layer };
}

/**
 * Scroll to a normalized progress (0..1). Uses Lenis when available
 * so the motion has a single easing curve site-wide.
 */
export function scrollToProgress(t: number) {
  if (typeof window === "undefined") return;
  const vh = window.innerHeight;
  const total = document.documentElement.scrollHeight - vh;
  const target = total * t;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
