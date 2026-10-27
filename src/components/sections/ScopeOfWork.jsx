import Link from 'next/link';
import ToolStack from '@/components/sections/ToolStack';
import PixelArt from '@/components/ui/PixelArt';
import PixelBadge from '@/components/ui/PixelBadge';
import PixelCard from '@/components/ui/PixelCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { scope } from '@/content/home';
import { beliefMark } from '@/lib/pixels';

const pad = (n) => String(n).padStart(2, '0');

function ProofLink({ proof }) {
  if (!proof) return null;
  return (
    <Link
      href={`/projects/${proof.slug}`}
      className="group inline-flex items-center gap-1.5 text-[13.8px] font-medium tracking-[0.15px] text-chip-ink hover:text-primary-deep"
    >
      Seen in {proof.name}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

function SubTitle({ id, children }) {
  return (
    <h3
      id={id}
      className="text-center font-serif text-[clamp(30px,1.98vw,38px)] leading-[1.1] tracking-[0.13px] text-charcoal"
    >
      {children}
    </h3>
  );
}

// "Scope of work" is not drawn in Figma yet. It reuses the tile, journey-card and band styles from the frame.
export default function ScopeOfWork({ proofs }) {
  return (
    <section id="scope" aria-labelledby="scope-title" className="pt-[clamp(96px,8.33vw,160px)]">
      <div className="container-page">
        <SectionTitle id="scope-title" title={scope.title} intro={scope.intro} />

        {/* What I know */}
        <ul className="mt-14 grid gap-[23px] md:grid-cols-2 xl:grid-cols-4">
          {scope.areas.map((area, i) => (
            <li
              key={area.title}
              className="flex flex-col rounded-[10px] bg-tile px-6 pb-6 pt-7 shadow-tile"
            >
              <PixelBadge number={i + 1} />
              <h3 className="mt-4 font-serif text-2xl leading-[1.15] text-night">{area.title}</h3>
              <p className="mt-3 text-[15px] font-medium leading-6 text-ink/70">{area.body}</p>
              <div className="mt-auto pt-6">
                <ProofLink proof={proofs[area.proof]} />
              </div>
            </li>
          ))}
        </ul>

        {/* What you can count on */}
        <div className="mt-[clamp(80px,6.25vw,120px)]" aria-labelledby="traits-title" role="region">
          <SubTitle id="traits-title">{scope.traitsTitle}</SubTitle>
          <ul className="mx-auto mt-12 grid max-w-[1200px] gap-x-[23px] gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {scope.traits.map((trait, i) => (
              <li key={trait.title} className="flex">
                <PixelCard
                  number={i + 1}
                  title={trait.title}
                  body={trait.body}
                  as="h4"
                  className="w-full min-h-[230px]"
                  footer={
                    <div className="flex items-end justify-between gap-4">
                      <ProofLink proof={proofs[trait.proof]} />
                    </div>
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        {/* The steps I take */}
        <div className="mt-[clamp(80px,6.25vw,120px)]" aria-labelledby="steps-title" role="region">
          <SubTitle id="steps-title">{scope.stepsTitle}</SubTitle>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[15px] font-medium leading-6 text-ink/70">
            {scope.stepsIntro}
          </p>
          <ol className="mt-12 grid gap-x-[23px] gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {scope.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex shrink-0 flex-col gap-2">
                  <PixelArt pixels={beliefMark} width={17} height={18} />
                  <span className="text-[30px] font-medium leading-none tracking-[0.13px] text-pixel">
                    {pad(i + 1)}
                  </span>
                </div>
                <div className="pt-6">
                  <h4 className="text-lg font-semibold leading-6 text-ink/80">{step.title}</h4>
                  <p className="mt-2 text-[15px] font-medium leading-6 text-ink/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ToolStack />
      </div>
    </section>
  );
}
