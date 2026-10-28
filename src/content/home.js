// Copy for the home page, section by section, in the order a visitor scrolls.
// Voice: professional and precise, one person addressing one reader. Skills and judgment lead; AI appears
// only as a tool for automating repetitive work.

export const hero = {
  greeting: "Hi, I'm Sachin Verma",
  // Rendered as one line: the accent part in brand blue, the rest in ink.
  headline: { accent: 'Plan | Design |', rest: 'Build' },
  body: 'Every project starts with a clear plan. I design and deliver digital products and websites, from research and information architecture to polished, production-ready interfaces.',
  cta: { label: 'My projects', href: '#projects' },
  sceneAlt:
    'Pixel-art city at night. Sachin sits on a rooftop with his laptop, and a white cat sits beside him.',
};

export const tagline = {
  title: 'Designing ideas into reality, one pixel at a time',
  stats: '2+ years in UI/UX design · 10+ clients · 3 live websites',
  avatarAlt: 'Pixel-art avatar of Sachin with pink hair, a cap, round glasses and a hoodie',
};

export const about = {
  label: 'About me',
  heading: 'I studied computer science and found my work in design.',
  body: 'I am a UI/UX designer based in Gurugram, India, and co-founder and Head of Design at Zarah AI LLP, a studio serving travel and hospitality businesses. I lead projects from research and information architecture to final interfaces and design systems, working with engineering teams on products and taking websites through to launch. I use AI tools to automate repetitive production work, which keeps my focus on the decisions that shape the product.',
  cta: { label: 'View my journey', href: '#journey' },
};

// "What I believe": the four beliefs from the Values mockup in Figma.
export const beliefs = {
  title: 'What I believe',
  items: [
    {
      title: 'Find the decision first',
      body: 'Data is only useful when it supports a decision. I start by identifying what the user needs to decide, then design every screen toward it.',
      image: '/images/figma/belief-decision.png',
    },
    {
      title: 'Show where the answer came from',
      body: 'Users trust what they can verify, so I design AI interfaces that show the source behind every answer.',
      image: '/images/figma/belief-sources.png',
    },
    {
      title: 'Shape what goes in',
      body: 'The quality of an AI’s output depends on its input, so I design the input experience as carefully as the results.',
      image: '/images/figma/belief-input.png',
    },
    {
      title: 'Keep scope honest',
      body: 'When I identify work outside the agreed brief, I document it for the client rather than absorbing it silently. The client decides, and the scope stays transparent.',
      image: '/images/figma/belief-scope.png',
    },
  ],
};

// Journey cards, oldest first. Image framing comes from the Figma timeline (Frame 55).
export const journey = {
  title: 'My Journey',
  intro: 'My education and experience, from my first design work to my current role.',
  steps: [
    {
      title: 'Curiosity Begins',
      when: '2020 to 2024 · BML Munjal University',
      body: 'Studied computer science and IT, where my interest turned to interface design and how people use technology.',
      image: '/images/figma/journey-01-curiosity.png',
    },
    {
      title: 'Learning & Building',
      when: '2022 · Cyberaegis',
      body: 'Summer role as a front-end developer and designer. I designed web application layouts in Figma and worked with developers through implementation.',
      image: '/images/figma/journey-02-learning.png',
    },
    {
      title: 'Internship Experience',
      when: '2024 · Nebula9.ai',
      body: 'Joined a generative AI startup as a design intern, contributing to its first design system and AI dashboards.',
      image: '/images/figma/journey-03-internship.png',
    },
    {
      title: 'First Full-Time Role',
      when: '2024 · Nebula9.ai',
      body: 'Promoted within six months to UI/UX Designer and Business Analyst, designing AI products for finance, legal and marketing teams.',
      image: '/images/figma/journey-04-fulltime.png',
    },
    {
      title: 'Bigger Impact',
      when: '2025 · Nebula9.ai',
      body: 'Led user research and usability testing, created the brand guidelines the company adopted, and helped secure three partnerships.',
      image: '/images/figma/journey-05-impact.png',
    },
    {
      title: 'Co-Founder & Head of Design',
      when: '2025 to now · Zarah AI LLP',
      body: 'Co-founded a studio serving travel and hospitality businesses. I set the design direction and lead each project from strategy to launch.',
      image: '/images/figma/journey-06-cofounder.png',
    },
  ],
  next: {
    title: 'What’s Next?',
    body: 'I am drawn to ambitious products and teams that care about craft. If you are building something, I would welcome a conversation.',
    cta: { label: 'Get in touch', href: '#contact' },
    image: '/images/figma/journey-07-whats-next.png',
    imageAlt:
      'Pixel-art Sachin sits on a cliff with his laptop, looking out over a city and a river at sunset.',
  },
};

