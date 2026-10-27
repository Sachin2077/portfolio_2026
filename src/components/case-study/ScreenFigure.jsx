import Image from 'next/image';
import BrowserFrame from '@/components/ui/BrowserFrame';
import { cx } from '@/lib/cx';

// One screen in a window frame, with its caption. The frame links to the full image.
// fit="natural" shows the whole screen at its own height (the cover). fit="uniform" puts every
// screen in the same 16:10 frame so gallery rows line up: tall captures show their top, very
// wide ones are letterboxed rather than cut.
export default function ScreenFigure({ screen, path, fit = 'natural', priority = false, sizes, className }) {
  const ratio = screen.height / screen.width;
  const tall = ratio > 0.75;
  const wide = ratio < 0.5;
  const framed = fit === 'uniform' || tall;
  const cropped = framed && !wide && Math.abs(ratio - 0.625) > 0.05;

  return (
    <figure className={cx('min-w-0', className)}>
      <a
        href={screen.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${screen.caption}. Open the full image in a new tab`}
        className="group block rounded-2xl bg-surface p-2 shadow-frame"
      >
        <BrowserFrame path={path}>
          {framed ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-tile">
              <Image
                src={screen.src}
                alt={screen.caption}
                fill
                priority={priority}
                sizes={sizes}
                className={cx(
                  'transition-transform duration-500 group-hover:scale-[1.015]',
                  wide ? 'object-contain' : 'object-cover object-left-top',
                )}
              />
            </div>
          ) : (
            <Image
              src={screen.src}
              alt={screen.caption}
              width={screen.width}
              height={screen.height}
              priority={priority}
              sizes={sizes}
              className="block h-auto w-full"
            />
          )}
        </BrowserFrame>
      </a>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-1">
        <span className="text-[14.5px] font-medium leading-6 text-ink/70">{screen.caption}</span>
        {cropped ? (
          <span aria-hidden className="shrink-0 font-poppins text-xs font-medium text-journey">
            Full screen ↗
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
