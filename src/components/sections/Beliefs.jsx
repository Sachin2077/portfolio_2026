'use client';

import Image from 'next/image';
import { useState } from 'react';
import PixelArt from '@/components/ui/PixelArt';
import { beliefCluster, beliefMark, nextArrow } from '@/lib/pixels';
import { cx } from '@/lib/cx';

const pad = (n) => String(n).padStart(2, '0');

// Figma: "Background+Shadow" 137:49. The belief in focus, with its text.
function BeliefCard({ belief, index, total }) {
  return (
    <article
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      className="relative h-full rounded-2xl bg-surface p-2 shadow-frame"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[7.14px] bg-canvas shadow-float md:min-h-[514px] md:flex-row">
        <div key={index} className="flex animate-rise-in flex-col px-6 pb-10 pt-10 md:w-[371px] md:shrink-0 md:pb-[41px] md:pl-[27px] md:pr-0 md:pt-[52px]">
          <PixelArt pixels={beliefMark} width={17} height={18} />
          <p className="mt-2.5 text-[38px] font-medium leading-[50px] tracking-[0.13px] text-pixel">
            {pad(index + 1)}
          </p>
          <h3 className="mt-5 max-w-[344px] font-serif text-[clamp(36px,2.71vw,52px)] leading-[0.94] text-ink/80">
            {belief.title}
          </h3>
          <p className="mt-2.5 max-w-[344px] text-lg font-medium leading-8 text-ink/70 xl:text-xl">
            {belief.body}
          </p>
          <div className="mt-auto pt-10" aria-hidden>
            <div className="relative h-[5px] w-[178px] bg-bar-track">
              <div
                className="absolute inset-y-0 left-0 rounded-r-[10px] bg-bar transition-[width] duration-500"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto mb-10 aspect-square w-[min(300px,80%)] md:absolute md:right-[26px] md:top-[22px] md:m-0 md:w-[min(370px,calc(100%-397px))]">
          <Image
            key={belief.image}
            src={belief.image}
            alt=""
            fill
            sizes="370px"
            className="animate-rise-in object-contain"
          />
        </div>

        <PixelArt
          pixels={beliefCluster}
          width={39}
          height={36}
          className="absolute bottom-[23px] right-[46px] hidden md:block"
        />
      </div>
    </article>
  );
}

// Figma: "Background+Shadow" 137:84. A preview of the next belief; clicking it moves on.
function NextBeliefCard({ belief, index, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Next belief: ${belief.title}`}
      className="group relative block h-[512px] w-full rounded-2xl bg-surface p-2 text-left shadow-frame transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="relative block h-full overflow-hidden rounded-[7.14px] bg-canvas shadow-float">
        <span className="absolute left-[30px] top-8 flex flex-col gap-2.5">
          <PixelArt pixels={beliefMark} width={17} height={18} />
          <span className="text-[38px] font-medium leading-[50px] tracking-[0.13px] text-pixel">
            {pad(index + 1)}
          </span>
        </span>
        <span
          key={belief.image}
          className="absolute left-1/2 top-20 block aspect-square w-[min(336px,60%)] -translate-x-1/2 animate-rise-in"
        >
          <Image src={belief.image} alt="" fill sizes="336px" className="object-contain" />
        </span>
        <PixelArt
          pixels={beliefCluster}
          width={39}
          height={36}
          className="absolute bottom-5 right-8"
        />
      </span>
    </button>
  );
}

function ArrowButton({ direction = 'next', onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'next' ? 'Next belief' : 'Previous belief'}
      className={cx(
        'group place-items-center rounded-lg p-2 transition-transform duration-200',
        direction === 'next' ? 'hover:translate-x-1' : '-scale-x-100 hover:-translate-x-1',
        className,
      )}
    >
      <PixelArt pixels={nextArrow} width={96} height={40} />
    </button>
  );
}

export default function Beliefs({ title, items }) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const next = (index + 1) % total;
  const goNext = () => setIndex(next);
  const goPrev = () => setIndex((index - 1 + total) % total);
  const current = items[index];

  return (
    <section
      aria-labelledby="beliefs-title"
      aria-roledescription="carousel"
      className="container-page relative pt-20 xl:pt-[60px]"
    >
      <h2
        id="beliefs-title"
        className="text-center font-serif text-[clamp(30px,1.98vw,38px)] leading-none tracking-[0.13px] text-charcoal"
      >
        {title}
      </h2>

      {/* From 1200px: the Figma composition, with the arrow between the cards. */}
      <ArrowButton
        onClick={goNext}
        className="absolute left-[calc(16px_+_(100%_-_48px)_*_0.5293)] top-[184px] hidden xl:grid"
      />

      <div className="mt-10 grid gap-[23px] xl:mt-[126px] xl:grid-cols-[788fr_621fr] xl:items-start">
        <div className="xl:min-h-[530px]" aria-live="polite">
          <BeliefCard belief={current} index={index} total={total} />
        </div>
        <div className="hidden xl:mt-[109px] xl:block">
          <NextBeliefCard belief={items[next]} index={next} onClick={goNext} />
        </div>
      </div>

      {/* Below 1200px: the arrows sit under the card. */}
      <div className="mt-6 flex items-center justify-center gap-6 xl:hidden">
        <ArrowButton direction="prev" onClick={goPrev} className="grid scale-75" />
        <ArrowButton onClick={goNext} className="grid scale-75" />
      </div>
    </section>
  );
}
