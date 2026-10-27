import Link from 'next/link';
import { notFound } from 'next/navigation';
import CaseSection from '@/components/case-study/CaseSection';
import ScreenFigure from '@/components/case-study/ScreenFigure';
import Button from '@/components/ui/Button';
import Chip, { toneForTag } from '@/components/ui/Chip';
import PixelArt from '@/components/ui/PixelArt';
import PixelBadge from '@/components/ui/PixelBadge';
import PixelCard from '@/components/ui/PixelCard';
import ToolList from '@/components/ui/ToolList';
import { getChapter, getProject, projects } from '@/content/projects';
import { sectionHref } from '@/content/site';
import { beliefCluster, beliefMark } from '@/lib/pixels';
import { cx } from '@/lib/cx';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const cover = project.screens[0];
  return {
    title: { absolute: project.meta.title },
    description: project.meta.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.meta.title,
      description: project.meta.description,
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.caption }],
    },
  };
}

const pad = (n) => String(n).padStart(2, '0');

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const chapter = getChapter(project.chapter);
  const next = getProject(project.next);
  const [cover, ...gallery] = project.screens;
  const path = `sachinverma.site/projects/${project.slug}`;

  return (
    <article className="container-page pb-10 pt-12 md:pt-16">
      <Link
        href={sectionHref('projects')}
        className="inline-flex items-center gap-2 text-[15px] font-medium tracking-[0.15px] text-ink/60 transition-colors hover:text-primary"
      >
        <span aria-hidden>←</span> All projects
      </Link>

      {/* Where this sits in my career, what it is, and the facts */}
      <header className="mt-10 grid gap-10 xl:grid-cols-[1fr_420px] xl:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <PixelArt pixels={beliefMark} width={17} height={18} />
            {chapter ? (
              <Link
                href={sectionHref('projects')}
                className="font-poppins text-[13.8px] font-medium tracking-[0.15px] text-journey hover:text-primary"
              >
                Chapter {chapter.number} · {chapter.when} · {chapter.title}
              </Link>
            ) : null}
          </div>
          <h1 className="mt-5 font-serif text-display text-ink/80">{project.name}</h1>
          <p className="mt-4 max-w-[720px] text-lg font-medium leading-[30px] text-ink/70 md:text-xl md:leading-8">
            {project.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Chip key={tag} tone={toneForTag(tag)}>
                {tag}
              </Chip>
            ))}
          </div>
        </div>

        <aside className="self-start rounded-2xl bg-surface p-2 shadow-frame">
          <div className="rounded-[7.14px] bg-canvas px-6 pb-6 pt-4 shadow-float">
            <h2 className="sr-only">Project details</h2>
            <dl className="divide-y divide-line">
              {project.details.map((row) => (
                <div key={row.label} className="grid grid-cols-[84px_1fr] gap-4 py-3">
                  <dt
                    className={cx(
                      'font-poppins text-[13px] font-medium tracking-[0.15px] text-journey',
                      row.tools && 'pt-1.5',
                    )}
                  >
                    {row.label}
                  </dt>
                  <dd className="text-[15px] font-medium leading-6 text-ink/75">
                    {row.tools ? <ToolList tools={row.tools} /> : row.value}
                    {row.note ? <p className="mt-2.5 text-[13.5px] leading-5 text-ink/60">{row.note}</p> : null}
                  </dd>
                </div>
              ))}
            </dl>
            {project.liveUrl ? (
              <Button href={project.liveUrl} size="md" className="mt-4 w-full">
                Visit the live site
                <span aria-hidden>↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </Button>
            ) : null}
          </div>
        </aside>
      </header>

      {/* At a glance */}
      <ul
        aria-label="At a glance"
        className={cx(
          'mt-12 grid grid-cols-2 gap-[23px]',
          project.stats.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
        )}
      >
        {project.stats.map((stat) => (
          <li key={stat.label} className="rounded-[10px] bg-tile px-6 py-6 shadow-tile">
            <p className="font-serif text-[clamp(38px,3.2vw,60px)] leading-none text-primary">{stat.value}</p>
            <p className="mt-3 text-[14.5px] font-medium leading-5 text-ink/65">{stat.label}</p>
          </li>
        ))}
      </ul>

      <ScreenFigure
        screen={cover}
        path={path}
        priority
        sizes="(min-width: 1480px) 1432px, 100vw"
        className="mt-12"
      />

      <div className="mt-20 flex flex-col gap-16 md:mt-24">
        <CaseSection label="The problem" title={project.problem.lead}>
          <ul className="grid gap-[23px] md:grid-cols-3">
            {project.problem.points.map((point, i) => (
              <li key={point} className="flex gap-4 rounded-[10px] bg-tile px-5 py-5 shadow-tile">
                <PixelBadge number={i + 1} className="mt-0.5" />
                <span className="text-base font-medium leading-6 text-ink/75">{point}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection label="What I did" title="The steps I took">
          <ol className="grid gap-[23px] sm:grid-cols-2 xl:grid-cols-4">
            {project.steps.map((step, i) => (
              <li key={step.title} className="flex">
                <PixelCard number={i + 1} title={step.title} body={step.body} className="min-h-[220px] w-full" />
              </li>
            ))}
          </ol>
        </CaseSection>

        <CaseSection label="Decisions that mattered" title="Three choices that shaped it">
          <ul className="grid gap-[23px] lg:grid-cols-3">
            {project.decisions.map((decision, i) => (
              <li key={decision.title} className="rounded-2xl bg-surface p-2 shadow-frame">
                <div className="relative h-full rounded-[7.14px] bg-canvas px-6 pb-14 pt-7 shadow-float">
                  <div className="flex items-center gap-3">
                    <PixelArt pixels={beliefMark} width={17} height={18} />
                    <span className="text-[26px] font-medium leading-none text-pixel">{pad(i + 1)}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-[clamp(24px,1.6vw,30px)] leading-[1.15] text-ink/80">
                    {decision.title}
                  </h3>
                  <p className="mt-3 text-base font-medium leading-7 text-ink/70">{decision.body}</p>
                  <PixelArt
                    pixels={beliefCluster}
                    width={39}
                    height={36}
                    scale={0.6}
                    className="absolute bottom-5 right-6"
                  />
                </div>
              </li>
            ))}
          </ul>
        </CaseSection>

        {gallery.length ? (
          <CaseSection label="Screens" title="A closer look">
            <div className="grid gap-x-[23px] gap-y-12 md:grid-cols-2">
              {gallery.map((screen, i) => {
                // An odd screen out spans both columns, so it asks for an image as wide as the cover's.
                const wide = gallery.length % 2 === 1 && i === gallery.length - 1;
                return (
                  <ScreenFigure
                    key={screen.src}
                    screen={screen}
                    path={path}
                    fit="uniform"
                    sizes={wide ? '(min-width: 1480px) 1432px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                    className={wide ? 'md:col-span-2' : undefined}
                  />
                );
              })}
            </div>
          </CaseSection>
        ) : null}

        <CaseSection label="The result" title={project.status}>
          <ul className="grid gap-[23px] md:grid-cols-2">
            {project.results.map((result) => (
              <li key={result} className="flex items-start gap-4 rounded-[10px] bg-tile px-5 py-5 shadow-tile">
                <span
                  aria-hidden
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-[#d5f6ea] text-sm font-bold text-[#24795d]"
                >
                  ✓
                </span>
                <span className="text-base font-medium leading-6 text-ink/75">{result}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <section className="rounded-[10px] px-6 py-14 text-center shadow-band md:px-16">
          <h2 className="font-poppins text-[13.8px] font-medium tracking-[0.15px] text-journey">
            What it taught me
            {chapter ? <span className="text-ink/45"> · Chapter {chapter.number}</span> : null}
          </h2>
          <p className="mx-auto mt-5 max-w-[900px] font-serif text-[clamp(28px,2.3vw,44px)] leading-[1.2] text-fade-title">
            {project.lesson.title}
          </p>
          <p className="mx-auto mt-5 max-w-[640px] text-lg font-medium leading-[30px] text-ink/70">
            {project.lesson.body}
          </p>
        </section>
      </div>

      <nav
        aria-label="More projects"
        className="mt-20 flex flex-col items-start justify-between gap-8 rounded-[10px] bg-tile px-6 py-8 shadow-tile md:flex-row md:items-center md:px-10"
      >
        {next ? (
          <Link href={`/projects/${next.slug}`} className="group">
            <span className="font-poppins text-[13.8px] font-medium tracking-[0.15px] text-journey">
              Next in my journey
            </span>
            <span className="mt-1 flex items-center gap-3 font-serif text-[clamp(30px,2.1vw,40px)] leading-tight text-ink/80 transition-colors group-hover:text-primary">
              {next.name}
              <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
            <span className="mt-1 block text-[15px] font-medium text-ink/60">{next.lesson.title}</span>
          </Link>
        ) : null}
        <Button href="#contact" className="w-[151px] px-0">
          Contact me
        </Button>
      </nav>
    </article>
  );
}
