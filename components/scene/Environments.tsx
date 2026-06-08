import type { LayerId } from "@/lib/layerStateMachine";

export default function Environments({ layer = "core" }: { layer?: LayerId }) {
  return (
    <div className="env-stage" aria-hidden="true">
      <div className="env-layer env-core" data-active={layer === "core"}>
        {/* Subtle ambient depth — no orbs, no "fire scene" */}
        <div className="env-core-haze" />
      </div>

      <div className="env-layer env-land" data-active={layer === "land"}>
        {/* Cinematic dark backdrop — no scene illustration */}
        <div className="env-land-haze" />
      </div>

      <div className="env-layer env-sky" data-active={layer === "sky"}>
        <div className="env-sky-haze" />
      </div>

      <div className="env-layer env-space" data-active={layer === "space"}>
        <div className="starfield" />
        <div style={{ position: "absolute", left: "20%", top: "30%", width: 600, height: 400,
          background: "radial-gradient(ellipse, oklch(50% 0.18 290 / 0.35), transparent 65%)", filter: "blur(30px)" }} />
        <div style={{ position: "absolute", right: "10%", bottom: "20%", width: 500, height: 350,
          background: "radial-gradient(ellipse, oklch(45% 0.15 250 / 0.3), transparent 65%)", filter: "blur(30px)" }} />
        <div style={{ position: "absolute", right: "8%", top: "12%", width: 60, height: 60, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, oklch(70% 0.12 230), oklch(35% 0.10 240) 70%, oklch(20% 0.08 250))",
          boxShadow: "0 0 30px oklch(60% 0.15 230 / 0.4)" }} />
      </div>
    </div>
  );
}
