import ScrollVideoSection from "@/components/ScrollVideoSection";
import LandBackground from "@/components/LandBackground";

/* Land background image (ImageKit). Placeholder: 5767×3850 soil/grass/sky.
   `tr:w-2000,q-75,f-auto` = ImageKit width/quality/auto-format transform
   (matches Core/Sky), ~634 KB webp since it's never shown larger than the
   viewport. Rendered into a tall cover box (see .land-pan-img) so it pans
   full-height regardless of source aspect. The `?updatedAt` query busts
   ImageKit's + the browser's cache — bump it whenever you replace the image
   at this path so the new version loads instead of the stale one. */
const LAND_IMAGE_URL =
  "https://ik.imagekit.io/Sachinvm/tr:w-2000,q-75,f-auto/portfolio-scroll-anim-land/soil-grass-sky-background.jpg?updatedAt=1780311134530";

export function SkyLayer() {
  const milestones = [
    {
      when: "2024",
      title: "UI/UX Designer · Intern",
      desc: "Nebula9.ai — my first seat. Turning problems into structured Figma solutions, end to end. Remote.",
    },
    {
      when: "2024–25",
      title: "UI/UX Designer · Business Analysis",
      desc: "Nebula9.ai, full-time. Shipped IntelliLens, docX and FinGen — enterprise AI products from problem to Figma to developer handoff. Hybrid.",
    },
    {
      when: "2025 — Now",
      title: "Co-Founder · Zarah AI LLP",
      desc: "The studio behind Zarah and Liberty India (plus the InkPot concept). Bridging travel ops and tech — AI itineraries, product journeys, the voice of the customer. Hybrid, Gurugram.",
    },
  ];
  const capabilities = [
    "End-to-end SaaS frontends — auth, dashboards, payments.",
    "Luxury marketing & brand sites — performance-tuned, SEO-aware.",
    "Brand voice & content design — Taj/Oberoi register.",
    "Prompt engineering for Claude Code — structured shippable briefs.",
  ];
  return (
    <section className="frame-sky" id="sky" data-screen-label="03 Sky">
      <div className="sky-stage">
        <div className="sky-video-bg" aria-hidden="true">
          <ScrollVideoSection
            baseUrl="https://ik.imagekit.io/Sachinvm/portfolio-scroll-anim-sky"
            frameCount={145}
            runwayVh={2}
            scrub={1}
            imageKitTransform="tr:q-75,f-auto"
            fillParent
            triggerSelector=".frame-sky"
          />
        </div>

        <div className="sky-grid">
          <div className="sky-marker">
            <span className="sky-marker-num">03</span>
            <span className="sky-marker-rule" />
            <span>From Altitude</span>
          </div>

          <div className="sky-head">
            <h2 className="sky-heading">
              What I&apos;ve built<br />
              <em>so far.</em>
            </h2>
            <p className="sky-intro-text">
              Two years, three seats — a UI/UX internship, a full-time design
              role at Nebula9.ai, then co-founding Zarah AI LLP. From
              understanding the problem to shipping what holds up.
            </p>
          </div>

          <div className="sky-body">
            <div className="sky-timeline">
              <div className="sky-section-label">
                <span className="sky-section-rule" />
                <span>Track Record</span>
              </div>
              <div className="sky-track" aria-hidden="true">
                <div className="sky-line" />
              </div>
              <ol className="sky-stops">
                {milestones.map((m, i) => (
                  <li className="sky-stop" key={i}>
                    <span className="sky-stop-dot" aria-hidden="true" />
                    <div className="sky-stop-when">{m.when}</div>
                    <h3 className="sky-stop-title">{m.title}</h3>
                    <p className="sky-stop-desc">{m.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="sky-capabilities">
              <div className="sky-section-label">
                <span className="sky-section-rule" />
                <span>Capabilities</span>
              </div>
              <ol className="sky-cap-list">
                {capabilities.map((c, i) => (
                  <li className="sky-cap" key={i}>
                    <span className="sky-cap-num">{String(i + 1).padStart(2, "0")}</span>
                    <p className="sky-cap-text">{c}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandLayer() {
  const trio = [
    {
      label: "Design",
      body: "Product UI, brand systems, motion. Figma-native — blank canvas to handoff.",
    },
    {
      label: "Build",
      body: "React, Next.js, TypeScript, Tailwind. Growing fluency in Prisma, Supabase, the database layer beneath.",
    },
    {
      label: "Lead",
      body: "Co-founder, client-facing. Translator between design intent and engineering reality.",
    },
  ];
  const exploring = [
    "Spline",
    "React Three Fiber",
    "Local AI · Ollama",
    "Stable Diffusion",
    "Auth & Databases",
  ];
  return (
    <section className="frame-land" id="land" data-screen-label="02 Land">
      <div className="land-stage">
        {/* Scroll-coupled vertical image. A single tall image pans upward as you
            scroll through the pinned section, reading as the climb from the core
            up to solid ground. Scroll-driven (like Core/Sky) so it belongs. */}
        <div className="land-bg" aria-hidden="true">
          <LandBackground src={LAND_IMAGE_URL} scrub={1} direction="down" flip dim={0.55} />
        </div>

        {/* Legibility overlay — vertical fade + subtle vignette */}
        <div className="land-overlay" aria-hidden="true" />

        {/* Composed editorial screen — every block visible at once so it
            reads at any scroll position. One gentle entrance, then it holds. */}
        <div className="land-content">
          <div className="land-marker">
            <span className="land-marker-num">02</span>
            <span className="land-marker-rule" />
            <span>On Solid Ground</span>
          </div>

          <div className="land-split">
            {/* Left — the intro statement */}
            <div className="land-intro-col">
              <h2 className="land-heading">
                Hi, I&apos;m <em>Sachin.</em>
              </h2>
              <p className="land-intro">
                Designer turning developer. Co-founder of <em>Zarah AI LLP</em> —
                I lead design, and write the code that holds it up.
              </p>
            </div>

            {/* Right — practice + currently exploring, stacked */}
            <div className="land-detail-col">
              <div className="land-practice">
                <div className="land-section-label">
                  <span className="land-section-rule" />
                  <span>Practice</span>
                </div>
                <ol className="land-rows">
                  {trio.map((t, i) => (
                    <li className="land-row" key={i}>
                      <span className="land-row-num">{String(i + 1).padStart(2, "0")}</span>
                      <div className="land-row-body">
                        <h3 className="land-row-title">{t.label}</h3>
                        <p className="land-row-desc">{t.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="land-explore">
                <div className="land-section-label">
                  <span className="land-section-rule" />
                  <span>Currently Exploring</span>
                </div>
                <ul className="land-chips">
                  {exploring.map((c, i) => (
                    <li className="land-chip" key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoreLayer() {
  const values = [
    {
      title: "Design as Storytelling",
      body: "I don't make screens. I build journeys you can feel.",
    },
    {
      title: "Craft, Then Tools",
      body: "Hand-built first. AI second. Polish without intent is just shine.",
    },
    {
      title: "Curiosity as Compass",
      body: "Tolkien, R3F, brand systems. Same instinct, different clothes.",
    },
  ];
  return (
    <section className="frame-core" id="core" data-screen-label="01 Core">
      <div className="core-stage">
        <div className="core-video-bg" aria-hidden="true">
          <ScrollVideoSection
            baseUrl="https://ik.imagekit.io/Sachinvm/portfolio-scroll-anim"
            frameCount={240}
            runwayVh={2}
            scrub={1}
            imageKitTransform="tr:q-75,f-auto"
            fillParent
            triggerSelector=".frame-core"
          />
        </div>

        <div className="core-grid">
          <div className="core-marker">
            <span className="core-marker-num">01</span>
            <span className="core-marker-rule" />
            <span>The Core</span>
          </div>

          {/* Heading block spans the full width */}
          <div className="core-head">
            <h2 className="core-heading">
              Every creator has a <em>core.</em>
            </h2>
            <p className="core-subhead">This is mine.</p>
          </div>

          {/* 2-column split: paragraph LEFT, principles RIGHT */}
          <div className="core-split">
            <div className="core-text">
              <p className="core-lede">
                <span className="core-lede-lead">Heat. Pressure. What survives it.</span>
                {" "}A core is what&apos;s left when everything soft has burned away. Mine is three principles—not
                style choices, but the kind that hold true long after trends have passed.
              </p>
            </div>

            <ol className="core-points">
              {values.map((v, i) => (
                <li className="core-point" key={i}>
                  <span className="core-point-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="core-point-body">
                    <h3 className="core-point-title">{v.title}</h3>
                    <p className="core-point-desc">{v.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
