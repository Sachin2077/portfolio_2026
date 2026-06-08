"use client";

import dynamic from "next/dynamic";
import AvatarSVG from "./AvatarSVG";
import type { LayerId } from "@/lib/layerStateMachine";

const SplineScene = dynamic(
  () => import("@splinetool/react-spline").then((m) => m.default),
  {
    ssr: false,
    loading: () => null,
  }
);

const SPLINE_URL = process.env.NEXT_PUBLIC_SPLINE_AVATAR_URL;

export default function Avatar({
  layer = "core",
  progress = 0,
}: {
  layer?: LayerId;
  progress?: number;
}) {
  if (SPLINE_URL) {
    return (
      <div className="avatar-spline">
        <SplineScene scene={SPLINE_URL} />
      </div>
    );
  }
  return <AvatarSVG layer={layer} progress={progress} />;
}
