"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToProgress } from "@/lib/scrollController";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // Skip the 42MB video on small viewports — CSS fallback shows a static starfield.
  const [allowVideo, setAllowVideo] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 700px)");
    const update = () => setAllowVideo(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section || allowVideo !== true) return;
    v.playbackRate = 0.5;

    // Only start the network fetch / playback once Hero is actually in view.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [allowVideo]);

  return (
    <section ref={sectionRef} className="frame-hero" id="hero" data-screen-label="Space · the overview">
      <div className="hero-stage">
        {/* Star video background — desktop only. Mobile uses CSS starfield fallback. */}
        {allowVideo && (
          <video
            ref={videoRef}
            className="hero-video-bg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/stars.mp4" type="video/mp4" />
          </video>
        )}
        {/* CSS starfield fallback — visible on mobile + during video load + reduced motion */}
        <div className="hero-video-fallback" aria-hidden="true" />
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="hero-warm-bleed" aria-hidden="true" />

        {/* Text layer (z=1) — sits behind the planet */}
        <div className="hero-text">
          <div className="hero-chip">
            <span className="hero-chip-dot" />
            <span>A Portfolio in Orbit</span>
          </div>
          <div className="hero-headline-wrap">
            <h1 className="hero-headline">Welcome to My Journey</h1>
          </div>
        </div>

        {/* Planet — part of the hero scene. Scrolls away with the hero
            content; never appears in any other section. */}
        <div className="hero-planet" aria-hidden="true">
          <div className="hero-planet-spin">
            <img
              src="/planet.png"
              alt=""
              className="hero-planet-img"
              width={760}
              height={760}
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="hero-planet-glow" />
        </div>

        {/* Scroll cue (z=3) — below the planet */}
        <button
          type="button"
          className="hero-scroll-cue"
          onClick={() => scrollToProgress(0.24)}
          aria-label="Scroll to begin"
        >
          <span className="hero-scroll-cue-text">
            <em>Scroll into the planet</em>
            <span className="hero-scroll-cue-sub">to meet the person who built them</span>
          </span>
          <span className="hero-scroll-cue-line" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
