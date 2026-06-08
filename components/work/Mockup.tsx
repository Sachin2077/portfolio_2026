"use client";

import { useState } from "react";
import type { Mockup as MockupData } from "@/lib/projects";

type Props = MockupData & { className?: string };

/**
 * A mockup slot for the case-study pages. Renders the image when `src` resolves;
 * if the file isn't uploaded yet (404 / load error) it gracefully falls back to
 * a styled placeholder, so the layout is final before the real screens exist.
 */
export default function Mockup({ src, alt, caption, wide, className }: Props) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  const classes = ["case-mockup", wide ? "case-mockup--wide" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={classes}>
      <div className="case-mockup-frame" data-empty={showImg ? undefined : "true"}>
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="case-mockup-ph" aria-hidden="true">
            <span className="case-mockup-ph-mark">Mockup</span>
          </span>
        )}
      </div>
      {caption ? <figcaption className="case-mockup-cap">{caption}</figcaption> : null}
    </figure>
  );
}
