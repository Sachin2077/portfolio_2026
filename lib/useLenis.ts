"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { computeFrameRanges } from "./layerStateMachine";

gsap.registerPlugin(ScrollTrigger);

/**
 * Singleton Lenis controller.
 *
 * Wires Lenis into:
 *  - GSAP's ticker (so ScrollTrigger updates are in sync with Lenis frames)
 *  - ScrollTrigger.scrollerProxy (so all scroll-driven tweens read Lenis position)
 *  - module-scope reference (used by scrollToProgress)
 *
 * Initialize once at the top of the page. No-op when reducedMotion === true
 * so users with reduced-motion get native scroll instead of programmatic easing.
 */

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis(enabled: boolean) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!enabled || initialized.current) return;
    if (typeof window === "undefined") return;
    initialized.current = true;

    const lenis = new Lenis({
      duration: 1.15,
      // ease-out cubic — matches the GSAP motion language
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1,
    });

    lenisInstance = lenis;

    // Route Lenis raf through GSAP's ticker so ScrollTrigger updates are in sync
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to use Lenis as the scroll source
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    // Update ScrollTrigger on every Lenis scroll frame
    lenis.on("scroll", ScrollTrigger.update);

    // Refresh after fonts load (prevents stale anchor positions when fonts shift layout)
    const refresh = () => {
      computeFrameRanges();
      ScrollTrigger.refresh();
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    } else {
      refresh();
    }

    const onResize = () => refresh();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisInstance = null;
      initialized.current = false;
    };
  }, [enabled]);
}
