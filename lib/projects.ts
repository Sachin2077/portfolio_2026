// Work showcase data. Each project is a full case study rendered at
// /work/<slug> (see app/work/[slug]/page.tsx + components/work/CaseStudy.tsx).
// The Moons orbital (components/ui/Moons.tsx) uses `name` as the moon label and
// links to the case-study page. Drop ImageKit URLs into heroMockup.src /
// gallery[].src when the real mockups are ready — layout is unchanged until then.

export type Mockup = {
  /** ImageKit (or any) image URL. When absent, a styled placeholder renders. */
  src?: string;
  alt: string;
  caption?: string;
  /** Render full-bleed wide (hero / feature shots). */
  wide?: boolean;
};

export type Stat = { label: string; value: string };

/** A titled block — used for process steps, key screens, design decisions. */
export type NamedItem = { title: string; body: string };

/** A flexible content section. Renders body → points → items, whichever exist. */
export type Section = {
  title: string;
  body?: string;
  points?: string[];
  items?: NamedItem[];
  /** "cards" renders `points` as an accent card grid (Skills Applied) instead
   *  of a plain bullet list. Each point splits on the first " — " into a bold
   *  title + body. Default (undefined) keeps the plain `.case-list`. */
  variant?: "cards";
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  tags: string[];
  /** slate | emerald | ruby | violet | luminous | terracotta */
  tone: string;

  // Hero meta — any empty value is omitted from the grid.
  role: string;
  client: string;
  scope: string;
  year: string;
  tools: string[];
  status?: string;

  // Body
  overview: string;
  problem: { intro: string; points: string[] };
  sections: Section[];
  impact: string[];
  learned: string[];
  stats: Stat[];

  figmaUrl?: string;
  liveUrl?: string;

  /** When true, CaseStudy suppresses the hero + gallery mockups (renders the
   *  case study text-only). Used while client-name screenshots are being
   *  blurred/re-uploaded — the image data below is kept intact, so flipping
   *  this back to false (or removing it) restores the gallery. */
  imagesPending?: boolean;

  /** Cache-bust token appended (?updatedAt=…) to auto-built image URLs when an
   *  ImageKit file is OVERWRITTEN at the same path — busts ImageKit's
   *  transformed cache + the browser cache so the new upload shows instead of
   *  the stale one. Not needed for first-time uploads to a fresh path. */
  imageVersion?: string;

  heroMockup: Mockup;
  gallery: Mockup[];
};

/**
 * Per-project mockup image URL (ImageKit).
 *
 * Images live in ImageKit under one folder per project, named by slug:
 *   "portfolio -projects/<slug>/hero.jpg"
 *   "portfolio -projects/<slug>/gallery-01.jpg, gallery-02.jpg, …"
 * NOTE: the folder name contains a space ("portfolio -projects"), encoded as
 * %20 below. (If the folder is ever renamed to remove the space, change the
 * path here to "portfolio-projects".)
 *
 * The case-study page builds these URLs automatically (see
 * components/work/CaseStudy.tsx). If a file is missing, the slot shows a styled
 * placeholder and swaps to the real image the moment it's uploaded.
 */
export const IK_BASE = "https://ik.imagekit.io/Sachinvm";
export function projectImage(slug: string, file: string, width = 1600): string {
  return `${IK_BASE}/tr:w-${width},q-75,f-auto/portfolio%20-projects/${slug}/${file}`;
}

