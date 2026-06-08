/**
 * Layer/Frame state machine.
 *
 * The page is composed of 5 stacked sections (Hero, Core, Land, Sky, Moons).
 * In addition to those 5 frames, there are 2 transition frames (Dive, Ascent)
 * that straddle section boundaries to drive cross-section animations.
 *
 * `FRAME_RANGES` are computed from the live DOM at runtime — `getBoundingClientRect`
 * for each section + `document.documentElement.scrollHeight` — so the percentages
 * always match the actual layout regardless of section heights, font load shifts,
 * or responsive breakpoints. Stale hardcoded percentages were the root cause of
 * the 26–33% scroll dead zone.
 */

export type LayerId = "core" | "land" | "sky" | "space";
export type FrameId = "hero" | "dive" | "sky" | "land" | "core" | "ascent" | "moons";

export const LAYERS: LayerId[] = ["core", "land", "sky", "space"];
export const LAYER_LABELS: Record<LayerId, string> = {
  core: "Core",
  land: "Land",
  sky: "Sky",
  space: "Space",
};

export const FRAMES: FrameId[] = ["hero", "dive", "core", "land", "sky", "ascent", "moons"];

export const FRAME_LABELS: Record<FrameId, string> = {
  hero:   "Space · the overview",
  dive:   "Diving in…",
  core:   "Core · what drives me",
  land:   "Land · who you're meeting",
  sky:    "Sky · what I've done",
  ascent: "Rising…",
  moons:  "Space · the work",
};

export const FRAME_ENV: Record<FrameId, LayerId> = {
  hero:   "space",
  dive:   "core",
  core:   "core",
  land:   "land",
  sky:    "sky",
  ascent: "sky",
  moons:  "space",
};

export type FrameRange = { id: FrameId; start: number; end: number };

// Conservative defaults used during SSR or before DOM is measured.
const DEFAULT_RANGES: FrameRange[] = [
  { id: "hero",   start: 0.00, end: 0.22 },
  { id: "dive",   start: 0.22, end: 0.30 },
  { id: "core",   start: 0.30, end: 0.55 },
  { id: "land",   start: 0.55, end: 0.72 },
  { id: "sky",    start: 0.72, end: 0.90 },
  { id: "ascent", start: 0.90, end: 0.95 },
  { id: "moons",  start: 0.95, end: 1.00 },
];

// Overlap pads — `dive` straddles hero/core boundary, `ascent` straddles sky/moons.
const DIVE_PAD = 0.04;
const ASCENT_PAD = 0.03;

type SectionId = Extract<FrameId, "hero" | "core" | "land" | "sky" | "moons">;
const SECTIONS: { id: SectionId; selector: string }[] = [
  { id: "hero",  selector: ".frame-hero" },
  { id: "core",  selector: ".frame-core" },
  { id: "land",  selector: ".frame-land" },
  { id: "sky",   selector: ".frame-sky" },
  { id: "moons", selector: ".frame-moons" },
];

let cachedRanges: FrameRange[] = DEFAULT_RANGES;

/** Measure section boundaries from the live DOM and rebuild `FRAME_RANGES`. */
export function computeFrameRanges(): FrameRange[] {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return DEFAULT_RANGES;
  }
  const docHeight = document.documentElement.scrollHeight;
  const vh = window.innerHeight;
  const totalScroll = Math.max(1, docHeight - vh);

  const measured: Partial<Record<SectionId, { start: number; end: number }>> = {};
  for (const { id, selector } of SECTIONS) {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + rect.height;
    measured[id] = {
      start: Math.min(1, Math.max(0, top / totalScroll)),
      end:   Math.min(1, Math.max(0, bottom / totalScroll)),
    };
  }

  // Resolve each section's range, falling back to defaults if missing.
  const get = (id: SectionId) => measured[id] ?? DEFAULT_RANGES.find(r => r.id === id) as FrameRange;
  const hero = get("hero");
  const core = get("core");
  const land = get("land");
  const sky  = get("sky");
  const moons = get("moons");

  const ranges: FrameRange[] = [
    { id: "hero",   start: 0,                          end: hero.end - DIVE_PAD },
    { id: "dive",   start: hero.end - DIVE_PAD,        end: core.start + DIVE_PAD },
    { id: "core",   start: core.start + DIVE_PAD,      end: core.end },
    { id: "land",   start: land.start,                 end: land.end },
    { id: "sky",    start: sky.start,                  end: sky.end - ASCENT_PAD },
    { id: "ascent", start: sky.end - ASCENT_PAD,       end: moons.start + ASCENT_PAD },
    { id: "moons",  start: moons.start + ASCENT_PAD,   end: 1.0 },
  ];

  cachedRanges = ranges;
  return ranges;
}

/** Current frame ranges (computed) — used by all scroll-progress consumers. */
export function getFrameRanges(): FrameRange[] {
  return cachedRanges;
}

/** Backwards-compatible alias — readers should prefer `getFrameRanges()`. */
export const FRAME_RANGES = cachedRanges;

export function activeFrame(t: number): FrameId {
  const ranges = cachedRanges;
  for (const r of ranges) {
    if (t < r.end) return r.id;
  }
  return ranges[ranges.length - 1].id;
}

/** Journey markers — placed at the midpoint of each major section frame. */
export function getJourneyMarkers(): { id: FrameId; t: number; label: string }[] {
  const ranges = cachedRanges;
  const mid = (id: FrameId): number => {
    const r = ranges.find(x => x.id === id);
    return r ? (r.start + r.end) / 2 : 0;
  };
  return [
    { id: "hero",  t: mid("hero"),  label: "Space" },
    { id: "core",  t: mid("core"),  label: "Core"  },
    { id: "land",  t: mid("land"),  label: "Land"  },
    { id: "sky",   t: mid("sky"),   label: "Sky"   },
    { id: "moons", t: mid("moons"), label: "Work"  },
  ];
}

export const LAYER_TOKENS: Record<LayerId, Record<string, string>> = {
  core:  { bg: "oklch(8% 0.025 30)",   fg: "oklch(94% 0.04 60)",  muted: "oklch(70% 0.04 60)",   rule: "oklch(94% 0.04 60 / 0.14)", card: "oklch(94% 0.04 60 / 0.04)" },
  land:  { bg: "oklch(18% 0.015 250)", fg: "oklch(96% 0.01 80)",  muted: "oklch(78% 0.02 80)",   rule: "oklch(96% 0.01 80 / 0.18)", card: "oklch(96% 0.01 80 / 0.06)" },
  sky:   { bg: "oklch(8% 0.02 250)",   fg: "oklch(94% 0.05 270)", muted: "oklch(70% 0.05 270)",  rule: "oklch(94% 0.05 270 / 0.14)", card: "oklch(94% 0.05 270 / 0.04)" },
  space: { bg: "oklch(8% 0.022 250)",  fg: "oklch(96% 0.025 250)", muted: "oklch(72% 0.04 250)", rule: "oklch(96% 0.025 250 / 0.14)", card: "oklch(96% 0.025 250 / 0.04)" },
};

export const AVATAR_OFFSET: Record<LayerId, { x: number; y: number }> = {
  core:  { x: 0,   y: 0   },
  land:  { x: -10, y: 10  },
  sky:   { x: 20,  y: -20 },
  space: { x: 0,   y: -10 },
};