export const projectsIntro = {
  title: 'Projects',
  intro: 'Selected work first, followed by every project across three chapters of my career.',
  selectedTitle: 'Selected work',
  storyTitle: 'Career chapters',
  storyIntro: 'Every project in chronological order, with the key learning from each.',
  chapterLessonLabel: 'Key learning from this chapter',
  cardLessonLabel: 'Key learning',
};

export const scope = {
  title: 'Scope of work',
  intro: 'My areas of expertise, the principles behind my work, and the process I follow on every project.',
  areas: [
    {
      title: 'UI/UX design for AI tools',
      body: 'Interfaces for AI products where people ask questions, review results and act on them, together with the rules and structure underneath.',
      proof: 'fingen',
    },
    {
      title: 'Websites, from design to launch',
      body: 'Every page designed in Figma, then a Next.js build I lead from structure to launch, with performance and search visibility treated as part of the design.',
      proof: 'liberty-india',
    },
    {
      title: 'Design systems and brand guidelines',
      body: 'Shared components that keep every screen consistent, and brand guidelines that preserve colour and typography long after handoff.',
      proof: 'edro',
    },
    {
      title: 'Research and usability testing',
      body: 'I map how people move through a task, test designs with users, and run A/B tests when two directions are equally strong.',
      proof: 'excellilens',
    },
  ],
  traitsTitle: 'How I work',
  traits: [
    {
      title: 'A plan before the pixels',
      body: 'Structure, scope and user flows are settled before visual design begins. A shared plan prevents costly changes later.',
      proof: 'zarah',
    },
    {
      title: 'Efficient by design',
      body: 'I use AI tools to automate repetitive production tasks such as implementation, asset sourcing and image variations. Strategy, structure and every design decision remain mine.',
      proof: 'inspiration-india',
    },
    {
      title: 'Attention to detail',
      body: 'Quality lives in the details: spacing, alignment and hierarchy. I review them in Figma and again in the browser before anything ships.',
      proof: 'liberty-india',
    },
    {
      title: 'Learning what the work requires',
      body: 'When a project requires expertise beyond design, I acquire it. On BookUnitedHotels, that meant configuring the server to meet a payment gateway’s security requirements.',
      proof: 'bookunitedhotels',
    },
    {
      title: 'Collaborative leadership',
      body: 'I work closely with engineers, clients and fellow designers. On ExcelliLens, I led two designers across 62+ screens built on one shared component system.',
      proof: 'excellilens',
    },
    {
      title: 'Value beyond the screen',
      body: 'Value is not always a new feature. On FinGen, my most valuable contribution was a rule beneath the interface, not a screen.',
      proof: 'fingen',
    },
  ],
  stepsTitle: 'My process',
  stepsIntro:
    'Changes cost little in design and a great deal in code, so I resolve the critical decisions early.',
  steps: [
    {
      title: 'Discovery',
      body: 'I learn about the business and the people it serves, then document the scope so we agree before design begins.',
    },
    {
      title: 'Audit',
      body: 'I review the current site or product screen by screen and, where possible, speak with the people who use it.',
    },
    {
      title: 'Structure',
      body: 'User flows and wireframes come before colour and typography. This is where roles, permissions and content priorities are defined.',
    },
    {
      title: 'Design and validation',
      body: 'I design the interface and build a clickable Figma prototype. Users and the client test it, and I iterate until it holds up.',
    },
    {
      title: 'Handoff and delivery',
      body: 'For products, engineering teams build from my specifications and prototypes. For websites, I lead the build through to launch.',
    },
    {
      title: 'Launch readiness',
      body: 'I verify performance, search setup and security before launch. On BookUnitedHotels, this included hardening the server for payment gateway approval.',
    },
  ],
  toolsTitle: 'Toolkit',
  toolsIntro: 'The tools I rely on across planning, design, delivery and automation.',
  // Logos live in public/images/tools. `badge` marks products that share their maker's logo;
  // `large` gives fine-line marks a little more room. A `note` on a regular group shows under its tiles.
  tools: [
    {
      label: 'Plan and design',
      note: 'Where every project begins, before any code is written.',
      items: [
        { name: 'Notion', logo: 'notion.svg' },
        { name: 'Figma', logo: 'figma.svg' },
        { name: 'Canva', logo: 'canva.png' },
        { name: 'Magnific', logo: 'magnific.svg' },
      ],
    },
    {
      // Claude Code writes this code, so the group names what the sites run on rather than a hand-coding skill.
      label: 'Web stack',
      note: 'I define the architecture and review every screen; Claude Code handles implementation.',
      items: [
        { name: 'Next.js', logo: 'nextjs.svg' },
        { name: 'React', logo: 'react.svg' },
        { name: 'Tailwind CSS', logo: 'tailwindcss.svg' },
      ],
    },
    {
      label: 'Data and cloud',
      note: 'The infrastructure behind Zarah AI products. I understand how each layer fits together.',
      items: [
        { name: 'PostgreSQL', logo: 'postgresql.svg' },
        { name: 'Prisma', logo: 'prisma.svg' },
        { name: 'AWS', logo: 'aws.png' },
      ],
    },
    {
      label: 'AI and automation',
      featured: true,
      headline: 'Automation for repetitive work.',
      note: 'Implementation, image sourcing, video and voice production, so my time stays on design decisions.',
      items: [
        { name: 'Claude', logo: 'claude.svg' },
        { name: 'Claude Code', logo: 'claude.svg', badge: 'terminal' },
        { name: 'ChatGPT Atlas', logo: 'chatgpt.svg', badge: 'globe' },
        { name: 'Codex', logo: 'openai.svg', badge: 'code' },
        { name: 'Midjourney', logo: 'midjourney.png', large: true },
        { name: 'Higgsfield', logo: 'higgsfield.png' },
        { name: 'ElevenLabs', logo: 'elevenlabs.svg' },
      ],
    },
    {
      label: 'Hosting and delivery',
      items: [
        { name: 'Vercel', logo: 'vercel.svg' },
        { name: 'DigitalOcean', logo: 'digitalocean.svg' },
        { name: 'ImageKit', logo: 'imagekit.png' },
        { name: 'Resend', logo: 'resend.svg' },
      ],
    },
    {
      label: 'Search and performance',
      items: [
        { name: 'Search Console', logo: 'google-search-console.svg' },
        { name: 'PageSpeed Insights', logo: 'pagespeed-insights.svg' },
      ],
    },
  ],
};

export const footer = {
  heading: 'Have a project or role in mind?',
  subheading: 'Send a short message and I will get back to you.',
  pinnedLabel: 'Email',
  form: {
    label: 'Send a message',
    name: 'Name',
    email: 'Email',
    message: 'Project or role details',
    placeholder: 'A brief description of the project or role, and your timeline.',
    submit: 'Send message',
    sending: 'Sending…',
    privacy: 'Your email is used only to reply to your message.',
    sentTitle: 'Thank you. Your message has been sent.',
    sentBody: 'I will reply to the email address you provided.',
    failed: 'Your message could not be sent. Please email me directly at',
  },
  credit: { lead: 'Designed in Figma, built with', strong: 'Next.js' },
  madeWith: 'by Sachin Verma, one pixel at a time',
};
