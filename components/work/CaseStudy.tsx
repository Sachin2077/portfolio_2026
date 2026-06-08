import { Fragment } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { PROJECTS, projectImage } from "@/lib/projects";
import Mockup from "./Mockup";

/** Split a "Label — description" point into a bold title + body for accent-card
 *  rendering (Skills Applied). Returns title:null when there's no " — ". */
function splitLabel(point: string): { title: string | null; text: string } {
  const i = point.indexOf(" — ");
  if (i === -1) return { title: null, text: point };
  return { title: point.slice(0, i), text: point.slice(i + 3) };
}

/**
 * Full case-study page body for a single project. Server component — static,
 * SEO-friendly, no client JS. Reads `data-tone` so accent colors match the
 * project's moon. Renders: top bar → hero → overview → problem → flexible
 * sections → impact → stats → learnings → closing gallery → prev/next nav.
 */
export default function CaseStudy({ project }: { project: Project }) {
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Scope", value: project.scope },
    { label: "Year", value: project.year },
    { label: "Tools", value: project.tools.join(" · ") },
    { label: "Status", value: project.status ?? "" },
  ].filter((m) => m.value);

  const hasActions = Boolean(project.figmaUrl || project.liveUrl);

  // While `imagesPending`, suppress every mockup (text-only case study) — used
  // when client-name screenshots are being blurred/re-uploaded. The image data
  // stays in the project, so clearing the flag brings the gallery straight back.
  const showImages = !project.imagesPending;

  // Mockup sources follow a fixed ImageKit convention so uploads appear
  // automatically: portfolio-projects/<slug>/hero.jpg + gallery-0N.jpg
  // `ver` cache-busts OVERWRITTEN files (see Project.imageVersion); it's only
  // appended to auto-built URLs — explicit per-mockup `src` values carry their
  // own query if they need one.
  const ver = project.imageVersion ? `?updatedAt=${project.imageVersion}` : "";
  const hero = {
    ...project.heroMockup,
    src: project.heroMockup.src ?? (projectImage(project.slug, "hero.jpg", 2000) + ver),
  };
  const gallery = showImages
    ? project.gallery.map((m, i) => ({
        ...m,
        src: m.src ?? (projectImage(project.slug, `gallery-${String(i + 1).padStart(2, "0")}.jpg`, 1400) + ver),
      }))
    : [];

  // Distribute the gallery: one mockup after the Problem, one after a couple of
  // mid sections, and the rest in a closing "selected screens" grid.
  const queue = [...gallery];
  const afterProblem = queue.shift() ?? null;
  const afterSection = project.sections.map((_, i) =>
    i === 1 || i === 3 ? queue.shift() ?? null : null,
  );
  const closing = queue;

  const Actions = ({ atEnd = false }: { atEnd?: boolean }) =>
    hasActions ? (
      <div className={`case-actions${atEnd ? " case-actions--end" : ""}`}>
        {project.liveUrl ? (
          <a className="case-action case-action--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Visit live <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {project.figmaUrl ? (
          <a className="case-action" href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
            View Figma file <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    ) : null;

  return (
    <div className="case" data-tone={project.tone}>
      <header className="case-topbar">
        <Link href="/" className="case-brand">Sachin</Link>
        <Link href="/#moons" className="case-back">
          <span aria-hidden="true">←</span> The Work
        </Link>
      </header>

      <article className="case-body">
        {/* Hero */}
        <section className="case-hero">
          <ul className="case-tags">
            {project.tags.map((t) => (
              <li className="case-tag" key={t}>{t}</li>
            ))}
          </ul>
          <h1 className="case-title">{project.name}</h1>
          <p className="case-tagline">{project.tagline}</p>
          <dl className="case-meta">
            {meta.map((m) => (
              <div className="case-meta-row" key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          <Actions />
        </section>

        {showImages ? <Mockup {...hero} className="case-mockup--break" /> : null}

        {/* Overview */}
        <section className="case-section">
          <h2 className="case-h2"><span className="case-h2-rule" aria-hidden="true" />Overview</h2>
          <div className="case-section-body">
            <p className="case-lede">{project.overview}</p>
          </div>
        </section>

        {/* Problem */}
        <section className="case-section">
          <h2 className="case-h2"><span className="case-h2-rule" aria-hidden="true" />The Problem</h2>
          <div className="case-section-body">
            <p className="case-prose">{project.problem.intro}</p>
            <ul className="case-list">
              {project.problem.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {afterProblem ? <Mockup {...afterProblem} className="case-mockup--break" /> : null}

        {/* Flexible sections */}
        {project.sections.map((s, si) => (
          <Fragment key={si}>
            <section className="case-section">
              <h2 className="case-h2"><span className="case-h2-rule" aria-hidden="true" />{s.title}</h2>
              <div className="case-section-body">
                {s.body ? <p className="case-prose">{s.body}</p> : null}
                {s.points ? (
                  s.variant === "cards" ? (
                    <div className="case-cards">
                      {s.points.map((p, i) => {
                        const { title, text } = splitLabel(p);
                        return (
                          <div className="case-card" key={i}>
                            <span className="case-card-mark" aria-hidden="true">●</span>
                            <div className="case-card-content">
                              {title ? <h3 className="case-card-title">{title}</h3> : null}
                              <p className="case-card-text">{text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ul className="case-list">
                      {s.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  )
                ) : null}
                {s.items ? (
                  <div className="case-items">
                    {s.items.map((it, i) => (
                      <div className="case-item" key={i}>
                        <h3 className="case-item-title">{it.title}</h3>
                        <p className="case-item-body">{it.body}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
            {afterSection[si] ? <Mockup {...afterSection[si]!} className="case-mockup--break" /> : null}
          </Fragment>
        ))}

        {/* Impact */}
        {project.impact.length > 0 ? (
          <section className="case-section">
            <h2 className="case-h2"><span className="case-h2-rule" aria-hidden="true" />Impact</h2>
            <div className="case-section-body">
              <div className="case-cards case-cards--impact">
                {project.impact.map((p, i) => (
                  <div className="case-card" key={i}>
                    <span className="case-card-mark case-card-mark--check" aria-hidden="true">✓</span>
                    <div className="case-card-content">
                      <p className="case-card-text">{p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Stats */}
        <section className="case-section">
          <h2 className="case-h2"><span className="case-h2-rule" aria-hidden="true" />By the Numbers</h2>
          <div className="case-section-body">
            <div className="case-stats">
              {project.stats.map((st, i) => (
                <div className="case-stat" key={i}>
                  <span className="case-stat-value">{st.value}</span>
                  <span className="case-stat-label">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learnings */}
        <section className="case-section">
          <h2 className="case-h2"><span className="case-h2-rule" aria-hidden="true" />What I Learned</h2>
          <div className="case-section-body">
            {project.learned.map((p, i) => (
              <p className="case-prose" key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Closing gallery */}
        {closing.length > 0 ? (
          <section className="case-section">
            <h2 className="case-h2"><span className="case-h2-rule" aria-hidden="true" />Selected Screens</h2>
            <div className="case-section-body">
              <div className="case-gallery">
                {closing.map((m, i) => (
                  <Mockup key={i} {...m} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <Actions atEnd />
      </article>

      {/* Prev / next */}
      <nav className="case-nav" aria-label="More projects">
        <Link className="case-nav-link case-nav-link--prev" href={`/work/${prev.slug}`}>
          <span className="case-nav-dir"><span aria-hidden="true">←</span> Previous</span>
          <span className="case-nav-name">{prev.name}</span>
        </Link>
        <Link className="case-nav-home" href="/#moons">All work</Link>
        <Link className="case-nav-link case-nav-link--next" href={`/work/${next.slug}`}>
          <span className="case-nav-dir">Next <span aria-hidden="true">→</span></span>
          <span className="case-nav-name">{next.name}</span>
        </Link>
      </nav>
    </div>
  );
}
