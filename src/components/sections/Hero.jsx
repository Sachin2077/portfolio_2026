import Image from 'next/image';
import Button from '@/components/ui/Button';
import { hero } from '@/content/home';

// Figma: "Frame 58" over "ChatGPT Image Sep 29, 2026, 02_20_20 PM 1" (1938×1091), served at 2× (3876×2182).
// From 1200px up the city sits behind the text, as in the frame. Below that it stacks under the text.
// Under 1920px the section grows a little, so the tallest towers stay clear of the button.
export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden xl:min-h-[calc(100vw*1091/1920_+_clamp(0px,(1920px_-_100vw)*0.12,80px))]"
    >
      <div className="relative z-10 mx-auto flex max-w-[749px] flex-col items-center gap-7 px-6 pt-[clamp(56px,5.9375vw,114px)] text-center">
        <div className="flex flex-col items-center gap-5">
          <h1 id="hero-title" className="flex flex-col items-center gap-5">
            <span className="block text-[clamp(30px,3.3333vw,64px)] font-light leading-[0.95] text-ink/80">
              {hero.greeting}
            </span>
            <span className="block font-serif text-[clamp(38px,4.0625vw,78px)] leading-[1.28] text-ink/80">
              <span className="text-primary">{hero.headline.accent}</span> {hero.headline.rest}
            </span>
          </h1>
          <p className="max-w-[643px] text-base font-medium leading-[21px] tracking-[0.15px] text-ink/70">
            {hero.body}
          </p>
        </div>
        <Button href={hero.cta.href} variant="soft" size="sm" className="w-[111px] px-0">
          {hero.cta.label}
        </Button>
      </div>

      <div className="relative mt-8 h-[clamp(300px,62vw,560px)] xl:absolute xl:inset-0 xl:mt-0 xl:h-auto">
        <div className="absolute bottom-0 right-[-9px] aspect-[1938/1091] w-[max(calc(100%+18px),960px)]">
          <Image
            src="/images/hero/city-rooftop.png"
            alt={hero.sceneAlt}
            fill
            priority
            sizes="(min-width: 960px) 100vw, 960px"
            className="object-cover"
          />
          {/* Figma "Rectangle 4900": a canvas-coloured patch the design lays over the city. */}
          <img
            src="/images/icons/hero-rect-4900.svg"
            alt=""
            aria-hidden
            className="absolute left-[41.33%] top-[39.05%] h-[10.54%] w-[2.04%]"
          />
        </div>
      </div>
    </section>
  );
}
