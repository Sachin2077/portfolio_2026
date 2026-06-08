import type { LayerId } from "@/lib/layerStateMachine";

type Palette = {
  skin: string; hair: string; jacket: string; pants: string;
  accent: string; glow: string; rim: string;
};

const palettes: Record<LayerId, Palette> = {
  core:  { skin: "oklch(72% 0.08 50)", hair: "oklch(20% 0.05 30)", jacket: "oklch(35% 0.10 40)",  pants: "oklch(25% 0.05 40)",  accent: "oklch(78% 0.20 60)",  glow: "oklch(80% 0.22 50)",  rim: "oklch(85% 0.20 55)" },
  land:  { skin: "oklch(75% 0.06 50)", hair: "oklch(22% 0.04 30)", jacket: "oklch(45% 0.07 160)", pants: "oklch(35% 0.04 250)", accent: "oklch(65% 0.10 30)",  glow: "transparent",          rim: "oklch(95% 0.04 80)"  },
  sky:   { skin: "oklch(78% 0.05 50)", hair: "oklch(25% 0.05 30)", jacket: "oklch(70% 0.10 30)",  pants: "oklch(50% 0.06 270)", accent: "oklch(85% 0.12 70)",  glow: "oklch(95% 0.04 70)",  rim: "oklch(90% 0.05 70)"  },
  space: { skin: "oklch(78% 0.05 50)", hair: "oklch(20% 0.04 30)", jacket: "oklch(92% 0.02 250)", pants: "oklch(85% 0.03 250)", accent: "oklch(70% 0.15 250)", glow: "oklch(80% 0.15 250)", rim: "oklch(90% 0.10 250)" },
};

export default function Avatar({ layer = "core", progress = 0 }: { layer?: LayerId; progress?: number }) {
  const p = palettes[layer] ?? palettes.core;
  const breath = 1 + Math.sin(progress * Math.PI * 2) * 0.01;
  const labels: Record<LayerId, string> = { core: "CORE", land: "LAND", sky: "SKY", space: "SPACE" };

  return (
    <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style={{ transform: `scale(${breath})` }}>
      <defs>
        <radialGradient id="avatar-glow" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.45" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="helmet-glass" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="oklch(95% 0.04 250 / 0.4)" />
          <stop offset="100%" stopColor="oklch(50% 0.10 250 / 0.05)" />
        </radialGradient>
      </defs>
      {layer !== "land" && <ellipse cx="100" cy="180" rx="90" ry="120" fill="url(#avatar-glow)" />}
      {layer === "space" && <path d="M 100 280 Q 60 320 30 360" stroke={p.accent} strokeWidth="1.5" fill="none" strokeDasharray="2 4" opacity="0.6" />}
      {layer === "sky" && <ellipse cx="100" cy="280" rx="80" ry="14" fill="oklch(98% 0.01 0 / 0.5)" filter="blur(6px)" />}
      {layer === "core" && <ellipse cx="100" cy="280" rx="60" ry="8" fill="oklch(15% 0.04 30)" />}
      {layer === "land" && (
        <g>
          <ellipse cx="100" cy="280" rx="50" ry="4" fill="oklch(45% 0.10 130)" opacity="0.6" />
          <path d="M 75 278 L 78 270 M 90 278 L 93 268 M 110 278 L 113 271 M 125 278 L 128 269" stroke="oklch(50% 0.12 130)" strokeWidth="1.2" fill="none" />
        </g>
      )}
      <g>
        <rect x="80" y="200" width="16" height="80" rx="6" fill={p.pants} />
        <rect x="104" y="200" width="16" height="80" rx="6" fill={p.pants} />
        <ellipse cx="88" cy="282" rx="12" ry="5" fill={layer === "space" ? p.jacket : "oklch(20% 0.02 30)"} />
        <ellipse cx="112" cy="282" rx="12" ry="5" fill={layer === "space" ? p.jacket : "oklch(20% 0.02 30)"} />
        <path d="M 70 130 Q 70 120 80 118 L 120 118 Q 130 120 130 130 L 132 205 Q 100 215 68 205 Z" fill={p.jacket} />
        <path d="M 90 118 L 110 118 L 108 145 L 92 145 Z" fill={layer === "space" ? "oklch(60% 0.08 250)" : "oklch(85% 0.02 80)"} />
        {layer === "sky" ? (
          <>
            <path d="M 70 132 Q 40 120 28 100" stroke={p.jacket} strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M 130 132 Q 160 120 172 100" stroke={p.jacket} strokeWidth="14" strokeLinecap="round" fill="none" />
            <circle cx="28" cy="100" r="7" fill={p.skin} />
            <circle cx="172" cy="100" r="7" fill={p.skin} />
          </>
        ) : layer === "space" ? (
          <>
            <path d="M 72 135 Q 50 160 45 195" stroke={p.jacket} strokeWidth="15" strokeLinecap="round" fill="none" />
            <path d="M 128 135 Q 150 160 155 195" stroke={p.jacket} strokeWidth="15" strokeLinecap="round" fill="none" />
            <circle cx="45" cy="195" r="8" fill={p.jacket} />
            <circle cx="155" cy="195" r="8" fill={p.jacket} />
          </>
        ) : (
          <>
            <path d="M 72 135 Q 60 170 62 200" stroke={p.jacket} strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M 128 135 Q 140 170 138 200" stroke={p.jacket} strokeWidth="14" strokeLinecap="round" fill="none" />
            <circle cx="62" cy="202" r="7" fill={p.skin} />
            <circle cx="138" cy="202" r="7" fill={p.skin} />
          </>
        )}
        {layer === "core" && (
          <g>
            <circle cx="62" cy="202" r="14" fill={p.accent} opacity="0.5" filter="blur(4px)" />
            <circle cx="62" cy="202" r="7" fill={p.accent} />
            <circle cx="60" cy="200" r="2.5" fill="oklch(98% 0.05 80)" />
          </g>
        )}
        <rect x="94" y="105" width="12" height="18" fill={p.skin} />
        <ellipse cx="100" cy="92" rx="22" ry="26" fill={p.skin} />
        {layer === "sky" ? (
          <path d="M 78 78 Q 78 65 100 62 Q 122 65 128 80 Q 132 70 145 78 L 138 92 Q 122 82 100 82 Q 86 82 80 95 Z" fill={p.hair} />
        ) : (
          <path d="M 78 78 Q 78 64 100 62 Q 122 64 122 78 L 122 92 Q 110 82 100 82 Q 88 82 78 92 Z" fill={p.hair} />
        )}
        <ellipse cx="92" cy="92" rx="1.8" ry="2.5" fill="oklch(15% 0.02 30)" />
        <ellipse cx="108" cy="92" rx="1.8" ry="2.5" fill="oklch(15% 0.02 30)" />
        <path d="M 95 102 Q 100 105 105 102" stroke="oklch(35% 0.05 30)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {layer === "space" && (
          <>
            <circle cx="100" cy="92" r="34" fill="url(#helmet-glass)" stroke={p.accent} strokeWidth="2" opacity="0.9" />
            <path d="M 70 92 Q 100 60 130 92" stroke={p.rim} strokeWidth="1.2" fill="none" opacity="0.6" />
          </>
        )}
        {layer === "core" && <circle cx="100" cy="160" r="4" fill={p.accent} opacity="0.8" />}
      </g>
      <g opacity="0.65">
        <rect x="60" y="305" width="80" height="1" fill={p.rim} opacity="0.5" />
        <text x="100" y="318" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="2" fill={p.rim} opacity="0.8">
          {labels[layer]}
        </text>
      </g>
    </svg>
  );
}

