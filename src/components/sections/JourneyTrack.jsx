'use client';

import { useEffect, useRef, useState } from 'react';
import PixelArt from '@/components/ui/PixelArt';
import {
  GARDENS,
  blooms,
  cloudLarge,
  cloudSmall,
  flag,
  platform,
  sceneColors as C,
  sparkle,
  sparkleSmall,
} from '@/lib/scene-sprites';
import { cx } from '@/lib/cx';

const pad = (n) => String(n).padStart(2, '0');

// Platform pixels that reach past each side of a card: room for a flower beside it.
const OVERHANG = 4;
const GOAL_WIDTH = 27;

// Pins the frame under the header and turns vertical scrolling into sideways travel, so the page moves
// through every step before it carries on down. The track eases toward the scroll position each frame.
// When the screen is too short for the scene, such as a phone on its side, the track becomes a row to swipe.
function usePinnedTravel({ outerRef, frameRef, viewportRef, contentRef, boxRef, probeRef, barRef, count }) {
  const [travel, setTravel] = useState(0);
  const [step, setStep] = useState(1);
  const [swipe, setSwipe] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    const content = contentRef.current;
    const box = boxRef.current;
    const probe = probeRef.current;
    const bar = barRef.current;
    if (!outer || !frame || !viewport || !content || !box || !probe) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let swiping = false;
    let distance = 0;
    let target = 0;
    let current = 0;
    let raf = 0;

    const show = (progress) => {
      if (bar) bar.style.transform = `scaleX(${progress})`;
      setStep(Math.round(progress * (count - 1)) + 1);
    };

    const paint = () => {
      raf = 0;
      current = reduced.matches ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.5) current = target;
      content.style.transform = `translate3d(${-current}px, 0, 0)`;
      if (current !== target) raf = requestAnimationFrame(paint);
    };

    const update = () => {
      if (swiping) {
        const room = viewport.scrollWidth - viewport.clientWidth;
        show(room > 0 ? Math.min(1, viewport.scrollLeft / room) : 0);
        return;
      }
      const pinTop = parseFloat(getComputedStyle(frame).top) || 0;
      const scrolled = pinTop - outer.getBoundingClientRect().top;
      const progress = distance ? Math.min(1, Math.max(0, scrolled / distance)) : 0;
      target = progress * distance;
      show(progress);
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const measure = () => {
      // The probe is as tall as the pinned frame. The scene has to fit above the progress row, though its
      // empty top padding may be cut.
      const needed = box.offsetHeight - parseFloat(getComputedStyle(box.querySelector('ol')).paddingTop);
      swiping = needed > probe.offsetHeight - frame.lastElementChild.offsetHeight;
      setSwipe(swiping);
      if (swiping) {
        cancelAnimationFrame(raf);
        raf = 0;
        target = 0;
        current = 0;
        content.style.transform = '';
      }
      distance = swiping ? 0 : Math.max(0, content.offsetWidth - viewport.clientWidth);
      setTravel(distance);
      update();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    observer.observe(viewport);
    window.addEventListener('scroll', update, { passive: true });
    viewport.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      viewport.removeEventListener('scroll', update);
      cancelAnimationFrame(raf);
    };
  }, [outerRef, frameRef, viewportRef, contentRef, boxRef, probeRef, barRef, count]);

  return { travel, step, swipe };
}

// Measures each card so its platform and flowers line up with it at every size.
function useScene(boxRef, probeRef) {
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;

    const measure = () => {
      const cards = [...box.querySelectorAll('[data-journey-card]')];
      const finish = box.querySelector('[data-journey-finish]');
      if (!cards.length || !finish) return;
      // One sprite pixel is about four design pixels, rounded to whole screen pixels so the art stays crisp.
      const u = (probeRef.current?.offsetWidth ?? 100) / 100;
      const px = Math.max(3, Math.round(4 * u));
      const origin = box.getBoundingClientRect();

      const platforms = cards.map((card) => {
        const r = card.getBoundingClientRect();
        const cols = Math.round(r.width / px) + OVERHANG * 2;
        const art = card.closest('li')?.querySelector('[data-journey-art]');
        return {
          x: Math.round(r.left - origin.left + r.width / 2 - (cols * px) / 2),
          y: Math.round(r.bottom - origin.top),
          cols,
          sky: art ? art.getBoundingClientRect().top - origin.top : 0,
        };
      });
      const f = finish.getBoundingClientRect();
      const last = platforms[platforms.length - 1];
      const goal = { x: Math.round(f.left - origin.left + 6 * px), y: last.y - 6 * px, cols: GOAL_WIDTH };
      setScene({ px, platforms, goal });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    box.querySelectorAll('[data-journey-card]').forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [boxRef, probeRef]);

  return scene;
}

function Sprite({ sprite, x, y, px, className, style }) {
  return (
    <div className={cx('absolute', className)} style={{ left: x, top: y, ...style }}>
      <PixelArt {...sprite} scale={px} unit="px" />
    </div>
  );
}

