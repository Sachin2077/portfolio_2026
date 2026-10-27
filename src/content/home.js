// Copy for the home page, section by section, in the order a visitor scrolls.
// Voice: one person talking to one reader. Short sentences, plain words, true and specific.

export const hero = {
  greeting: "Hi, I'm Sachin Verma",
  // Rendered as one line: the accent part in brand blue, the rest in ink.
  headline: { accent: 'Plan | Design |', rest: 'Build' },
  body: 'Most of the work happens before the first screen, so I plan first. Then I design, and on websites I build the front end with Claude Code. AI takes the repetitive work, which leaves my attention for the parts that need a person.',
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
  body: "I'm a UI/UX designer in Gurugram, India, and Head of Design at Zarah AI LLP, a studio I co-founded for travel and hospitality businesses. Engineers build the AI products I design. The websites I build with Claude Code, and when a project needs a skill I don't have yet, I learn it.",
  cta: { label: 'View my journey', href: '#journey' },
};

// "What I believe": the four beliefs from the Values mockup in Figma.
export const beliefs = {
  title: 'What I believe',
  items: [
    {
      title: 'Find the decision first',
      body: 'A screen full of data helps no one until it answers a question. I ask first what the person has to decide, and I design toward that.',
      image: '/images/figma/belief-decision.png',
    },
    {
      title: 'Show where the answer came from',
      body: 'People trust an AI answer more when they can check it, so I design answers that show where they came from.',
      image: '/images/figma/belief-sources.png',
    },
    {
      title: 'Shape what goes in',
      body: 'What an AI gives back depends on what it is given. So I design the input as carefully as the answer.',
      image: '/images/figma/belief-input.png',
    },
    {
      title: 'Keep scope honest',
      body: 'When I notice something outside the brief, I write it down for the client instead of quietly fixing it. The client decides, and nothing changes by surprise.',
      image: '/images/figma/belief-scope.png',
    },
  ],
};

// Journey cards, oldest first. Image framing comes from the Figma timeline (Frame 55).
export const journey = {
  title: 'My Journey',
  intro: "Where I've studied and worked, oldest first, and what I did at each place.",
  steps: [
    {
      title: 'Curiosity Begins',
      when: '2020 to 2024 · BML Munjal University',
      body: 'I studied computer science and IT, and kept drifting toward how things look and how people use them.',
      image: '/images/figma/journey-01-curiosity.png',
    },
    {
      title: 'Learning & Building',
      when: '2022 · Cyberaegis',
      body: 'A summer role as front-end developer and designer. I designed web app layouts in Figma and worked with developers to build them.',
      image: '/images/figma/journey-02-learning.png',
    },
    {
      title: 'Internship Experience',
      when: '2024 · Nebula9.ai',
      body: 'I joined a generative AI startup as a design intern and helped shape its first design system and AI dashboards.',
      image: '/images/figma/journey-03-internship.png',
    },
    {
      title: 'First Full-Time Role',
      when: '2024 · Nebula9.ai',
      body: 'Promoted within six months to UI/UX designer and business analyst. I designed AI products for finance, legal and marketing teams.',
      image: '/images/figma/journey-04-fulltime.png',
    },
    {
      title: 'Bigger Impact',
      when: '2025 · Nebula9.ai',
      body: 'I led user research and usability tests, made the brand guidelines the company adopted, and helped secure three partnerships.',
      image: '/images/figma/journey-05-impact.png',
    },
    {
      title: 'Co-Founder & Head of Design',
      when: '2025 to now · Zarah AI LLP',
      body: 'I co-founded a studio for travel and hospitality businesses. I set the design direction, and I build the websites I design with Claude Code.',
      image: '/images/figma/journey-06-cofounder.png',
    },
  ],
  next: {
    title: 'What’s Next?',
    body: "Keep learning, keep building, and work with people who care about the details. If you're making something, I'd like to hear about it.",
    cta: { label: "Let's work together", href: '#contact' },
    image: '/images/figma/journey-07-whats-next.png',
    imageAlt:
      'Pixel-art Sachin sits on a cliff with his laptop, looking out over a city and a river at sunset.',
  },
};

export const projectsIntro = {
  title: 'Projects',
  intro:
    'My strongest work first. Below it, my career in three chapters, and what each project taught me.',
  selectedTitle: 'Selected work',
  storyTitle: 'The story behind the work',
  storyIntro: 'Every project, in the order I did them. Each one changed how I work.',
  chapterLessonLabel: 'What this chapter taught me',
  cardLessonLabel: 'What it taught me',
};

