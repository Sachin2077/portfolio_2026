"use client";

import { memo, useEffect, useState } from "react";
import { getJourneyMarkers, type FrameId } from "@/lib/layerStateMachine";
import { scrollToProgress } from "@/lib/scrollController";

function JourneyIndicatorImpl({ frame, progress }: { frame: FrameId; progress: number }) {
  // Markers are derived from computed FRAME_RANGES — they need to be re-read
  // whenever the ranges might have changed (after Lenis init, after resize).
  const [markers, setMarkers] = useState(() => getJourneyMarkers());

  useEffect(() => {
    const refresh = () => setMarkers(getJourneyMarkers());
    // The first reading after mount is correct after DOM is laid out.
    refresh();
    window.addEventListener("resize", refresh, { passive: true });
    return () => window.removeEventListener("resize", refresh);
  }, []);

  // Inline styles use CSS custom props so React only diffs strings, not new objects.
  const pct = (progress * 100).toFixed(2);

  return (
    <nav className="journey" aria-label="Journey" style={{ ["--p" as string]: `${pct}%` }}>
      <div className="journey-line">
        <div className="journey-fill" />
        <div className="journey-dot" />
      </div>
      <ul className="journey-marks">
        {markers.map((m, i) => (
          <li key={m.id} style={{ ["--t" as string]: `${(m.t * 100).toFixed(2)}%` }}>
            <button
              type="button"
              className={`journey-mark ${frame === m.id ? "is-active" : ""}`}
              onClick={() => scrollToProgress(m.t)}
              aria-label={`Jump to ${m.label}`}
            >
              <span className="journey-pill" aria-hidden="true">
                <span className="journey-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="journey-name">{m.label}</span>
              </span>
              <span className="journey-node" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(JourneyIndicatorImpl);
