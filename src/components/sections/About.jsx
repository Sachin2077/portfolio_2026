import Button from '@/components/ui/Button';
import PixelArt from '@/components/ui/PixelArt';
import { about } from '@/content/home';
import { beliefMark } from '@/lib/pixels';

// Figma: "Frame 59", realigned so every line shares one left edge.
// A label across the top, then the statement on the left and the story with its button on the right.
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative rounded-[10px] shadow-band-soft"
    >
      <div className="mx-auto max-w-[1168px] px-6 py-[clamp(64px,5vw,96px)]">
        <p className="flex items-center gap-3 font-pixel text-base font-medium leading-none tracking-[0.04em] text-pixel">
          <PixelArt pixels={beliefMark} width={17} height={18} />
          {about.label}
        </p>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[5fr_7fr] lg:gap-[clamp(48px,6vw,96px)]">
          <h2
            id="about-title"
            className="text-balance font-serif text-[clamp(32px,2.71vw,48px)] leading-[1.12] text-ink/80"
          >
            {about.heading}
          </h2>
          <div className="flex flex-col items-start gap-8">
            <p className="max-w-[600px] text-lg font-medium leading-[30px] text-ink/70 md:text-xl md:leading-8 lg:max-w-none">
              {about.body}
            </p>
            <Button href={about.cta.href} variant="dark" className="w-[151px] px-0">
              {about.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