// A few clouds where the cards leave open sky, one over the flag, and a sparkle by each.
function Sky({ platforms, goal, px }) {
  const clouds = [];
  const roomiest = [...platforms].sort((a, b) => b.sky - a.sky).slice(0, 2);
  roomiest.forEach((stop, i) => {
    const sprite = i === 0 ? cloudLarge : cloudSmall;
    const [w, h] = [sprite.width * px, sprite.height * px];
    if (stop.sky < h + 4 * px) return;
    const x = stop.x + (stop.cols * px) / 2 - w * 0.3;
    const y = Math.max(px, (stop.sky - h) * 0.45);
    clouds.push({ sprite, x, y, star: i === 0 ? sparkle(C.blue) : sparkleSmall(C.pink), starAt: [x + w + 3 * px, y - px] });
  });
  const goalX = goal.x + (goal.cols * px) / 2;
  const goalY = Math.max(px, goal.y - (flag.height + 6 + cloudLarge.height) * px);
  clouds.push({ sprite: cloudLarge, x: goalX, y: goalY, star: sparkle(C.purple), starAt: [goalX - 9 * px, goalY + px] });

  return (
    <>
      {clouds.map((cloud, i) => (
        <Sprite
          key={`cloud-${i}`}
          sprite={cloud.sprite}
          x={cloud.x}
          y={cloud.y}
          px={px}
          className="animate-drift"
          style={{ animationDelay: `${-i * 6}s` }}
        />
      ))}
      {clouds.map((cloud, i) => (
        <Sprite
          key={`star-${i}`}
          sprite={cloud.star}
          x={cloud.starAt[0]}
          y={cloud.starAt[1]}
          px={px}
          className="animate-twinkle"
          style={{ animationDelay: `${-i * 1.2}s` }}
        />
      ))}
    </>
  );
}

// Behind the cards: the sky, a platform under each card, and the finish flag.
function Scenery({ scene }) {
  const { px, platforms, goal } = scene;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Sky platforms={platforms} goal={goal} px={px} />
      {platforms.map((stop, i) => (
        <Sprite key={i} sprite={platform(stop.cols, i + 1)} x={stop.x} y={stop.y} px={px} />
      ))}
      <Sprite sprite={platform(goal.cols, 9)} x={goal.x} y={goal.y} px={px} />
      <Sprite sprite={flag} x={goal.x + 9 * px} y={goal.y - flag.height * px} px={px} />
    </div>
  );
}

// In front of the cards: grass and flowers along each platform's top, so every card looks planted on it.
function Blooms({ scene }) {
  const { px, platforms, goal } = scene;
  const stand = (stop, sprite, key) => (
    <Sprite key={key} sprite={sprite} x={stop.x} y={stop.y - sprite.height * px} px={px} />
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {platforms.map((stop, i) =>
        stand(stop, blooms(stop.cols, i + 1, GARDENS[i % GARDENS.length]), i),
      )}
      {stand(goal, blooms(goal.cols, 9, GARDENS[3]), 'goal')}
    </div>
  );
}

// "My Journey", how far along the scroll is, and which step is in view.
function Progress({ title, step, count, barRef }) {
  return (
    <div aria-hidden className="container-page flex shrink-0 items-center gap-4 pb-4 pt-2 md:gap-6">
      <span className="font-pixel text-sm leading-none tracking-[0.04em] text-pixel">{title}</span>
      <span className="relative h-[5px] flex-1 bg-bar-track">
        <span
          ref={barRef}
          className="absolute inset-0 origin-left rounded-r-[10px] bg-bar"
          style={{ transform: 'scaleX(0)' }}
        />
      </span>
      <span className="font-pixel text-sm leading-none tracking-[0.04em] text-ink/50">
        {pad(step)} / {pad(count)}
      </span>
    </div>
  );
}

// The journey: a frame that pins under the header while the cards, standing on their platforms, slide past.
export default function JourneyTrack({ label, title, count, children }) {
  const outerRef = useRef(null);
  const frameRef = useRef(null);
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const boxRef = useRef(null);
  const probeRef = useRef(null);
  const barRef = useRef(null);
  const { travel, step, swipe } = usePinnedTravel({
    outerRef,
    frameRef,
    viewportRef,
    contentRef,
    boxRef,
    probeRef,
    barRef,
    count,
  });
  const scene = useScene(boxRef, probeRef);

  return (
    <div
      ref={outerRef}
      className="journey-frame relative"
      style={travel ? { height: `calc(var(--frame-h) + ${travel}px)` } : undefined}
    >
      <div
        ref={frameRef}
        role="region"
        aria-label={label}
        className={cx(
          'flex flex-col overflow-hidden',
          !swipe && 'sticky top-[72px] h-[var(--frame-h)] md:top-[90px]',
        )}
      >
        <div
          ref={probeRef}
          aria-hidden
          className="invisible absolute h-[var(--frame-h)] w-[calc(var(--u)*100)]"
        />
        <div
          ref={viewportRef}
          tabIndex={swipe ? 0 : undefined}
          className={cx('relative', swipe ? 'overflow-x-auto overscroll-x-contain' : 'min-h-0 flex-1')}
        >
          <div
            ref={contentRef}
            className={cx(
              'flex w-max flex-col',
              !swipe && 'absolute inset-y-0 left-0 justify-center will-change-transform',
            )}
          >
            <div ref={boxRef} className="relative">
              {scene ? <Scenery scene={scene} /> : null}
              <ol className="relative flex items-start gap-[calc(var(--u)*150)] px-[max(40px,calc((100vw-1432px)/2+40px))] pb-[calc(var(--u)*48)] pt-[calc(var(--u)*8)]">
                {children}
                <li aria-hidden data-journey-finish className="w-[calc(var(--u)*230)] shrink-0" />
              </ol>
              {scene ? <Blooms scene={scene} /> : null}
            </div>
          </div>
        </div>
        <Progress title={title} step={step} count={count} barRef={barRef} />
      </div>
    </div>
  );
}
