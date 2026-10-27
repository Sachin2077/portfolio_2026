import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from '@/components/cards/ProjectCard';
import Chip, { toneForTag } from '@/components/ui/Chip';
import PixelArt from '@/components/ui/PixelArt';
import SectionTitle from '@/components/ui/SectionTitle';
import { projectsIntro } from '@/content/home';
import { chapters, featured, getProject, projectsInChapter } from '@/content/projects';
import { beliefMark } from '@/lib/pixels';
import { cx } from '@/lib/cx';

// The strongest projects, in the order Sachin wants them seen. The first two get full-width cards.
function SelectedWork() {
  const items = featured.map(getProject).filter(Boolean);
  const rest = items.slice(2);

  return (
    <section aria-labelledby="selected-title" className="mt-16">
      <h3 id="selected-title" className="sr-only">
        {projectsIntro.selectedTitle}
      </h3>
      <ul className="grid gap-[23px] md:grid-cols-2 xl:grid-cols-3">
        {items.map((project, i) => {
          const wide = i < 2;
          const lastOdd = !wide && rest.length % 2 === 1 && i === items.length - 1;
          return (
            <li
              key={project.slug}
              className={cx('min-w-0', wide && 'md:col-span-2 xl:col-span-3', lastOdd && 'md:col-span-2 xl:col-span-1')}
            >
              <ProjectCard
                project={project}
                lessonLabel={projectsIntro.cardLessonLabel}
                wide={wide}
                reverse={i === 1}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ChapterHeader({ chapter }) {
  return (
    <header className="grid gap-6 border-b border-line pb-8 lg:grid-cols-[1fr_400px] lg:items-end lg:gap-16">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <PixelArt pixels={beliefMark} width={17} height={18} />
          <span className="font-poppins text-[13.8px] font-medium tracking-[0.15px] text-journey">
            Chapter {chapter.number} · {chapter.when} · {chapter.where}
          </span>
        </div>
        <h4
          id={`chapter-${chapter.id}`}
          className="mt-4 font-serif text-[clamp(30px,2.3vw,44px)] leading-[1.05] text-ink/80"
        >
          {chapter.title}
        </h4>
        <p className="mt-3 max-w-[620px] text-lg font-medium leading-[30px] text-ink/70">{chapter.intro}</p>
      </div>
      <div className="rounded-[10px] px-6 py-5 shadow-band">
        <p className="font-poppins text-[13px] font-medium tracking-[0.15px] text-journey">
          {projectsIntro.chapterLessonLabel}
        </p>
        <p className="mt-2 font-serif text-[clamp(22px,1.6vw,28px)] leading-[1.2] text-fade-title">
          {chapter.lesson}
        </p>
      </div>
    </header>
  );
}

// One compact line per project: a thumbnail, what it is, and what it taught me.
function ProjectRow({ project }) {
  const cover = project.screens[0];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid h-full grid-cols-[92px_1fr] items-center gap-4 rounded-[10px] bg-tile p-3 shadow-tile transition-colors hover:bg-[#eef3ff] sm:grid-cols-[136px_1fr_auto] sm:gap-5 sm:pr-6"
    >
      <span className="relative aspect-[16/10] overflow-hidden rounded-md bg-canvas ring-1 ring-black/5">
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="136px"
          className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="font-serif text-[22px] leading-tight text-ink/80 transition-colors group-hover:text-primary">
            {project.name}
          </span>
          <Chip tone={toneForTag(project.tags[1] ?? project.tags[0])} size="sm">
            {project.tags[1] ?? project.tags[0]}
          </Chip>
        </span>
        <span className="mt-1 block text-[14.5px] font-medium leading-[22px] text-ink/65">{project.oneLiner}</span>
        <span className="mt-1.5 block font-poppins text-[12.5px] font-medium leading-5 text-journey">
          {projectsIntro.cardLessonLabel}: {project.lesson.title}
        </span>
      </span>
      <span
        aria-hidden
        className="hidden text-xl text-ink/35 transition-[color,transform] group-hover:translate-x-1 group-hover:text-primary sm:block"
      >
        →
      </span>
    </Link>
  );
}

// Every project, grouped into career chapters, so the work reads as a story.
function Story() {
  return (
    <section aria-labelledby="story-title" className="mt-[clamp(96px,7.5vw,144px)]">
      <div className="mx-auto max-w-[640px] text-center">
        <h3
          id="story-title"
          className="font-serif text-[clamp(30px,1.98vw,38px)] leading-[1.1] tracking-[0.13px] text-charcoal"
        >
          {projectsIntro.storyTitle}
        </h3>
        <p className="mt-4 text-[15px] font-medium leading-6 text-ink/70">{projectsIntro.storyIntro}</p>
      </div>

      <div className="mt-14 flex flex-col gap-[clamp(64px,5vw,96px)]">
        {chapters.map((chapter) => (
          <section key={chapter.id} aria-labelledby={`chapter-${chapter.id}`}>
            <ChapterHeader chapter={chapter} />
            <ul className="mt-8 grid gap-3 lg:grid-cols-2">
              {projectsInChapter(chapter.id).map((project) => (
                <li key={project.slug} className="min-w-0">
                  <ProjectRow project={project} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-[clamp(96px,8.33vw,160px)]">
      <div className="container-page">
        <SectionTitle id="projects-title" title={projectsIntro.title} intro={projectsIntro.intro} />
        <SelectedWork />
        <Story />
      </div>
    </section>
  );
}
