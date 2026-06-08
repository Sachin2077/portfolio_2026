"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import ContactPolaris from "./ContactPolaris";

export default function Moons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);

  // Lock wins over hover. When locked, hovering other moons does nothing.
  const activeIndex = lockedIndex ?? hoveredIndex;
  const active = activeIndex !== null ? PROJECTS[activeIndex] : null;
  const isPaused = activeIndex !== null;
  const isLocked = lockedIndex !== null;
  const count = PROJECTS.length;

  const onMoonEnter = useCallback(
    (i: number) => {
      if (lockedIndex !== null) return;
      setHoveredIndex(i);
    },
    [lockedIndex],
  );

  const onMoonLeave = useCallback(() => {
    if (lockedIndex !== null) return;
    // Don't clear here — let the orbital's onMouseLeave handle exit so
    // moving between moon and panel doesn't flicker.
  }, [lockedIndex]);

  const onOrbitalLeave = useCallback(() => {
    if (lockedIndex !== null) return;
    setHoveredIndex(null);
  }, [lockedIndex]);

  const onMoonClick = useCallback((i: number) => {
    setLockedIndex((prev) => (prev === i ? null : i));
    setHoveredIndex(null);
  }, []);

  // Outside-click + Escape both clear the lock.
  useEffect(() => {
    if (lockedIndex === null) return;
    const onDown = (e: MouseEvent) => {
      if (!orbitalRef.current?.contains(e.target as Node)) {
        setLockedIndex(null);
        setHoveredIndex(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLockedIndex(null);
        setHoveredIndex(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [lockedIndex]);

  return (
    <section className="frame-moons" id="moons" data-screen-label="04 Work">
      <div className="moons-bg" aria-hidden="true">
        <div className="moons-bg-glow moons-bg-glow-tl" />
        <div className="moons-bg-glow moons-bg-glow-br" />
      </div>

      <div className="moons-inner">
        <header className="moons-top">
          <div className="moons-marker">
            <span className="moons-marker-num">04</span>
            <span className="moons-marker-rule" />
            <span>The Work</span>
          </div>

          <div className="moons-head">
            <h2 className="moons-heading">
              Six moons in <em>orbit.</em>
            </h2>
            <p className="moons-subhead">One obsession.</p>
            <p className="moons-lede">
              Each project orbits the same idea — shipping with intent. Hover to preview,
              then open any for the full case study.
            </p>
          </div>
        </header>

        <div className="moons-section-label">
          <span className="moons-section-rule" />
          <span>Selected Work</span>
        </div>

        <div
          ref={orbitalRef}
          className="moons-orbital"
          data-paused={isPaused ? "true" : "false"}
          data-locked={isLocked ? "true" : "false"}
          onMouseLeave={onOrbitalLeave}
        >
          <div className="moons-stage" aria-hidden="true">
            {/* Orbit ring guide */}
            <svg
              className="moons-orbit-ring"
              viewBox="-50 -50 100 100"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <circle
                cx="0"
                cy="0"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.18"
                strokeDasharray="0.6 1.4"
                opacity="0.42"
              />
            </svg>

            {/* The planet — reused from hero, anchoring the journey */}
            <div className="moons-planet">
              <div className="moons-planet-glow" />
              <img
                src="/planet.png"
                alt=""
                className="moons-planet-img"
                width={760}
                height={760}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Rotating orbit — animates a shared --moon-orbit-angle */}
            <div className="moons-orbit">
              {PROJECTS.map((p, i) => {
                const angle = (i * 360) / count;
                const isMoonHovered = i === hoveredIndex;
                const isMoonLocked = i === lockedIndex;
                const isMoonActive = i === activeIndex;
                return (
                  <div
                    key={p.slug}
                    className="moon-spoke"
                    style={{ ["--moon-angle" as string]: `${angle}deg` }}
                  >
                    <button
                      type="button"
                      className={[
                        "moon",
                        isMoonActive ? "is-active" : "",
                        isMoonLocked ? "is-locked" : "",
                        isMoonHovered && !isMoonLocked ? "is-hovered" : "",
                      ].filter(Boolean).join(" ")}
                      data-tone={p.tone}
                      onMouseEnter={() => onMoonEnter(i)}
                      onMouseLeave={onMoonLeave}
                      onFocus={() => onMoonEnter(i)}
                      onClick={() => onMoonClick(i)}
                      aria-label={`${p.name} — ${p.tagline}${isMoonLocked ? " (selected)" : ""}`}
                      aria-pressed={isMoonLocked}
                    >
                      <span className="moon-halo" aria-hidden="true" />
                      <span className="moon-dot" aria-hidden="true" />
                      <span className="moon-label">{p.name}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info panel — pinned to locked moon, or previewing the hovered one */}
          <aside className="moons-panel" data-state={active ? "active" : "idle"}>
            {active ? (
              <div className="moons-panel-content" key={active.slug}>
                <div className="moons-panel-eyebrow">
                  <span className="moons-panel-num" data-tone={active.tone}>
                    {String((activeIndex ?? 0) + 1).padStart(2, "0")}
                  </span>
                  <span className="moons-panel-rule" />
                  <span className="moons-panel-moon">{active.tags[0]}</span>
                  {isLocked && lockedIndex === activeIndex && (
                    <span className="moons-panel-lockbadge" aria-label="Selected">
                      · SELECTED
                    </span>
                  )}
                </div>

                <h3 className="moons-panel-name">{active.name}</h3>
                <p className="moons-panel-outcome">{active.tagline}</p>

                <dl className="moons-panel-meta">
                  <div className="moons-panel-row">
                    <dt>Role</dt>
                    <dd>{active.role}</dd>
                  </div>
                  <div className="moons-panel-row">
                    <dt>Client</dt>
                    <dd>{active.client}</dd>
                  </div>
                  <div className="moons-panel-row">
                    <dt>Tools</dt>
                    <dd>{active.tools.join(" · ")}</dd>
                  </div>
                </dl>

                <div className="moons-panel-actions">
                  <Link
                    className="moons-panel-link"
                    href={`/work/${active.slug}`}
                    data-tone={active.tone}
                  >
                    <span>View case study</span>
                    <span className="moons-panel-arrow" aria-hidden="true">→</span>
                  </Link>
                  {active.liveUrl && (
                    <a
                      className="moons-panel-link moons-panel-link--ghost"
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-tone={active.tone}
                    >
                      <span>Visit live</span>
                      <span className="moons-panel-arrow" aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="moons-panel-idle">
                <span className="moons-panel-idle-eyebrow">— Awaiting hover</span>
                <p className="moons-panel-idle-text">
                  <em>Six moons, one orbit.</em> Hover any to preview · open for the full case study.
                </p>
                <span className="moons-panel-idle-hint">
                  {count} projects · Selected work
                </span>
              </div>
            )}
          </aside>
        </div>

        <ContactPolaris />

        <footer className="moons-footer">
          <span className="moons-footer-label">End of the journey</span>
          <span className="moons-footer-copy">© 2026 · Sachin Verma · Designer</span>
        </footer>
      </div>
    </section>
  );
}
