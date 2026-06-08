"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getFrameRanges } from "@/lib/layerStateMachine";

const COUNT = 350;

const PALETTE = {
  core:  new THREE.Color("#ffb359"),
  land:  new THREE.Color("#dfe88a"),
  sky:   new THREE.Color("#ffffff"),
  space: new THREE.Color("#a9c8ff"),
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Interpolate the canvas color along the journey using LIVE frame ranges.
 * (Was previously hardcoded to 0.05/0.18/0.40/0.58/0.78 which drifted out of
 * sync with the computed FRAME_RANGES.)
 */
function tColor(out: THREE.Color, t: number) {
  const ranges = getFrameRanges();
  // Order: hero, dive, core, land, sky, ascent, moons.
  const hero = ranges[0], dive = ranges[1], core = ranges[2],
        land = ranges[3], sky = ranges[4];

  if (t < hero.end) return out.copy(PALETTE.space);
  if (t < dive.end) {
    const k = (t - hero.end) / Math.max(0.001, dive.end - hero.end);
    return out.copy(PALETTE.space).lerp(PALETTE.core, clamp01(k));
  }
  if (t < core.end) return out.copy(PALETTE.core);
  if (t < land.end) {
    const k = (t - core.end) / Math.max(0.001, land.end - core.end);
    return out.copy(PALETTE.core).lerp(PALETTE.land, clamp01(k));
  }
  if (t < sky.end) {
    const k = (t - land.end) / Math.max(0.001, sky.end - land.end);
    return out.copy(PALETTE.land).lerp(PALETTE.sky, clamp01(k));
  }
  const k = (t - sky.end) / Math.max(0.001, 1 - sky.end);
  return out.copy(PALETTE.sky).lerp(PALETTE.space, clamp01(k));
}

function Particles({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 32;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, []);

  const seeds = useMemo(() => {
    const arr = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) arr[i] = Math.random();
    return arr;
  }, []);

  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const t = progressRef.current;
    const time = state.clock.elapsedTime;
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position.array as Float32Array;

    // Derive ember/drift/swirl amounts from live frame ranges so the canvas
    // motion lines up with the actual section transitions.
    const ranges = getFrameRanges();
    const hero = ranges[0];
    const core = ranges[2];
    const land = ranges[3];
    const sky  = ranges[4];

    // Core embers: full at start of core, fading to 0 by end of core
    const riseAmt  = 1 - clamp01((t - core.start) / Math.max(0.001, core.end - core.start));
    // Sky drift: starts at end of land, full by end of sky
    const horizAmt = clamp01((t - land.end) / Math.max(0.001, sky.end - land.end));
    // Space swirl: starts after sky ends, full by page end
    const swirlAmt = clamp01((t - sky.end) / Math.max(0.001, 1 - sky.end));

    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      const xi = i * 3;
      const yi = i * 3 + 1;

      pos[yi] += (0.015 + s * 0.04) * riseAmt;
      if (pos[yi] > 11) pos[yi] = -11;

      pos[xi] -= (0.006 + s * 0.012) * horizAmt;
      if (pos[xi] < -18) pos[xi] = 18;

      pos[yi] += Math.sin(time * 0.6 + s * 6) * 0.004;

      if (swirlAmt > 0) {
        const x = pos[xi];
        const y = pos[yi];
        const a = swirlAmt * 0.0008;
        pos[xi] = x * Math.cos(a) - y * Math.sin(a);
        pos[yi] = x * Math.sin(a) + y * Math.cos(a);
      }
    }
    geo.attributes.position.needsUpdate = true;

    if (matRef.current) {
      tColor(tmpColor, t);
      matRef.current.color.copy(tmpColor);
      // Size/opacity tuned to frame zones (space → core → land+sky → space)
      const size = t < hero.end ? 0.07
                 : t < core.end ? 0.045
                 : t < sky.end ? 0.05
                 : 0.08;
      matRef.current.size += (size - matRef.current.size) * 0.06;
      const opacity = t < core.end ? 0.7
                    : t < sky.end ? 0.55
                    : 0.85;
      matRef.current.opacity += (opacity - matRef.current.opacity) * 0.06;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Lights({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  useFrame(() => {
    if (!dirRef.current) return;
    tColor(tmpColor, progressRef.current);
    dirRef.current.color.copy(tmpColor);
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight ref={dirRef} position={[6, 6, 4]} intensity={0.6} />
    </>
  );
}

function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const t = progressRef.current;
    const ranges = getFrameRanges();
    const sky = ranges[4];
    // FOV widens entering Space (moons frame), tied to actual sky.end
    const skyEnd = sky.end;
    const targetFov = 50 + clamp01((t - skyEnd) / Math.max(0.001, 1 - skyEnd)) * 18;
    camera.fov += (targetFov - camera.fov) * 0.05;
    camera.updateProjectionMatrix();
    const targetX = Math.sin(t * Math.PI * 1.2) * 0.5;
    const targetY = (t - 0.5) * 0.7;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
  });
  return null;
}

/**
 * Renders nothing — its job is to invalidate the canvas whenever the host
 * `progress` prop changes, so `frameloop="demand"` knows to draw a fresh frame.
 * Without this, switching to `demand` would freeze the scene mid-animation.
 */
function Invalidator({ progress }: { progress: number }) {
  const { invalidate } = useThree();
  useEffect(() => { invalidate(); }, [progress, invalidate]);
  return null;
}

/** Returns true on low-end devices (limited cores, save-data, or low RAM). */
function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 4;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
  const saveData = conn?.saveData === true;
  // @ts-expect-error - non-standard but widely supported on mobile
  const ramGb: number | undefined = navigator.deviceMemory;
  return cores < 4 || saveData || (ramGb !== undefined && ramGb < 4);
}

export default function SceneCanvas({ progress }: { progress: number }) {
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const lowEnd = useMemo(() => isLowEndDevice(), []);
  const dpr: [number, number] = lowEnd ? [1, 1] : [1, Math.min(1.6, typeof window !== "undefined" ? window.devicePixelRatio : 1.6)];

  return (
    <Canvas
      className="r3f-canvas"
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={dpr}
      frameloop="demand"
    >
      <Invalidator progress={progress} />
      <Lights progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
      <Particles progressRef={progressRef} />
    </Canvas>
  );
}
