"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Environments from "@/components/scene/Environments";
import { CoreLayer, LandLayer, SkyLayer } from "@/components/ui/Layers";
import Loader from "@/components/ui/Loader";
import Hero from "@/components/ui/Hero";
import Moons from "@/components/ui/Moons";
import JourneyIndicator from "@/components/ui/JourneyIndicator";
import Nav from "@/components/ui/Nav";
import { useScrollProgress, usePrefersReducedMotion } from "@/lib/scrollController";
import { useScrollAnimations } from "@/lib/scrollAnimations";
import { useLenis } from "@/lib/useLenis";
import { LAYER_TOKENS } from "@/lib/layerStateMachine";

const SceneCanvas = dynamic(() => import("@/components/scene/Canvas"), { ssr: false });

export default function Page() {
  const reducedMotion = usePrefersReducedMotion();
  useLenis(!reducedMotion);
  const { progress, frame, layer } = useScrollProgress();
  useScrollAnimations(!reducedMotion);

  useEffect(() => {
    const t = LAYER_TOKENS[layer];
    Object.entries(t).forEach(([k, v]) => document.documentElement.style.setProperty(`--${k}`, v));
  }, [layer]);

  return (
    <>
      <Loader />
      <Environments layer={layer} />
      {!reducedMotion && <SceneCanvas progress={progress} />}
      <Nav />
      <JourneyIndicator frame={frame} progress={progress} />
      <main className="spine">
        <Hero />
        <CoreLayer />
        <LandLayer />
        <SkyLayer />
        <Moons />
      </main>
    </>
  );
}
