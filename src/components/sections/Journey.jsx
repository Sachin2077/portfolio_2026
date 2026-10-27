import Image from 'next/image';
import Button from '@/components/ui/Button';
import PixelArt from '@/components/ui/PixelArt';
import PixelCard from '@/components/ui/PixelCard';
import SectionTitle from '@/components/ui/SectionTitle';
import JourneyTrack from '@/components/sections/JourneyTrack';
import { journey } from '@/content/home';
import { journeyDash } from '@/lib/pixels';
import { cx } from '@/lib/cx';

// How each illustration sits above its card, measured from the Figma timeline (Frame 51–56 and Frame 55).
// box: the art frame; ellipse: the blue blob behind; image: the illustration, with optional crop and mirror.
const ART = [
  {
    width: 240,
    cardWidth: 240,
    box: { w: 132, h: 126, x: 54, overlap: 1 },
    ellipse: { src: 'ellipse-01', x: 82, y: 28, w: 122, h: 110 },
    image: { x: 67, y: 0, w: 132, h: 126, flip: true, crop: { w: 147.57, h: 154.31, l: -30.1, t: -26.9 } },
  },
  {
    width: 268,
    cardWidth: 268,
    tinted: true,
    box: { w: 330, h: 247, x: -31, overlap: -58 },
    ellipse: { src: 'ellipse-02', x: 30, y: 67, w: 162, h: 162 },
    image: { x: 0, y: 0, w: 240, h: 240 },
  },
  {
    width: 238,
    cardWidth: 215,
    box: { w: 175, h: 238, x: 31.5, overlap: -49 },
    ellipse: { src: 'ellipse-03', x: 46.5, y: 54, w: 169, h: 162 },
    image: { x: 0, y: 0, w: 238, h: 238, flip: true },
  },
  {
    width: 243,
    cardWidth: 243,
    box: { w: 202, h: 209, x: 0, overlap: -45 },
    ellipse: { src: 'ellipse-04', x: 0, y: 49, w: 169, h: 146 },
    image: { x: -48, y: 0, w: 283, h: 205, crop: { w: 72.44, h: 100, l: 14.66, t: 0 } },
  },
  {
    width: 234,
    cardWidth: 215,
    box: { w: 234, h: 234, x: 0, overlap: -39 },
    ellipse: { src: 'ellipse-05', x: 54, y: 63, w: 168, h: 158 },
    image: { x: 14, y: 0, w: 234, h: 234, flip: true },
  },
  {
    width: 274,
    cardWidth: 274,
    box: { w: 200, h: 200, x: 0, overlap: -28 },
    ellipse: { src: 'ellipse-06', x: -12, y: 36, w: 178, h: 168 },
    image: { x: -15, y: 0, w: 200, h: 200 },
  },
];

// How far each card's bottom edge sits below the highest one, oldest first: a gentle wave that rises
// toward the end, kept small so the pinned scene fits the screen's height.
const STAGGER = [20, 4, 16, 0, 14, 2];

// Illustrations differ in height, so each column also drops by its art's shortfall from the tallest.
// That puts every card's bottom edge, and so its platform, exactly on the stagger.
const artHeight = ({ box }) => box.h + box.overlap;
const TALLEST_ART = Math.max(...ART.map(artHeight));

// Every size on a step is in design pixels times --u, which the pinned frame sets from the screen's
// height. The art, the blob, the card and the stagger grow together and keep their Figma proportions.
const px = (value) => `calc(var(--u) * ${value})`;

function Illustration({ art, src }) {
  const { box, ellipse, image } = art;
  return (
    <div
      aria-hidden
      data-journey-art
      className="relative shrink-0"
      style={{ width: px(box.w), height: px(box.h), marginLeft: px(box.x), marginBottom: px(box.overlap) }}
    >
      <img
        src={`/images/icons/${ellipse.src}.svg`}
        alt=""
        className="absolute max-w-none"
        style={{ left: px(ellipse.x), top: px(ellipse.y), width: px(ellipse.w), height: px(ellipse.h) }}
      />
      <div
        className={cx('absolute overflow-hidden', image.flip && '-scale-x-100')}
        style={{ left: px(image.x), top: px(image.y), width: px(image.w), height: px(image.h) }}
      >
        {image.crop ? (
          <div
            className="absolute"
            style={{
              left: `${image.crop.l}%`,
              top: `${image.crop.t}%`,
              width: `${image.crop.w}%`,
              height: `${image.crop.h}%`,
            }}
          >
            <Image src={src} alt="" fill sizes="(min-width: 768px) 400px, 300px" className="object-cover" />
          </div>
        ) : (
          <Image src={src} alt="" fill sizes="(min-width: 768px) 400px, 300px" className="object-cover" />
        )}
      </div>
    </div>
  );
}

function JourneyStep({ step, index }) {
  const art = ART[index % ART.length];
  const stagger = STAGGER[index % STAGGER.length];
  const shortfall = TALLEST_ART - artHeight(art);
  return (
    <li className="flex shrink-0 flex-col" style={{ width: px(art.width) }}>
      <div className="flex flex-col" style={{ marginTop: px(stagger + shortfall) }}>
        <Illustration art={art} src={step.image} />
        <PixelCard
          title={step.title}
          meta={step.when}
          body={step.body}
          tinted={art.tinted}
          size="fluid"
          className="relative z-10 min-h-[calc(var(--u)*230)] self-center"
          style={{ width: px(art.cardWidth) }}
          data-journey-card
        />
      </div>
    </li>
  );
}

// Figma: "Background+Shadow" 113:4838 and the cliff image beside it.
function WhatsNext() {
  const { next } = journey;
  return (
    <div className="container-page mt-12 xl:mt-[96px]">
      <div className="relative mx-auto max-w-[868px] xl:h-[781px] xl:translate-x-[22px]">
        <PixelCard
          title={next.title}
          body={next.body}
          size="md"
          padding="px-4 pb-4 pt-[34px]"
          className="z-10 w-full max-w-[382px] xl:absolute xl:left-0 xl:top-0 xl:min-h-[432px]"
          footer={
            <div className="flex flex-col items-start gap-8 xl:gap-[119px]">
              <PixelArt pixels={journeyDash} width={48} height={3} />
              <Button href={next.cta.href} className="w-[174px] px-0">
                {next.cta.label}
              </Button>
            </div>
          }
        />
        <div className="relative -mt-12 ml-auto aspect-[610/606] w-[min(610px,88%)] overflow-hidden rounded-[29px] xl:absolute xl:bottom-0 xl:right-0 xl:mt-0 xl:w-[610px]">
          <Image
            src={next.image}
            alt={next.imageAlt}
            fill
            sizes="(min-width: 768px) 610px, 88vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title">
      {/* The title, then the cards on their platforms. The track pins under the header and scrolling
          moves it sideways until the last step, then the page carries on. */}
      <div className="pt-[clamp(96px,7.3vw,140px)]">
        <div className="container-page">
          <SectionTitle id="journey-title" title={journey.title} intro={journey.intro} />
        </div>
        <div className="mt-6 xl:mt-8">
          <JourneyTrack
            label="My Journey, oldest first. Keep scrolling to move through each step."
            title={journey.title}
            count={journey.steps.length}
          >
            {journey.steps.map((step, index) => (
              <JourneyStep key={step.title} step={step} index={index} />
            ))}
          </JourneyTrack>
        </div>
      </div>
      <WhatsNext />
    </section>
  );
}
