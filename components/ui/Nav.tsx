"use client";

import { memo, useEffect, useRef, useState } from "react";

function NavImpl() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (y < 80) setHidden(false);
      else if (dy > 4) setHidden(true);
      else if (dy < -4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${hidden ? "is-hidden" : ""}`} aria-label="Primary">
      <a href="#hero" className="site-nav-brand">Portfolio</a>
      <nav className="site-nav-links">
        <a href="#moons">work</a>
        <a href="#land">about</a>
        <a href="#contact">contact</a>
      </nav>
    </header>
  );
}

export default memo(NavImpl);