export const PROJECTS: Project[] = [
  // ───────────────────────────────────────────── 1 · IntelliLens
  {
    slug: "intellilens",
    name: "IntelliLens",
    tagline:
      "Leading the design of an AI-powered decision-support system that unifies Customer, Marketing, and Brand intelligence for CMOs.",
    tags: ["SaaS Product Design", "Enterprise Dashboard", "AI-Powered Analytics", "Design Lead"],
    tone: "slate",
    role: "Design Lead (UI/UX) — primary client POC",
    client: "Confidential — Enterprise AI & Analytics (under NDA)",
    scope: "Customer Lens & Marketing Lens — research, user journeys, information architecture, design system, and interface design",
    year: "",
    tools: ["Figma"],
    overview:
      "IntelliLens is an AI-powered marketing-intelligence platform that helps CMOs make data-driven decisions across customer analytics, campaign performance, and brand health. I led the design end-to-end and was the primary point of contact with the client throughout the engagement — driving the overall vision and execution across the Customer and Marketing Lenses, with two designers supporting me. I owned everything from research and user flows to the design system, wireframes, and high-fidelity screens, restructuring complex data flows into a highly intuitive interface the client praised directly on delivery. It was one of my largest projects, delivered in under four months.",
    problem: {
      intro:
        "CMOs and marketing leaders were drowning in disconnected data. Customer insights lived in one tool, campaign analytics in another, brand monitoring in a third. The existing platform had the right data but the wrong experience — dense, fragmented, and hard to navigate.",
      points: [
        "Users couldn't move fluidly between customer segments, campaign data, and brand health — each lens felt like a separate product.",
        "Complex analytics (CLTV, propensity modeling, marketing-mix models) were buried under cluttered interfaces with no clear hierarchy.",
        "Decision-makers needed quick answers, but the UX demanded deep system knowledge to extract insight.",
        "The platform lacked a cohesive design language — screens felt inconsistent across modules.",
      ],
    },
    sections: [
      {
        title: "My Role & Ownership",
        body: "I led the project from a design perspective and was the primary point of contact with the client from kickoff to handoff. Two designers supported me, but I drove the overall vision and execution — owning research, user flows, the design system, wireframes, high-fidelity screens, and the broader UX strategy. This wasn't a visual facelift; it was a full product revamp of how enterprise users interact with AI-generated insight.",
        points: [
          "Customer Lens — Audience Builder, Customer Segmentation, Propensity Modeling, Customer Lifetime Value (CLTV), Customer Journey Analysis.",
          "Marketing Lens — Marketing Mix Modeling, Campaign Monitoring & Performance (MROI), Spend Optimization, Scenario Planning, Content Scoring.",
        ],
      },
      {
        title: "Process",
        items: [
          {
            title: "Understanding the Domain",
            body: "Before touching a design tool, I spent time in the CMO's world — the decisions they make, the data they rely on, where existing tools fail them. I studied the platform's architecture (Google Cloud, BigQuery ML & Vertex AI) to understand what data existed and how it flowed between lenses.",
          },
          {
            title: "Mapping the User Journey",
            body: "I mapped the end-to-end journey for each lens. The critical insight: these aren't two separate journeys — a CMO moves from 'who are my best customers' (Customer Lens) to 'how do I reach them efficiently' (Marketing Lens). I designed the transitions between lenses to reflect that natural decision flow.",
          },
          {
            title: "Information Architecture",
            body: "The biggest challenge was density — surfacing AI-driven insight (propensity scores, predicted CLTV, attribution) without overwhelming the user. I set a clear hierarchy: Level 1, an executive scorecard ('what's happening'); Level 2, drill-down dashboards ('why is it happening'); Level 3, interactive tools — simulators and builders ('what should I do about it').",
          },
          {
            title: "Interface Design",
            body: "Every screen followed one principle: insight first, data second. Instead of leading with raw tables and charts, each view opens with the key takeaway, then lets users drill into the supporting data.",
          },
        ],
      },
      {
        title: "Key Screens — Customer Lens",
        items: [
          {
            title: "Audience Builder",
            body: "A rule-based interface for building segments with business logic. Users define criteria, see real-time audience counts, and get an executive summary of the cohort — demographics, behavior, predicted value.",
          },
          {
            title: "Customer Segmentation Dashboard",
            body: "A unified view of all segments with profiling data and segment-migration tracking across time. It answers: how are my customer groups shifting, and which are growing or shrinking?",
          },
          {
            title: "Customer Lifetime Value (CLTV)",
            body: "An interactive breakdown of predicted lifetime value by segment, with comparative views so marketers can benchmark cohorts and design targeted loyalty programs.",
          },
          {
            title: "Customer Journey Analysis",
            body: "A flow-based visualization that surfaces hidden behavior patterns across touchpoints — drop-off points, engagement peaks, conversion bottlenecks — so teams personalize at the right moments.",
          },
        ],
      },
      {
        title: "Key Screens — Marketing Lens",
        items: [
          {
            title: "Marketing Mix Modeling (MMM)",
            body: "Actual vs. predicted sales alongside the contribution of each marketing activity — showing the relative weight of paid, organic, email, and social in a clear, comparative layout.",
          },
          {
            title: "Spend Optimization",
            body: "Optimal budget distribution across activities, projected as a before/after comparison — current spend vs. recommended spend — so the value of optimization is immediately visible.",
          },
          {
            title: "Scenario Planning Simulator",
            body: "A dynamic sandbox for 'what-if' budget scenarios — sliders for inputs, instant visual feedback on projected sales and ROI.",
          },
          {
            title: "Campaign Performance Monitoring (MROI)",
            body: "A scannable performance dashboard — KPI cards up top, trend lines for context, and drill-down into any campaign or channel.",
          },
        ],
      },
      {
        title: "Design Decisions That Mattered",
        items: [
          {
            title: "Connected Lenses, Not Silos",
            body: "I introduced contextual cross-references — viewing a high-value segment, users jump directly to that segment's campaign performance. This mirrors how CMOs actually think.",
          },
          {
            title: "Progressive Disclosure for Complex Analytics",
            body: "Dense outputs like propensity modeling and MMM are layered — summary first, then supporting visualizations, then raw tables. Users control their own depth.",
          },
          {
            title: "Consistent Component System",
            body: "A shared system across both lenses — data cards, chart containers, filter bars, KPI indicators — so the experience feels unified even across functionally different modules.",
          },
          {
            title: "Actionable Dashboards",
            body: "Every dashboard has a 'so what' layer — not just 'here's your data' but 'here's what it means and what to do next,' with advisory prompts built into the interface.",
          },
        ],
      },
    ],
    impact: [
      "Led the end-to-end design of the platform's Customer and Marketing Lenses, driving vision and execution with two designers supporting.",
      "Delivered one of my largest engagements in under four months, as the primary point of contact throughout.",
      "Designed 15+ unique screens spanning dashboards, simulators, builders, and journey maps.",
      "Created a unified design system that brought consistency to a previously fragmented product.",
      "Improved information hierarchy so complex AI outputs (CLTV, MMM contributions, propensity scores) became accessible to non-technical marketing leaders.",
      "Built a highly intuitive, user-friendly interface that earned direct appreciation from the client on delivery.",
    ],
    learned: [
      "This project taught me to design for decision-makers, not data analysts. The platform's users aren't exploring data for fun — they need answers fast and need to trust them. Every choice had to reduce cognitive load while keeping analytical depth.",
      "Leading a small team while staying the primary client contact sharpened how I hold a single product vision across other hands — and it deepened how I design for AI-powered products, where the interface isn't just displaying data, it's translating machine-learning outputs into human-understandable insight.",
    ],
    stats: [
      { label: "Role", value: "Design Lead · Primary Client POC" },
      { label: "Team", value: "Led + 2 supporting designers" },
      { label: "Duration", value: "< 4 months" },
      { label: "Screens Designed", value: "15+" },
      { label: "Platform Type", value: "Enterprise SaaS (AI-powered)" },
      { label: "User Type", value: "CMOs & Marketing Leaders" },
      { label: "Key Features", value: "Dashboards · Simulators · Journey Maps · Audience Builders" },
    ],
    heroMockup: { alt: "IntelliLens executive scorecard", caption: "Executive scorecard — Customer Lens overview", wide: true },
    gallery: [
      { alt: "Audience Builder", caption: "Audience Builder — real-time segment counts" },
      { alt: "Customer Segmentation dashboard", caption: "Segmentation dashboard — migration over time" },
      { alt: "CLTV breakdown", caption: "Customer Lifetime Value by segment" },
      { alt: "Marketing Mix Modeling", caption: "Marketing Mix Modeling — channel contribution" },
      { alt: "Scenario Planning simulator", caption: "Scenario Planning — what-if budget sandbox" },
    ],
  },

  // ───────────────────────────────────────────── 2 · Zarah
  {
    slug: "zarah",
    name: "Zarah",
    tagline:
      "Designing an intelligent workspace that replaces fragmented tools with one AI-driven command center for travel agencies.",
    tags: ["SaaS Product Design", "AI-Powered Platform", "End-to-End Product Design", "B2B Travel Tech"],
    tone: "emerald",
    role: "Product Designer (UI/UX) — Sole Designer",
    client: "Mate Tech",
    scope: "End-to-end — feature listing, user flows, IA, wireframes, design system, high-fidelity prototyping",
    year: "",
    tools: ["Figma"],
    overview:
      "Zarah is an AI-powered travel assistant for agencies, DMCs, and MICE organizers. As the sole designer, I created the entire product from scratch — the UI/UX, user journeys, workflows, and the overall product experience — taking it from a requirements document to production-ready screens: defining feature priorities, mapping user flows, building the information architecture, and designing every interface from the AI chat assistant to the email-intelligence dashboard.",
    problem: {
      intro:
        "Travel agencies operate across a mess of disconnected tools. Client conversations live in Gmail, documents are scattered across drives, itineraries are built in spreadsheets. There's no single place where an agent sees a client's full picture — documents, emails, history, preferences — and acts on it. Zarah was built to collapse all of this into one AI-powered workspace.",
      points: [
        "Agents waste time switching between 4–5 tools just to answer one client question.",
        "Critical information gets buried in email threads nobody re-reads.",
        "Client handoffs between team members mean context is lost.",
        "Nothing connects what a client asked for (emails) with what was delivered (documents, itineraries).",
        "Decision-making is slow because insight is scattered, not synthesized.",
      ],
    },
    sections: [
      {
        title: "My Role & Ownership",
        body: "I was the only designer on this project — everything from initial feature analysis to the final production-ready prototype went through me.",
        points: [
          "Feature Listing & Prioritization — analyzed the PRD, identified MVP features, structured a clear product hierarchy.",
          "User Flow Mapping — end-to-end flows for auth, chat, documents, clients, email intelligence, and settings.",
          "Information Architecture — navigation, content hierarchy, and how the AI assistant connects to every module.",
          "Wireframing — low-fidelity layouts to validate structure before visual design.",
          "Design System — a component library (inputs, cards, modals, sidebars, chat bubbles, filter bars, tables) across 6 modules.",
          "High-Fidelity UI — production-ready screens for every feature, state, and edge case.",
          "Interactive Prototyping — a click-through prototype connecting all major journeys for handoff and review.",
        ],
      },
      {
        title: "Process",
        items: [
          {
            title: "Deconstructing the PRD",
            body: "I broke the PRD into 6 core modules (Authentication, Dashboard, Chat Assistant, Document Management, Client Management, Email Intelligence), 3 user roles (Admin, Agent, Client-future), and feature dependencies. That shaped the priority: build the data layers (documents, clients, emails) first, then the AI layer (chat) that sits on top.",
          },
          {
            title: "User Flow Architecture",
            body: "I mapped every critical path — authentication, chat, document management, client management, email intelligence, settings. The key insight: the AI chat isn't a separate feature, it's the connective tissue. Every module feeds the chat, and I designed the navigation and data architecture to reflect that.",
          },
          {
            title: "Information Architecture",
            body: "A structure that felt simple despite being data-dense: a sidebar (New Chat, Documents, Clients, Emails, Settings), a persistent top bar, and a three-level content pattern (list/overview → detail with AI insight → action states) used across every module so the product stays predictable.",
          },
          {
            title: "Wireframing",
            body: "Low-fidelity layouts solved the hard problems first — balancing the chat thread with contextual source panels, layering AI actions onto a familiar inbox, showing a full client picture without a data dump, and making document upload/search/linking feel fast at scale.",
          },
          {
            title: "Design System",
            body: "A component library built from scratch — inputs, cards, tables, modals, navigation, notifications, filter bars, and AI-specific components (chat bubbles with source attribution, summary cards, action-item lists) — plus tokens for color, typography, spacing, and elevation.",
          },
          {
            title: "High-Fidelity UI Design",
            body: "Every screen production-ready, not concept art: all states (empty, loading, error, success), responsive considerations, real travel content instead of lorem ipsum, defined interaction patterns, and developer-ready specs.",
          },
        ],
      },
      {
        title: "Key Screens & Design Decisions",
        items: [
          {
            title: "Dashboard",
            body: "A launchpad, not a data dump — quick access to a new chat, recent conversations, notifications, and module shortcuts. The goal: get agents to their next action in under 3 seconds.",
          },
          {
            title: "AI Chat Assistant",
            body: "The core of the product — a conversational interface with contextual awareness indicators. When the AI references a document or email, the source is visually attributed. A context panel beside the thread shows exactly which documents, client groups, and emails the AI is pulling from, so users can verify without leaving the conversation.",
          },
          {
            title: "Document Management",
            body: "Clean upload, search, filter, inline preview, and linking. Documents aren't just stored — they're linked to client groups via a lightweight tag-based action, so agents actually use it instead of skipping it.",
          },
          {
            title: "Client Management",
            body: "A CRM-lite of client groups — members, linked documents, linked emails, and an AI-generated communication summary at the top of each group. That summary was the single most valuable screen: it kills the 'let me go back and read 47 emails' problem.",
          },
          {
            title: "Email Intelligence (Smart Inbox)",
            body: "A Gmail-synced inbox with filters (All, Linked, Unlinked, Important) and AI actions on every thread — summarize, extract travel info, detect action items, generate recaps, auto-link to a client group — surfaced as a contextual toolbar inside the thread, not a separate screen.",
          },
          {
            title: "Settings",
            body: "Profile and notification preferences, designed with extensibility in mind so future additions (agency branding, API integrations, CRM connections) slot in without a redesign.",
          },
        ],
      },
      {
        title: "Design Challenges & How I Solved Them",
        items: [
          {
            title: "AI Transparency",
            body: "Users must trust AI answers. Solution: source attribution on every response — visual indicators of which documents, emails, or client data informed the answer, click-through to the original.",
          },
          {
            title: "Information Density",
            body: "Each module is data-rich. Solution: progressive disclosure everywhere — summary first, details on demand — with a consistent overview → detail → action hierarchy so users always know where they are.",
          },
          {
            title: "Discoverable, Non-Intrusive AI",
            body: "AI actions are the differentiator but can't scream on every screen. Solution: contextual surfacing — they appear where they're relevant (email thread, client detail, chat) — visible but not competing with the primary content.",
          },
          {
            title: "Two Roles, Different Permissions",
            body: "Admins have full control, agents limited. Solution: role-based UI adaptation — same layout and navigation, permission-gated actions simply absent for agents rather than grayed-out and frustrating.",
          },
        ],
      },
      {
        title: "Skills Applied",
        variant: "cards",
        points: [
          "Product thinking — translating a PRD into a designable product structure.",
          "Feature prioritization — MVP scope and logical sequencing.",
          "User-flow design — 6 distinct, interconnected journeys.",
          "Information architecture for a multi-module SaaS product.",
          "Design-system creation — a scalable component library from scratch.",
          "Visual/UI design — production-quality interfaces with all states.",
          "Interaction design — hover, active, loading, empty, error states.",
          "AI/UX design — trust, transparency, and discoverability patterns.",
          "Prototyping, responsive design, and accessibility (ADA) considerations.",
        ],
      },
    ],
    impact: [
      "Created an entire SaaS product from scratch — UI/UX, user journeys, workflows, and the full product experience, PRD to production-ready screens.",
      "Created 6 core modules with full user flows, all states, and a unified design system.",
      "Built a scalable component library supporting the MVP and future expansion.",
      "Designed AI-specific UX patterns (source attribution, contextual actions, smart summaries) that make AI features trustworthy and usable.",
      "Delivered production-ready prototypes used directly for development handoff.",
    ],
    learned: [
      "Zarah was where I leveled up from 'designing screens' to 'designing a product.' Working solo from PRD to prototype forced decisions at every level — not just what something looks like, but whether it should exist, where it lives, how it connects, and what happens when things go wrong.",
      "The biggest lesson: AI features are only as good as the trust they build. If users can't verify where an insight came from, they won't use it. Designing transparency into every AI interaction was the most important decision in the product.",
    ],
    stats: [
      { label: "Modules Designed", value: "6 — Dashboard, Chat, Docs, Clients, Emails, Settings" },
      { label: "Design Coverage", value: "End-to-end (PRD → Prototype)" },
      { label: "Role", value: "Sole Designer" },
      { label: "Platform", value: "Web Application" },
      { label: "User Roles", value: "Admin + Agent" },
      { label: "Product Type", value: "AI-Powered B2B SaaS" },
    ],
    heroMockup: { alt: "Zarah AI chat assistant", caption: "AI Chat Assistant with source-attribution context panel", wide: true },
    gallery: [
      { alt: "Zarah dashboard", caption: "Dashboard — the launchpad" },
      { alt: "Document management", caption: "Document Management — upload, preview, link" },
      { alt: "Client management", caption: "Client group — AI communication summary" },
      { alt: "Email intelligence", caption: "Email Intelligence — AI actions in-thread" },
    ],
  },

  // ───────────────────────────────────────────── 3 · docX
  {
    slug: "docx",
    name: "docX",
    tagline:
      "Revamping a legal-intelligence platform from a cluttered document viewer into an AI-driven workspace for creating, organizing, and navigating complex legal documents.",
    tags: ["Product Revamp", "Legal Tech", "AI-Powered Platform", "Enterprise SaaS", "Design System", "Brand Guidelines"],
    tone: "ruby",
    role: "Product Designer (UI/UX)",
    client: "Telecom Industry",
    scope: "Full application redesign — 20+ screens, user-journey mapping, interactive prototype, design system, brand guidelines",
    year: "",
    tools: ["Figma"],
    imageVersion: "1780906510783",
    overview:
      "docX is an AI-powered legal document-management platform that helps legal teams create, organize, and extract insight from complex documents. I was assigned an existing product and made responsible for revamping its UI/UX end-to-end — redefining the user journeys and workflows, building a complete design system, applying the 60-30-10 design principle for visual balance, and lifting the interface up to industry standard. The redesign significantly improved the overall user experience, turning a basic document viewer into an intelligent legal workspace — and the client was extremely satisfied with the final outcome.",
    problem: {
      intro:
        "The existing docX had one fundamental issue: it looked and behaved like a tool from 2015 trying to sell AI capabilities from 2025. For a product that promises to make legal work 'effortless,' the interface created friction at every step.",
      points: [
        "Visually dated — basic layouts, inconsistent spacing, no clear hierarchy; it didn't communicate the sophistication of the AI behind it.",
        "Flat, confusing navigation — users couldn't move easily between documents, AI conversations, and draft creation.",
        "No clear user journey — a collection of disconnected pages rather than a guided experience.",
        "No design system — every screen was built independently, with no shared components or patterns.",
        "A visual identity that didn't reflect the product's positioning as an intelligent, modern legal tool.",
      ],
    },
    sections: [
      {
        title: "My Role",
        body: "I was assigned an existing product and owned its complete UI/UX revamp — visual design, interaction design, usability, and the foundational systems underneath — with the goal of bringing it up to industry standard.",
        points: [
          "20+ redesigned screens covering every user-facing workflow.",
          "A complete design system — reusable components, consistent patterns, scalable architecture.",
          "Brand guidelines — visual identity, color system, typography rules, iconography standards.",
          "User-journey mapping — how legal professionals move from login to insight extraction.",
          "A fully clickable interactive prototype connecting all major workflows for review and handoff.",
        ],
      },
      {
        title: "Process",
        items: [
          {
            title: "Auditing the Existing Product",
            body: "I went through every screen, documenting what was broken — layout inconsistencies, unclear navigation, hierarchy problems, missing states — and where users got lost. The audit revealed the product wasn't missing features; it was missing structure. The AI (chat, analysis, draft generation) was buried under a surface that made it hard to find and harder to trust.",
          },
          {
            title: "Defining the User Journey",
            body: "I restructured the app around four core workflows — the four things legal professionals actually do: New Chat, Templates, Document Selection, and Draft Creation. Every screen and component was designed to serve one of these journeys.",
          },
          {
            title: "Building the Design System",
            body: "From scratch: navigation, document cards (status, metadata, quick actions), chat components (message bubbles, AI response cards, source citations), form elements, data tables, modals, status indicators, and a clear button hierarchy — plus tokens tuned for legal content (long-form typography, spacing grid, elevation). It wasn't just consistency, it was speed: new screens assemble from existing parts.",
          },
          {
            title: "Establishing Brand Guidelines",
            body: "A comprehensive document — logo usage and clear space, primary/secondary palettes governed by a disciplined 60-30-10 ratio (dominant, secondary, accent) for visual balance, typography specs, iconography style, imagery guidelines, and do's & don'ts — so anyone extending the product later maintains the standard.",
          },
          {
            title: "High-Fidelity Design & Prototyping",
            body: "Every screen production-ready with all states (empty, loading, error, success). The interactive prototype connected all four core flows so stakeholders could experience the redesign as if it were live.",
          },
        ],
      },
      {
        title: "Key Screens & Design Decisions",
        items: [
          {
            title: "Login & Onboarding",
            body: "Redesigned from a basic form on a stock photo to a branded entry point that communicates what docX is before the user even logs in.",
          },
          {
            title: "AI Chat Interface",
            body: "The centerpiece. Legal professionals ask about their documents in natural language and receive AI analysis — with clear user/AI distinction, source attribution on every answer (click through to the clause or document), contextual actions, and a document-reference panel. Trust indicators weren't a nice-to-have; they were the most critical requirement.",
          },
          {
            title: "Template System",
            body: "A structured browsing experience that shows template previews and structural outlines — not just titles in a list — so professionals see what they're getting before committing, especially for complex documents.",
          },
          {
            title: "Document Selection & Management",
            body: "A reimagining of browsing, filtering, and access: visual document cards with status and metadata at a glance, multi-criteria filtering, inline preview, and clear linking between documents, conversations, and drafts.",
          },
          {
            title: "Draft Creation",
            body: "A guided workflow from parameter definition through AI generation to review and refinement — structured enough to be efficient, flexible enough for the unpredictability of legal drafting.",
          },
        ],
      },
      {
        title: "Before vs After",
        items: [
          {
            title: "Before",
            body: "Dated visual design with no brand identity; flat navigation with no flow guidance; disconnected screens with no shared components; AI features buried under a confusing interface; no design system.",
          },
          {
            title: "After",
            body: "A modern, professional identity aligned with the product's positioning; four clear user journeys; a unified design system across all screens; AI surfaced prominently with trust-building source attribution; brand guidelines for long-term consistency; an interactive prototype ready for handoff.",
          },
        ],
      },
    ],
    impact: [
      "Revamped 20+ screens across the entire application.",
      "Created a complete design system — reusable components, consistent patterns, scalable for future features.",
      "Delivered brand guidelines that standardize the product's visual identity for ongoing development.",
      "Redesigned 4 core user workflows with clear journey mapping.",
      "Built a fully interactive prototype for stakeholder review and developer handoff.",
      "Transformed a basic document viewer into a modern AI-powered legal workspace.",
      "Significantly improved the overall user experience — the client was extremely satisfied with the final outcome.",
    ],
    learned: [
      "docX taught me the difference between redesigning screens and redesigning a product. Screens are surfaces you can improve in a day. A revamp means rethinking structure, defining journeys, building systems, and establishing rules that outlast your involvement — the design system and brand guidelines mattered as much as the screens.",
      "The other lesson: AI in a legal context demands a higher standard of trust than anywhere else. Legal professionals make decisions with real consequences — an insight shown without its source is useless, or worse, dangerous. Designing for trust ran through every screen.",
    ],
    stats: [
      { label: "Screens Designed", value: "20+" },
      { label: "Project Type", value: "Full Application Revamp" },
      { label: "Deliverables", value: "Hi-Fi Screens · Design System · Brand Guidelines · Prototype" },
      { label: "Platform", value: "Enterprise SaaS (Legal Tech)" },
      { label: "Core Workflows", value: "4 — AI Chat, Templates, Doc Selection, Draft Creation" },
      { label: "Key Feature", value: "AI-Powered Legal Document Intelligence" },
    ],
    heroMockup: { alt: "docX AI chat interface", caption: "AI Chat — natural-language legal analysis with source attribution", wide: true },
    gallery: [
      { alt: "docX before and after", caption: "Before → after — the visual transformation", wide: true },
      { alt: "Template system", caption: "Template System — previews before commitment" },
      { alt: "Document management", caption: "Document Selection — cards, filters, inline preview" },
      { alt: "Draft creation", caption: "Draft Creation — guided AI workflow" },
    ],
  },

  // ───────────────────────────────────────────── 4 · InkPot
  {
    slug: "inkpot",
    name: "InkPot",
    tagline:
      "Designing a web app that turns keywords into publish-ready blog posts — a design exploration around making AI content creation feel intuitive, fast, and controllable.",
    tags: ["Concept Project", "AI Writing Tool", "Web App Design", "Design Exploration"],
    tone: "violet",
    role: "Product Designer (UI/UX) — Sole Designer",
    client: "Self-initiated concept",
    scope: "End-to-end concept — landing page, authentication, dashboard, blog-creation flow, content editor, analytics",
    year: "2024",
    tools: ["Figma"],
    status: "Concept / Design Exploration",
    overview:
      "InkPot is an AI-powered blog-writing platform I designed as a concept project — exploring how to make AI content generation feel intuitive, fast, and controllable. I designed the complete journey: a marketing landing page, an onboarding flow, a dashboard with usage analytics, a step-by-step blog creator, and a content editor with AI-suggested images.",
    problem: {
      intro:
        "The brief was simple: design a web app that generates blog posts from keywords or themes, focusing on the creation process, input mechanisms, and how generated content is presented and edited. Rather than a quick wireframe exercise, I designed a full product. The design question I chose to explore: how do you give users enough control over AI-generated content to make it useful, without making creation feel like filling out a form?",
      points: [
        "Too simple — just a text box and a 'generate' button → low-quality, generic output.",
        "Too complex — endless settings and configuration before you can write anything → high friction.",
      ],
    },
    sections: [
      {
        title: "What I Designed",
        items: [
          {
            title: "Marketing Landing Page",
            body: "The entry point, built around 'Create smarter, faster.' It leads with the benefit (not the technology), previews an actual generated post on the hero so users see output quality before signing up, highlights multi-language support (20+ languages) early, and places 'No credit card required' next to the CTA to cut signup friction.",
          },
          {
            title: "Authentication Flow",
            body: "Clean login/signup with email and social auth, designed to be fast — getting users into the dashboard, not collecting unnecessary information.",
          },
          {
            title: "Dashboard",
            body: "The hub. Usage analytics up top as four stat cards (Words Generated, Blogs Created, Paragraphs Written, Time Saved) — '63 hours saved' is more persuasive than any feature description. Below, blogs as visual cards with two view modes, and a prominent '+' card as the dominant create action.",
          },
          {
            title: "Blog Creator — The Core Flow",
            body: "Where the challenge lives. I broke creation into structured input: Step 1 configuration (language, Regular vs. Creative level); Step 2 content inputs (title, tag-based keywords, sub-headings); Step 3 'Start Writing.' Breaking input into meaningful chunks gives the AI direction and the user control — without making them write the content themselves.",
          },
          {
            title: "Content Output & Editor",
            body: "After generation, a left panel shows the formatted article (headings, sections, body — not a wall of text) and a right sidebar offers AI-curated image suggestions to insert directly. Save / Copy actions and content stats (words, headings, paragraphs, links) sit top-right. It's an editor, not just a display — refine before saving, never leave to find visuals.",
          },
        ],
      },
      {
        title: "Design Thinking & Key Decisions",
        items: [
          {
            title: "Structured Input > Open Prompt",
            body: "Most AI writing tools give a blank box. InkPot breaks input into title, keywords, and sub-headings — directing the AI while keeping the experience simple. The most important decision in the project.",
          },
          {
            title: "Analytics as Motivation",
            body: "Dashboard stats (words generated, time saved) serve a psychological purpose — quantifying the benefit. A user who sees '63 hours saved' is less likely to churn than one who just sees old blogs.",
          },
          {
            title: "Visual Content Cards Over Text Lists",
            body: "Previous blogs are shown as visual cards with thumbnails, making the dashboard feel like a creative workspace rather than a file manager.",
          },
          {
            title: "Image Suggestions Built Into the Flow",
            body: "AI-suggested images live in the output screen, removing the friction every blogger hits — finding relevant visuals after writing.",
          },
        ],
      },
      {
        title: "User Flow Summary",
        body: "Landing Page → Sign Up / Login → Dashboard (stats + previous blogs) → '+' to create → Blog Creator (language, creativity, title, keywords, sub-headings) → Start Writing → Output screen (edit, select images, view stats) → Save → back to Dashboard.",
      },
      {
        title: "Skills Applied",
        variant: "cards",
        points: [
          "Product thinking — a brief turned into a full product with marketing, onboarding, creation, and management.",
          "Landing-page design — conversion-focused layout with clear value proposition and CTA hierarchy.",
          "Dashboard design — usage data visualization combined with content management.",
          "Form/input design — a multi-step creation flow with structured inputs for AI guidance.",
          "Editor/output design — content presentation with inline editing and contextual image suggestions.",
          "Visual design — a cohesive aesthetic with a purple accent system, clean typography, gradient backgrounds.",
          "User-flow design — a complete journey from discovery to publication.",
        ],
      },
    ],
    impact: [],
    learned: [
      "InkPot was a concept project, but it taught me something real: the hardest part of designing AI tools isn't the AI — it's the input. How you structure what the user gives the AI determines the quality of what comes back. A blank text box produces mediocre results; a structured input flow (title + keywords + sub-headings) produces content that's actually usable. This now influences how I approach every AI-powered product I design.",
    ],
    stats: [
      { label: "Screens Designed", value: "Landing · Auth · Dashboard · Blog Creator · Content Editor" },
      { label: "Project Type", value: "Concept / Design Exploration" },
      { label: "Platform", value: "Web Application" },
      { label: "Focus Area", value: "AI Content-Creation UX" },
      { label: "Year", value: "2024" },
    ],
    heroMockup: { alt: "InkPot content editor", caption: "Content Output & Editor — article + AI image suggestions", wide: true },
    gallery: [
      { alt: "InkPot landing page", caption: "Landing page — 'Create smarter, faster'" },
      { alt: "InkPot dashboard", caption: "Dashboard — usage analytics + blog cards" },
      { alt: "InkPot blog creator", caption: "Blog Creator — structured multi-step input" },
    ],
  },

  // ───────────────────────────────────────────── 5 · FinGen
  {
    slug: "fingen",
    name: "FinGen",
    tagline:
      "Designing a financial-planning platform that turns complex data into conversational insight — with a role-based access model that solved a real security problem.",
    tags: ["SaaS Product Design", "FinTech", "AI Chatbot", "Role-Based Access", "Shipped to Production"],
    tone: "luminous",
    role: "Product Designer (UI/UX)",
    client: "Client engagement via Nebula9.ai",
    scope: "High-fidelity mockups, user-journey mapping, interactive prototype, design system — across 2 user roles (Admin + User)",
    year: "",
    tools: ["Figma"],
    status: "Shipped to production",
    overview:
      "FinGen is an FP&A (Financial Planning & Analysis) platform with a conversational AI chatbot that lets teams analyze complex financial data through natural-language queries. I designed the product from scratch — the UI/UX foundation and the user flows — working from incomplete and still-evolving requirements, which meant helping shape the product vision itself as much as the interface. Across two roles, Admin and User, I mapped the journeys, built a consistent design system, and solved a critical security challenge around data-upload permissions through a role-based access model I proposed to the client.",
    problem: {
      intro:
        "As businesses grow, so does their financial data. Spreadsheets multiply, reports get buried, and getting a useful insight — the kind that drives a decision — takes too long and too much technical skill. FinGen was built so anyone on the team can have a conversation with their financial data and get insight in seconds.",
      points: [
        "Financial data was growing in complexity faster than the team could analyze it.",
        "Traditional methods (spreadsheets, manual reporting) didn't scale — more data meant more time, not more insight.",
        "Security was a real concern: sensitive data needed controlled access, but the workflow had no clear permissions model.",
        "Teams needed insight fast, but extracting it required deep technical knowledge of the data structures.",
      ],
    },
    sections: [
      {
        title: "My Role",
        body: "I was responsible for the complete product experience — not just the screens, but the thinking behind them — and I built it from scratch.",
        points: [
          "Worked from incomplete, still-evolving requirements — filling the gaps by helping shape the product vision rather than waiting for a finished brief.",
          "Created the platform from scratch — the UI/UX foundation and the end-to-end user flows.",
          "Mapped user journeys for both roles, defining goals, actions, and decision points at each step.",
          "Used AI tools to help define and validate the user-journey flows.",
          "Organized features by priority so the most critical capabilities were immediately accessible.",
          "Followed the client's brand guidelines for a visually consistent product.",
          "Designed 20+ high-fidelity screens across 2 user roles.",
          "Built an interactive prototype stakeholders could use as if the platform were real.",
          "Went through 3 review cycles before final approval and production handoff.",
        ],
      },
      {
        title: "Process",
        items: [
          {
            title: "Working From Evolving Requirements",
            body: "Requirements were incomplete and still moving, so I couldn't lean on a finished brief. I worked from what existed — partial requirements, technical notes, feature lists — and filled the gaps by helping shape the product vision: taking a position on what each feature should be, why it mattered, and who it served. That up-front sense-making is how I arrived at a clear critical path despite a moving target.",
          },
          {
            title: "User Journey Mapping",
            body: "I mapped both roles. Admin: login → upload data → configure data sets → manage access → monitor usage → maintain integrity. User: login → view data sets → open the chatbot → ask in natural language → receive AI insight → create and compare scenarios → export. The realization: these aren't two products — the Admin prepares the data environment, the User extracts value; every Admin action enables a User action.",
          },
          {
            title: "Feature Prioritization & Organization",
            body: "I organized features by frequency of use — daily actions got prime real estate, while setup tasks (data upload, configuration) were accessible but not competing for attention. The conversational chatbot and scenario builder were the core experience.",
          },
          {
            title: "High-Fidelity Design & Prototyping",
            body: "Every screen production-ready, following the client's brand guidelines with a component system for consistency. The interactive prototype let stakeholders click through complete workflows before a line of code was written.",
          },
        ],
      },
      {
        title: "Key Screens",
        items: [
          {
            title: "Admin — Data Upload & Management",
            body: "A controlled environment for uploading datasets, managing metadata, and configuring what's available for analysis — with clear status indicators (uploaded, processing, ready) so Admins always know the state of their data.",
          },
          {
            title: "Admin — User Access Management",
            body: "A clean, table-based interface to assign roles and control who can do what, with the ability to modify permissions without leaving the overview.",
          },
          {
            title: "User — Conversational Chatbot",
            body: "The heart of the platform. Users ask in natural language ('What was our Q3 revenue growth vs. Q2?') and get AI insight with supporting visualizations — structured response cards with charts, tables, and highlighted metrics, not text dumps.",
          },
          {
            title: "User — Scenario Builder",
            body: "An interactive tool for financial 'what-if' scenarios — adjusting variables and seeing projected outcomes — designed to make complex modeling feel like a conversation, not a spreadsheet exercise.",
          },
          {
            title: "User — Dashboard & Insights Overview",
            body: "The landing experience — relevant financial summaries, recent activity, and quick paths to the chatbot and scenario tools, so a user gets value within 10 seconds of logging in.",
          },
        ],
      },
      {
        title: "The Design Decision That Mattered Most",
        body: "Role-based access wasn't just a UI choice — it was a product decision I proposed to the client. They needed users to work with sensitive financial data, but couldn't give everyone upload access; unrestricted upload was a security risk. My proposal: two distinct roles, designed as two visually connected interfaces — same design system and language, different capabilities.",
        items: [
          {
            title: "Admin",
            body: "Can upload, manage, and configure financial datasets — controls what data exists in the system and who can access it.",
          },
          {
            title: "User",
            body: "Can query, analyze, and create scenarios using the data Admins make available — cannot upload or modify raw data. This separation solved the security problem cleanly: a controlled data pipeline, full analytical power without compromising integrity.",
          },
        ],
      },
      {
        title: "Consistent Design System",
        body: "With 20+ screens across 2 roles, consistency was critical. I built a shared system — cards, tables, inputs, navigation, chatbot elements — so the same information always looks the same. Users learn the pattern once, then recognize it everywhere.",
      },
    ],
    impact: [
      "20+ screens designed across 2 distinct user roles (Admin + User).",
      "Interactive high-fidelity prototype built for stakeholder review and developer handoff.",
      "3 review cycles completed — iterated on feedback each round until the product was right.",
      "Shipped to production — client approved the designs and the product went live.",
      "Client described the interface as 'much cleaner and user-friendly' than their previous approach.",
      "Security problem resolved through the role-based access model I proposed — a design decision that became a core product feature.",
    ],
    learned: [
      "FinGen taught me that design decisions aren't just visual — they're architectural. The role-based access model wasn't chosen for aesthetics; it was a structural decision that solved a real security problem and shaped how the whole product was built.",
      "It also taught me to design under ambiguity. With incomplete, shifting requirements I couldn't wait for certainty — I had to take a position on what the product should be and shape that vision as I designed, then adjust as things firmed up. Building from scratch under those conditions made me a more decisive designer.",
    ],
    stats: [
      { label: "Screens Designed", value: "20+" },
      { label: "User Roles", value: "2 — Admin + User" },
      { label: "Review Cycles", value: "3" },
      { label: "Status", value: "Shipped to Production" },
      { label: "Platform Type", value: "FP&A SaaS (AI-powered)" },
      { label: "Key Feature", value: "Conversational AI Chatbot for Financial Data" },
    ],
    heroMockup: { alt: "FinGen conversational chatbot", caption: "Conversational Chatbot — natural-language financial insight", wide: true },
    gallery: [
      { alt: "FinGen dashboard", caption: "Dashboard & Insights — value in 10 seconds" },
      { alt: "FinGen scenario builder", caption: "Scenario Builder — financial what-ifs" },
      { alt: "FinGen admin data management", caption: "Admin — data upload & management" },
      { alt: "FinGen access management", caption: "Role-based access — the security model" },
    ],
  },

  // ───────────────────────────────────────────── 6 · Liberty India
  {
    slug: "liberty-india",
    name: "Liberty India",
    tagline:
      "Redesigning a luxury India DMC's website from the ground up — a full UI/UX rethink, designed in Figma and built into a fast, editorial, brand-true frontend on a perfect SEO foundation.",
    tags: ["Luxury Travel", "Website Redesign", "UI/UX Design", "Frontend Development", "Figma-to-Code", "Next.js"],
    tone: "terracotta",
    role: "UI/UX Designer & Frontend Developer",
    client: "Liberty India — luxury DMC & MICE specialist (European markets)",
    scope: "End-to-end design + frontend — full UI/UX in Figma, a design system, Figma-to-code, reusable components, editorial content, custom itinerary route maps, performance & SEO, contact-form integration, deployment to the client's domain",
    year: "2026",
    tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS", "ImageKit", "Vercel", "Resend", "Claude Code"],
    status: "Live in production",
    overview:
      "Liberty India is a luxury DMC whose goal is to present India as a destination to discerning travelers — but their existing website, built in Webflow, wasn't communicating either India as a destination or the Liberty India brand. I led a complete redesign: I owned the full UI/UX, designed every section in Figma, built a design system and refined the brand guidelines, then converted the design into a production Next.js frontend — raising the bar on content, custom visuals, and performance — before handing off to a developer for further implementation. The result is an editorial-grade website that feels like a travel magazine, loads fast, scores a perfect 100/100 on SEO, and is deployed on the client's own domain.",
    problem: {
      intro:
        "Liberty India's objective is to present India as a destination — but the website standing between them and that goal was working against them. Built in Webflow, it looked rough and outdated: weak UI/UX, no modern experience, and itineraries that weren't featured in any meaningful way. It communicated neither India as a destination nor the Liberty India brand, and because it felt visually unappealing, it was barely used. The brief: rebuild it into an editorially rich, visually immersive, fast, and discoverable site that finally does both the destination and the brand justice.",
      points: [
        "Outdated, rough visual design — the legacy Webflow build undercut a luxury brand before a word was read.",
        "Weak UI/UX — no modern, considered experience and no clear hierarchy to guide a visitor.",
        "Off-brand and off-message — the site communicated neither India as a destination nor the Liberty India brand.",
        "Itineraries weren't featured effectively — the most persuasive content a DMC has was buried instead of showcased.",
        "Net result: the site looked unappealing and went largely unused — a storefront nobody wanted to walk into.",
      ],
    },
    sections: [
      {
        title: "My Role & Ownership",
        body: "I owned the complete redesign and the frontend build — the full UI/UX in Figma, a design system, refined brand guidelines, and a section-by-section Figma-to-code implementation — then handed the project to a developer for further implementation. A design-engineering role: I made both the visual and the implementation decisions.",
        points: [
          "Complete redesign — completely revamped the entire website from the ground up, replacing the outdated Webflow build.",
          "User research & website strategy — grounded the redesign in the audience (European luxury travelers) and a clear strategy for what the site needed to achieve.",
          "User journey mapping & information architecture — mapped how a discerning traveler moves from first impression to inquiry, and restructured the navigation and content hierarchy around it.",
          "Feature planning & enhancements — defined and prioritized the features that make a DMC site persuasive — itineraries, services, and editorial — and put them front and centre.",
          "Full UI/UX in Figma — designed every section end to end before a line of code.",
          "Design system — built a proper, component-driven design system from scratch.",
          "Brand guidelines — refined the brand's visual language so the site finally looked like Liberty India.",
          "Component architecture — reusable, composable components so the site scales without a rebuild.",
          "Editorial content design — long-form luxury travel writing (Heritage, Culture, Architecture, Nature) in a high-end magazine register.",
          "Custom data visualization — bespoke route maps for 15 itineraries on a custom India base map.",
          "Performance & SEO engineering — image, rendering, and structure optimization for a perfect SEO score.",
          "Functional integration — a contact form delivering inquiries reliably to the client's inbox.",
          "Handoff & deployment — handed off to a developer for further implementation; deployed on the client's domain.",
        ],
      },
      {
        title: "Process",
        items: [
          {
            title: "Stakeholder Meeting & Requirement Gathering",
            body: "The project kicked off with stakeholder meetings and structured requirement-gathering sessions — aligning on the objective (present India as a destination and re-establish the Liberty India brand), the scope, and exactly what the old Webflow site was failing to do.",
          },
          {
            title: "Design in Figma — Component & Content Architecture",
            body: "I executed the design starting in Figma, establishing both the component architecture and the content architecture up front. A luxury content site grows fast, so I built reusable components instead of one-off layouts — the clearest example is the SectionOverview pattern (a full-width ImageKit slideshow with a floating white content card) designed once and reused across seven service sub-pages.",
          },
          {
            title: "Section-by-Section Content Design",
            body: "I designed and developed the content for every section, treating each like a magazine feature — long-form Heritage, Culture, Architecture, and Nature in a high-end register with generous spacing and strong hierarchy — and reviewed the work regularly with the stakeholders and the client to keep it on-brief at every step.",
          },
          {
            title: "Custom Itinerary Route Maps",
            body: "The most distinctive piece. Rather than text lists, I designed custom route maps for all 15 itineraries — built as an HTML + SVG overlay on a shared India base map and rendered programmatically (via Playwright), so every itinerary got a consistent, bespoke-looking map without hand-drawing 15 graphics.",
          },
          {
            title: "Performance Optimization & SEO Engineering",
            body: "I treated performance and SEO as first-class design constraints — serving optimized imagery through ImageKit and structuring markup and metadata so search engines could fully read the content. The result: a perfect 100/100 SEO score on PageSpeed Insights and 94% overall on DebugBear.",
          },
          {
            title: "Functional Layer, Handoff & Deployment",
            body: "I integrated the contact form with Resend so inquiries reach the client's inbox reliably. The site was deployed on the client's own domain, and I handed the project off to a developer for further implementation.",
          },
        ],
      },
      {
        title: "Key Sections & Design Decisions",
        items: [
          {
            title: "Home",
            body: "The first impression and the credibility test — editorial imagery, restrained typography, and generous space that signal 'bespoke luxury, not package tour' before a word is read.",
          },
          {
            title: "About Us",
            body: "The trust-builder. A luxury DMC lives or dies on perceived credibility, so this section establishes authority and warmth without corporate boilerplate.",
          },
          {
            title: "Heritage (and Culture, Architecture, Nature)",
            body: "The editorial heart. Key decision: treat these as magazine features, not web pages — long-form copy in a high-end register with a typographic hierarchy that makes a dense page feel premium. This is what separates the site from a template.",
          },
          {
            title: "Our Services",
            body: "Key decision: one reusable pattern instead of seven bespoke pages. The SectionOverview component — a full-width ImageKit slideshow with a floating white card — gives all seven service sub-pages one cohesive, premium identity and makes the section trivial to extend.",
          },
          {
            title: "Itineraries",
            body: "Key decision: show the journey, don't list it. Each of the 15 itineraries pairs with a custom route map plotted on an India base map — turning a list of stops into a visual story across the country. The single most differentiating choice in the project.",
          },
          {
            title: "Contact",
            body: "The conversion point — effortless and trustworthy, with the form wired to deliver inquiries straight to the client's inbox via Resend, closing the loop from browsing to in touch.",
          },
        ],
      },
      {
        title: "Design Challenges & How I Solved Them",
        items: [
          {
            title: "Design Fidelity at Scale",
            body: "Small fidelity losses compound into a cheap-feeling site. Solution: a disciplined Figma-to-code workflow — read the file directly, diff, confirm, implement, commit one section at a time — keeping the live site faithful at every step.",
          },
          {
            title: "Luxury Imagery vs. Performance",
            body: "Image weight is the number-one killer of load speed. Solution: route all imagery through ImageKit and engineer the rendering so the site stays fast — proven by a perfect SEO result and strong performance despite the visual density.",
          },
          {
            title: "Content Density Without Clutter",
            body: "Heritage, culture, architecture, and nature carry a lot of text. Solution: editorial layout discipline — strong hierarchy, generous whitespace, a deliberate reading rhythm. Dense in substance, calm in feel.",
          },
          {
            title: "15 Itineraries, Bespoke — Without 15 Manual Designs",
            body: "Solution: a systematized approach — a shared India base map with an HTML + SVG overlay, rendered programmatically so every itinerary got a polished route map from the same engine. Bespoke-looking results, system-level efficiency.",
          },
          {
            title: "Keeping Scope Honest",
            body: "On a section-by-section build, it's tempting to 'improve things while you're in there.' Solution: a DESIGN_NOTES.md for out-of-scope observations — agreed polish got implemented, everything else got logged for the client. Clean scope, clean commits, no surprises.",
          },
        ],
      },
      {
        title: "Skills Applied",
        variant: "cards",
        points: [
          "UX strategy & research — audience and competitive research, user-journey mapping, information architecture, and feature planning driving a full website revamp.",
          "Frontend development — production Next.js / TypeScript / Tailwind implementation of an editorial design.",
          "Design-to-code translation — a faithful, disciplined Figma-to-code workflow with traceable, section-level commits.",
          "Component architecture — reusable patterns (e.g. SectionOverview) spanning multiple pages.",
          "Editorial content design & copywriting — long-form luxury travel writing and magazine-style layout.",
          "Custom data visualization — bespoke SVG itinerary route maps generated at scale.",
          "Performance engineering & technical SEO — image optimization and structure yielding a perfect PageSpeed SEO score.",
          "Integration & deployment — contact-form delivery via Resend; production hosting on Vercel.",
          "Responsive design — layouts that hold up across viewport sizes.",
        ],
      },
    ],
    impact: [
      "Delivered a complete, production luxury-travel frontend — owned end-to-end from Figma to live site.",
      "Built a reusable component system that keeps the site consistent and trivial to extend (one pattern powering seven service pages).",
      "Designed and shipped 15 custom itinerary route maps, turning itineraries into persuasive visual narratives.",
      "Achieved a perfect 100/100 SEO score on Google PageSpeed Insights and a 94% DebugBear score.",
      "Authored magazine-grade editorial content across four destination themes, elevating the brand's perceived quality.",
      "Maintained clean, traceable delivery (one commit per section) and an honest scope log throughout.",
    ],
    learned: [
      "Liberty India was where I stopped thinking of design and development as two separate jobs. Owning the frontend from Figma to production meant every visual decision was also an engineering decision — and the best results came from holding both at once.",
      "The biggest lesson: on a luxury product, fidelity and restraint are the design. The difference between a site that justifies a five-figure journey and one that doesn't isn't a flashy feature — it's typographic discipline, generous space, fast load times, and content that reads like it was written by someone who cares. Getting the unglamorous fundamentals right is what lets the glamorous parts shine.",
    ],
    stats: [
      { label: "Role", value: "Sole Frontend Designer & Developer" },
      { label: "Scope", value: "End-to-end (Figma → Deploy)" },
      { label: "Platform", value: "Next.js — deployed on client's domain" },
      { label: "Custom Itinerary Maps", value: "15" },
      { label: "Reusable Pattern Reach", value: "1 component → 7 service pages" },
      { label: "SEO Score (PageSpeed)", value: "100 / 100" },
      { label: "Overall Score (DebugBear)", value: "94%" },
      { label: "Duration", value: "3 months" },
      { label: "Audience", value: "European luxury travelers" },
    ],
    heroMockup: { alt: "Liberty India home hero", caption: "Home — the editorial first impression", wide: true },
    gallery: [
      { alt: "Heritage editorial spread", caption: "Heritage — a magazine feature, not a web page" },
      { alt: "Our Services slideshow card", caption: "Our Services — the reusable SectionOverview pattern" },
      {
        alt: "Itinerary route map",
        caption: "Itineraries — a custom route map per journey",
        // Re-uploaded 2026 — version query busts ImageKit's CDN cache for the
        // overwritten file (same path would otherwise serve the stale image).
        src: `${projectImage("liberty-india", "gallery-03.jpg", 1400)}?updatedAt=1780386227596`,
      },
      { alt: "Contact section", caption: "Contact — Resend-wired inquiry form" },
    ],
  },
];
