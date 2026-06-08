"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // ---- Hero planet ----
      // The planet lives INSIDE the hero stage (not a global fixed element),
      // so it scrolls out naturally with the section. No cross-section presence.
      const hPlanet = document.querySelector<HTMLElement>(".hero-planet");

      if (hPlanet) {
        gsap.set(hPlanet, { opacity: 0 });

        // Fade in at the very top of the page
        gsap.to(hPlanet, {
          opacity: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".frame-hero", start: "top top", end: "6% top", scrub: 0.6 },
        });

        // Subtle parallax during Hero — planet drifts up slightly while text scrolls
        gsap.to(hPlanet, {
          y: -36, ease: "power1.inOut",
          scrollTrigger: { trigger: ".frame-hero", start: "top top", end: "bottom top", scrub: true },
        });
      }

      // ---- Hero: text rises from where the planet was, on scroll ----
      const heroSection = document.querySelector<HTMLElement>(".frame-hero");
      if (heroSection) {
        const chip = heroSection.querySelector<HTMLElement>(".hero-chip");
        const headline = heroSection.querySelector<HTMLElement>(".hero-headline");
        const cue = heroSection.querySelector<HTMLElement>(".hero-scroll-cue");
        const text = heroSection.querySelector<HTMLElement>(".hero-text");
        const warmBleed = heroSection.querySelector<HTMLElement>(".hero-warm-bleed");
        const heroStage = heroSection.querySelector<HTMLElement>(".hero-stage");

        // Warm tint fades in during late hero so the space→core bg change
        // bridges continuously instead of cutting at the section boundary.
        if (warmBleed) {
          gsap.to(warmBleed, {
            opacity: 1, ease: "power3.out",
            scrollTrigger: { trigger: heroSection, start: "55% top", end: "bottom top", scrub: 0.6 },
          });
        }

        // Cinematic "out of focus" exit: hero-stage subtly blurs + scales
        // down as the user enters the overlap zone with Core. Makes Hero
        // recede in depth rather than just scrolling away.
        if (heroStage) {
          gsap.to(heroStage, {
            filter: "blur(6px)", scale: 0.96, ease: "power2.inOut",
            scrollTrigger: { trigger: heroSection, start: "60% top", end: "bottom top", scrub: 0.6 },
          });
        }

        // initial state: text below viewport, hidden — sits behind the planet (lower z)
        if (chip) gsap.set(chip, { y: 160, opacity: 0 });
        if (headline) gsap.set(headline, { y: 240, opacity: 0, scale: 0.96 });
        if (cue) gsap.set(cue, { y: 60, opacity: 0 });

        // chip rise
        if (chip) {
          gsap.to(chip, {
            y: 0, opacity: 1, ease: "power3.out",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "28% top", scrub: 0.6 },
          });
        }
        // headline: rise + subtle scale-in for a "materialize from the cosmos" feel
        if (headline) {
          gsap.to(headline, {
            y: 0, opacity: 1, scale: 1, ease: "power3.out",
            scrollTrigger: { trigger: heroSection, start: "6% top", end: "42% top", scrub: 0.6 },
          });
        }
        // scroll cue
        if (cue) {
          gsap.to(cue, {
            y: 0, opacity: 1, ease: "power3.out",
            scrollTrigger: { trigger: heroSection, start: "20% top", end: "52% top", scrub: 0.6 },
          });
        }

        // fade the whole text block out earlier so it doesn't overlap the
        // planet's open transition — gives the user a moment of "open planet
        // alone in space" before Core text starts coming in.
        if (text) {
          gsap.to(text, {
            opacity: 0,
            y: -60,
            ease: "power2.inOut",
            scrollTrigger: { trigger: heroSection, start: "50% top", end: "78% top", scrub: 0.6 },
          });
        }
      }

      // ---- Core: cinematic emergence, then layered reveals ----
      const coreSection = document.querySelector<HTMLElement>(".frame-core");
      if (coreSection) {
        const marker = coreSection.querySelector<HTMLElement>(".core-marker");
        const head = coreSection.querySelector<HTMLElement>(".core-head");
        const lede = coreSection.querySelector<HTMLElement>(".core-text");
        // The frosted-glass panel container (.core-points) AND the individual
        // principle items (.core-point) inside it.
        const pointsPanel = coreSection.querySelector<HTMLElement>(".core-points");
        const points = gsap.utils.toArray<HTMLElement>(".core-point", coreSection);

        // Initial state — composition reveals as user scrolls into Core.
        if (marker) gsap.set(marker, { opacity: 0, x: -24 });
        if (head) gsap.set(head, { opacity: 0, y: 40 });
        if (lede) gsap.set(lede, { opacity: 0, y: 30 });
        // Hide the whole panel too — otherwise the empty glass box sits on
        // screen from the start, before any point has revealed.
        if (pointsPanel) gsap.set(pointsPanel, { opacity: 0, y: 28 });
        points.forEach((p) => gsap.set(p, { opacity: 0, y: 24 }));

        // All reveals are now in element-percentage syntax so they live
        // inside the pinned runway. Marker/head/lede complete by 25% of
        // runway, all 3 points complete by 50%, leaving the back half
        // purely for video scrub.

        // Phase 1 — marker (2% → 12%)
        if (marker) {
          gsap.to(marker, {
            opacity: 1, x: 0, ease: "power3.out",
            scrollTrigger: { trigger: coreSection, start: "2% top", end: "12% top", scrub: 0.6 },
          });
        }

        // Phase 2 — heading block (6% → 18%)
        if (head) {
          gsap.to(head, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: coreSection, start: "6% top", end: "18% top", scrub: 0.6 },
          });
        }

        // Phase 3 — paragraph / lede (12% → 25%)
        if (lede) {
          gsap.to(lede, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: coreSection, start: "12% top", end: "25% top", scrub: 0.6 },
          });
        }

        // Phase 4 — the principles panel itself reveals (14% → 28%) so it
        // rises into view as a unit, then the points populate inside it.
        if (pointsPanel) {
          gsap.to(pointsPanel, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: coreSection, start: "14% top", end: "28% top", scrub: 0.6 },
          });
        }

        // Phase 4 — 3 principle points stagger across 17% → 50%
        // Point 0: 17→28, Point 1: 28→39, Point 2: 39→50
        points.forEach((point, i) => {
          const startPct = 17 + i * 11;
          const endPct = 28 + i * 11;
          gsap.to(point, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: {
              trigger: coreSection,
              start: `${startPct}% top`,
              end: `${endPct}% top`,
              scrub: 0.6,
            },
          });
        });
      }

      // ---- Land: a single composed screen, everything readable at once.
      //      One gentle staggered entrance (marker → intro → practice →
      //      exploring) that completes early (~by 20% of the pin) then simply
      //      holds — no exit, so the content stays readable the whole time
      //      the section is on screen. Triggers are element-percentage so
      //      they fire during the pin, not on section entry.
      //
      //      Reduced-motion users keep the content fully visible: we early-skip
      //      the whole block so no gsap.set ever zeroes the layout.
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const landSection = document.querySelector<HTMLElement>(".frame-land");
      if (landSection && !prefersReducedMotion) {
        const marker = landSection.querySelector<HTMLElement>(".land-marker");
        const introCol = landSection.querySelector<HTMLElement>(".land-intro-col");
        const practice = landSection.querySelector<HTMLElement>(".land-practice");
        const explore = landSection.querySelector<HTMLElement>(".land-explore");

        const st = (start: number, end: number) => ({
          trigger: landSection,
          start: `${start}% top`,
          end: `${end}% top`,
          scrub: 0.6,
        });

        // Marker — in 2→9
        if (marker) {
          gsap.set(marker, { opacity: 0, x: -24 });
          gsap.to(marker, {
            opacity: 1, x: 0, ease: "power3.out",
            scrollTrigger: st(2, 9),
          });
        }

        // Intro column — in 5→16
        if (introCol) {
          gsap.set(introCol, { opacity: 0, y: 28 });
          gsap.to(introCol, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: st(5, 16),
          });
        }

        // Practice — in 9→20
        if (practice) {
          gsap.set(practice, { opacity: 0, y: 28 });
          gsap.to(practice, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: st(9, 20),
          });
        }

        // Currently exploring — in 13→24
        if (explore) {
          gsap.set(explore, { opacity: 0, y: 28 });
          gsap.to(explore, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: st(13, 24),
          });
        }
      }

      // ---- Sky: cinematic track record + capabilities ----
      const skySection = document.querySelector<HTMLElement>(".frame-sky");
      if (skySection) {
        const marker = skySection.querySelector<HTMLElement>(".sky-marker");
        const head = skySection.querySelector<HTMLElement>(".sky-head");
        const timeline = skySection.querySelector<HTMLElement>(".sky-timeline");
        const line = skySection.querySelector<HTMLElement>(".sky-line");
        const stops = gsap.utils.toArray<HTMLElement>(".sky-stop", skySection);
        const capabilities = skySection.querySelector<HTMLElement>(".sky-capabilities");
        const caps = gsap.utils.toArray<HTMLElement>(".sky-cap", skySection);

        // Initial state
        if (marker) gsap.set(marker, { opacity: 0, x: -24 });
        if (head) gsap.set(head, { opacity: 0, y: 50 });
        if (timeline) gsap.set(timeline, { opacity: 0, y: 30 });
        if (line) gsap.set(line, { scaleY: 0, transformOrigin: "center top" });
        if (capabilities) gsap.set(capabilities, { opacity: 0, y: 30 });
        stops.forEach((s) => gsap.set(s, { opacity: 0, y: 28 }));
        caps.forEach((c) => gsap.set(c, { opacity: 0, y: 16 }));

        // Sky now has a scroll-controlled video background and a 300vh pin
        // runway. All text reveals complete by ~48% of runway, leaving the
        // back half pure video scrub (clouds rolling in → fog). Mirrors the
        // Core pacing model: element-percentage triggers that fire inside
        // the pin, never pre-pin.

        // Phase 1 — marker (2% → 12%)
        if (marker) {
          gsap.to(marker, {
            opacity: 1, x: 0, ease: "power3.out",
            scrollTrigger: { trigger: skySection, start: "2% top", end: "12% top", scrub: 0.6 },
          });
        }

        // Phase 2 — heading + intro (6% → 18%)
        if (head) {
          gsap.to(head, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: skySection, start: "6% top", end: "18% top", scrub: 0.6 },
          });
        }

        // Phase 3 — timeline container (12% → 24%)
        if (timeline) {
          gsap.to(timeline, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: skySection, start: "12% top", end: "24% top", scrub: 0.6 },
          });
        }

        // Connector line draws downward across the timeline (14% → 45%)
        if (line) {
          gsap.to(line, {
            scaleY: 1, ease: "power2.inOut",
            scrollTrigger: { trigger: skySection, start: "14% top", end: "45% top", scrub: 0.6 },
          });
        }

        // 5 milestones stagger top → bottom — last ends 46%
        stops.forEach((stop, i) => {
          const startPct = 16 + i * 5;
          const endPct = startPct + 10;
          gsap.to(stop, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: {
              trigger: skySection,
              start: `${startPct}% top`,
              end: `${endPct}% top`,
              scrub: 0.6,
            },
          });
        });

        // Capabilities label (30% → 40%)
        if (capabilities) {
          gsap.to(capabilities, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: skySection, start: "30% top", end: "40% top", scrub: 0.6 },
          });
        }

        // 4 capabilities stagger — last ends 48%
        caps.forEach((cap, i) => {
          const startPct = 32 + i * 4;
          const endPct = startPct + 8;
          gsap.to(cap, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: {
              trigger: skySection,
              start: `${startPct}% top`,
              end: `${endPct}% top`,
              scrub: 0.6,
            },
          });
        });
      }

      // ---- Moons: project grid + CTA + footer ----
      const moonsSection = document.querySelector<HTMLElement>(".frame-moons");
      if (moonsSection) {
        const marker = moonsSection.querySelector<HTMLElement>(".moons-marker");
        const head = moonsSection.querySelector<HTMLElement>(".moons-head");
        const sectionLabel = moonsSection.querySelector<HTMLElement>(".moons-section-label");
        const cards = gsap.utils.toArray<HTMLElement>(".moon-card", moonsSection);
        const cta = moonsSection.querySelector<HTMLElement>(".moons-cta");
        const footer = moonsSection.querySelector<HTMLElement>(".moons-footer");

        // Initial state
        if (marker) gsap.set(marker, { opacity: 0, x: -24 });
        if (head) gsap.set(head, { opacity: 0, y: 50 });
        if (sectionLabel) gsap.set(sectionLabel, { opacity: 0, y: 24 });
        cards.forEach((c) => gsap.set(c, { opacity: 0, y: 40 }));
        if (cta) gsap.set(cta, { opacity: 0, y: 40 });
        if (footer) gsap.set(footer, { opacity: 0, y: 20 });

        // Marker — overlaps Sky exit
        if (marker) {
          gsap.to(marker, {
            opacity: 1, x: 0, ease: "power3.out",
            scrollTrigger: { trigger: moonsSection, start: "top bottom", end: "top 75%", scrub: 0.6 },
          });
        }

        // Heading block emerges
        if (head) {
          gsap.to(head, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: moonsSection, start: "top 92%", end: "top 50%", scrub: 0.6 },
          });
        }

        // Section label appears
        if (sectionLabel) {
          gsap.to(sectionLabel, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: moonsSection, start: "top 70%", end: "top 50%", scrub: 0.6 },
          });
        }

        // 6 project cards stagger in (row by row, left → right within each row)
        cards.forEach((card, i) => {
          // Two rows: 0,1,2 in row 1, 3,4,5 in row 2
          const row = Math.floor(i / 3);
          const col = i % 3;
          const startPct = 8 + row * 12 + col * 3;
          const endPct = startPct + 18;
          gsap.to(card, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: {
              trigger: moonsSection,
              start: `top ${65 - startPct}%`,
              end: `top ${65 - endPct}%`,
              scrub: 0.6,
            },
          });
        });

        // CTA reveals as the grid finishes
        if (cta) {
          gsap.to(cta, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: cta, start: "top 85%", end: "top 50%", scrub: 0.6 },
          });
        }

        // Footer simple fade
        if (footer) {
          gsap.to(footer, {
            opacity: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: footer, start: "top 95%", end: "top 75%", scrub: 0.6 },
          });
        }
      }

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [enabled]);
}
