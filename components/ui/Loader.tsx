"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const onReady = () => setHidden(true);
    if (document.readyState === "complete") {
      const t = setTimeout(onReady, 350);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", onReady);
    const fallback = setTimeout(onReady, 4000);
    return () => {
      window.removeEventListener("load", onReady);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const t = setTimeout(() => setGone(true), 800);
    return () => clearTimeout(t);
  }, [hidden]);

  if (gone) return null;

  return (
    <div className={`loader ${hidden ? "loader-hidden" : ""}`} aria-hidden={hidden}>
      <div className="loader-orb" />
      <div className="loader-label">From the Core to the Constellation</div>
    </div>
  );
}