export const scope = {
  title: 'Scope of work',
  intro:
    'What I know, and the steps I take. I keep to four kinds of work and try to know each one well.',
  areas: [
    {
      title: 'UI/UX design for AI tools',
      body: 'I design the screens where people ask an AI tool a question and check what it gives back, along with the rules underneath them.',
      proof: 'fingen',
    },
    {
      title: 'Websites, from Figma to front end',
      body: 'I design each page in Figma, then build it in Next.js with Claude Code. Load speed and search setup are part of the design work too.',
      proof: 'liberty-india',
    },
    {
      title: 'Design systems and brand guidelines',
      body: 'I design the shared parts every screen draws on, so a table or a form field works the same everywhere. Brand guidelines do the same for color and type after handoff.',
      proof: 'edro',
    },
    {
      title: 'Research and usability testing',
      body: 'First I map how people move through a task. Then I run usability tests on the design, and A/B tests when two versions both seem right.',
      proof: 'excellilens',
    },
  ],
  traitsTitle: 'What you can count on',
  traits: [
    {
      title: 'A plan before the pixels',
      body: 'I settle the structure, the scope and the flows before any color or type. A plan everyone can see saves weeks later.',
      proof: 'zarah',
    },
    {
      title: 'AI for the repetitive work',
      body: 'AI writes the code, varies images and checks flows for me. That frees my attention for the decisions that need a person.',
      proof: 'inspiration-india',
    },
    {
      title: 'Care for the craft',
      body: 'Most of the quality sits in small things, like the space around a heading. I check those details in Figma and again in the browser.',
      proof: 'liberty-india',
    },
    {
      title: 'Learning what the work needs',
      body: 'If a project needs something outside design, I learn it. On BookUnitedHotels, that meant setting up the server for a payment gateway’s approval.',
      proof: 'bookunitedhotels',
    },
    {
      title: 'Better as a team',
      body: 'I work closely with engineers, clients and other designers. On ExcelliLens, I led two designers across 62+ screens from one shared set of components.',
      proof: 'excellilens',
    },
    {
      title: 'Ideas turned into value',
      body: 'Value isn’t always a new product. On FinGen, the most useful thing I designed was a rule, not a screen.',
      proof: 'fingen',
    },
  ],
  stepsTitle: 'The steps I take',
  stepsIntro:
    'Moving a box in Figma takes a minute. Moving a feature in code can take a week. So I do most of the thinking early.',
  steps: [
    {
      title: 'Start with a conversation',
      body: 'We talk about the business and the people it serves. Then I write up the scope so we agree before design starts.',
    },
    {
      title: 'Look at what exists',
      body: 'I go through the current site or product screen by screen. When I can, I talk to the people who use it.',
    },
    {
      title: 'Settle the structure',
      body: 'Flows and wireframes come before any color or type. This is where we decide who can do what, and what each screen shows first.',
    },
    {
      title: 'Design and test',
      body: 'I design the screens and link them into a clickable Figma prototype. Users and the client try it, and I revise until it holds up.',
    },
    {
      title: 'Hand off or build',
      body: 'On AI products, engineers build from my specs and prototype. On websites, I build the front end with Claude Code.',
    },
    {
      title: 'Check before launch',
      body: 'I test the site’s speed, search setup and security. On BookUnitedHotels, that included hardening the server for payment gateway approval.',
    },
  ],
  toolsTitle: 'Tools I use',
  toolsIntro: 'I make the main decisions by hand. AI takes the repetitive work after that.',
  // Logos live in public/images/tools. `badge` marks products that share their maker's logo;
  // `large` gives fine-line marks a little more room. A `note` on a regular group shows under its tiles.
  tools: [
    {
      label: 'Plan and design',
      note: 'Every project starts here, before any code.',
      items: [
        { name: 'Notion', logo: 'notion.svg' },
        { name: 'Figma', logo: 'figma.svg' },
        { name: 'Canva', logo: 'canva.png' },
        { name: 'Magnific', logo: 'magnific.svg' },
      ],
    },
    {
      // Claude Code writes this code, so the group names what the sites run on rather than a hand-coding skill.
      label: 'My sites run on',
      note: 'I plan the build and review every screen. Claude Code writes the code.',
      items: [
        { name: 'Next.js', logo: 'nextjs.svg' },
        { name: 'React', logo: 'react.svg' },
        { name: 'Tailwind CSS', logo: 'tailwindcss.svg' },
      ],
    },
    {
      label: 'Data and cloud',
      note: 'What our products at Zarah AI run on. I know where each piece fits.',
      items: [
        { name: 'PostgreSQL', logo: 'postgresql.svg' },
        { name: 'Prisma', logo: 'prisma.svg' },
        { name: 'AWS', logo: 'aws.png' },
      ],
    },
    {
      label: 'AI assistants',
      featured: true,
      headline: 'The repetitive work goes here.',
      note: 'Code, images, video, voice and agents.',
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
      label: 'Search and speed',
      items: [
        { name: 'Search Console', logo: 'google-search-console.svg' },
        { name: 'PageSpeed Insights', logo: 'pagespeed-insights.svg' },
      ],
    },
  ],
};

export const footer = {
  heading: "Tell me what you're working on.",
  subheading: 'A short note is enough to start.',
  pinnedLabel: 'Write to me',
  form: {
    label: 'Send a note',
    name: 'Your name',
    email: 'Your email',
    message: 'What are you working on?',
    placeholder: 'A few lines is enough: what you’re making, and when you’d like to start.',
    submit: 'Send note',
    sending: 'Sending…',
    privacy: 'I’ll only use your email to reply.',
    sentTitle: 'Thanks. Your note is on its way.',
    sentBody: 'I’ll reply to the email address you gave me.',
    failed: 'Your note didn’t send. Please email me instead at',
  },
  credit: { lead: 'Designed in Figma, built with', strong: 'Next.js and Claude Code' },
  madeWith: 'by Sachin Verma, one pixel at a time',
};
