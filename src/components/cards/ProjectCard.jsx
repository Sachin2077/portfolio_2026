import Image from 'next/image';
import Link from 'next/link';
import Chip, { toneForTag } from '@/components/ui/Chip';
import PixelArt from '@/components/ui/PixelArt';
import ToolList from '@/components/ui/ToolList';
import { toolsOf } from '@/content/projects';
import { beliefCluster, beliefMark } from '@/lib/pixels';
import { cx } from '@/lib/cx';

// A project in the belief-card frame: its cover in a window, the one-line story, and the lesson it left.
// `wide` lays it out side by side for a featured project; `reverse` puts the cover on the right.
export default function ProjectCard({ project, lessonLabel, wide = false, reverse = false }) {
  const cover = project.screens[0];
  const tools = toolsOf(project);

  return (
    <article className="group h-full rounded-2xl bg-surface p-2 shadow-frame transition-transform duration-300 hover:-translate-y-1">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View the ${project.name} project`}
        className={cx(
          'flex h-full flex-col overflow-hidden rounded-[7.14px] bg-canvas shadow-float',
          wide && (reverse ? 'lg:grid lg:grid-cols-[1fr_1.25fr]' : 'lg:grid lg:grid-cols-[1.25fr_1fr]'),
        )}
      >
        <div className={cx('flex flex-col', wide && reverse && 'lg:order-2')}>
          <div aria-hidden className="flex h-9 items-center gap-2 border-b border-line bg-tile px-4">
            <span className="size-2 bg-[#ff8ca8]" />
            <span className="size-2 bg-[#ffd166]" />
            <span className="size-2 bg-[#7ee7c8]" />
            <span className="ml-3 min-w-0 truncate font-pixel text-[13px] text-ink/45">
              sachinverma.site/projects/{project.slug}
            </span>
          </div>
          <div
            className={cx(
              'relative aspect-[16/10] overflow-hidden border-b border-line bg-tile',
              wide && 'lg:aspect-auto lg:min-h-[400px] lg:flex-1 lg:border-b-0',
            )}
          >
            <Image
              src={cover.src}
              alt={`${project.name}: ${cover.caption}`}
              fill
              sizes={wide ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw'}
              className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div
          className={cx(
            'flex flex-1 flex-col px-6 pb-7 pt-7 md:px-[30px]',
            wide && (reverse ? 'lg:order-1 lg:border-r lg:border-line' : 'lg:border-l lg:border-line'),
            wide && 'lg:justify-center lg:px-10',
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PixelArt pixels={beliefMark} width={17} height={18} />
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Chip key={tag} tone={toneForTag(tag)}>
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          <h3
            className={cx(
              'mt-6 font-serif leading-[1.05] text-ink/80',
              wide ? 'text-[clamp(34px,2.6vw,48px)]' : 'text-[clamp(30px,2vw,38px)]',
            )}
          >
            {project.name}
          </h3>
          <p className="mt-2.5 max-w-[540px] text-[17px] font-medium leading-[27px] text-ink/70">
            {project.oneLiner}
          </p>
          {tools.length ? <ToolList tools={tools} compact className="mt-5" /> : null}

          <div className="mt-6 rounded-[10px] bg-tile px-4 py-3.5 shadow-tile">
            <p className="font-poppins text-[12.5px] font-medium tracking-[0.15px] text-journey">
              {lessonLabel}
            </p>
            <p className="mt-1 font-serif text-[19px] leading-[1.3] text-night">{project.lesson.title}</p>
          </div>

          <div className={cx('flex items-end justify-between pt-7', !wide && 'mt-auto')}>
            <span className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-[15px] font-medium tracking-[0.15px] text-white/90 shadow-btn-primary transition-colors group-hover:bg-[#5c8bfc]">
              Read case study
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
            <PixelArt pixels={beliefCluster} width={39} height={36} />
          </div>
        </div>
      </Link>
    </article>
  );
}
