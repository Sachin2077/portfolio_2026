// Case studies, in the order they happened. Each one sits in a career chapter and ends with its key learning.
// Every page at /projects/[slug] renders from its entry here. Images live in public/images/projects/<slug>/.

export const chapters = [
  {
    id: 'start',
    number: 1,
    when: '2024',
    where: 'Independent work',
    title: 'Foundations',
    intro:
      'Before client work, I set myself a brief: an AI tool that writes blog posts. It established a principle I still design by.',
    lesson: 'The input determines the output.',
  },
  {
    id: 'nebula9',
    number: 2,
    when: '2024 to 2025',
    where: 'Nebula9.ai',
    title: 'Designing AI products for clients',
    intro:
      'At a generative AI startup, I designed products for finance, legal and marketing teams. Each project refined how I work.',
    lesson: 'A design decision can shape the whole product.',
  },
  {
    id: 'studio',
    number: 3,
    when: '2025 to now',
    where: 'Zarah AI LLP',
    title: 'End-to-end ownership',
    intro:
      'At the studio I co-founded, I take products from requirements to prototype, and websites from design to launch.',
    lesson: 'Design and delivery belong together.',
  },
];

// My strongest work, in the order I want it seen. The Projects section shows these first.
export const featured = ['inspiration-india', 'excellilens', 'zarahflow', 'zarah-ledger', 'liberty-india'];

const shot = (slug, file, width, height, caption) => ({
  src: `/images/projects/${slug}/${file}`,
  width,
  height,
  caption,
});

export const projects = [
  {
    slug: 'inkpot',
    name: 'InkPot',
    kind: 'ai',
    chapter: 'start',
    status: 'Self-initiated concept, 2024',
    tags: ['AI product', 'Concept'],
    oneLiner: 'An AI blog-writing concept that collects structured input before it drafts.',
    summary:
      'InkPot is a web application concept that turns a title, keywords and subheadings into a complete blog post. I designed it independently in 2024, from the landing page to the editor.',
    details: [
      { label: 'Role', value: 'UI/UX designer, solo' },
      { label: 'Client', value: 'Self-initiated' },
      { label: 'Year', value: '2024' },
      { label: 'Tools', tools: ['Figma'] },
    ],
    liveUrl: null,
    stats: [
      { value: '5', label: 'core screens' },
      { value: '3', label: 'input steps' },
      { value: 'Solo', label: 'designer' },
    ],
    problem: {
      lead: 'Most AI writing tools offer an empty prompt and a button, and the result is generic content.',
      points: [
        'Blank prompts produce generic output',
        'Complex settings discourage first-time users',
        'Image sourcing is a separate, manual step',
      ],
    },
    steps: [
      {
        title: 'Map the journey',
        body: 'From landing page to saved post. The critical challenge sat on a single screen: the input step.',
      },
      {
        title: 'Structure the input',
        body: 'Language and tone first, then title, keywords and subheadings, then generation.',
      },
      {
        title: 'Design the editor',
        body: 'Headings anchor the article on the left; suggested images sit alongside on the right.',
      },
      {
        title: 'Complete the flow',
        body: 'A landing page that leads with a sample post, a fast sign-in, and a dashboard of past posts.',
      },
    ],
    decisions: [
      {
        title: 'Structured input over an open prompt',
        body: 'Writers already know their title, keywords and subheadings. Asking for them gives the AI direction and keeps the writer in control.',
      },
      {
        title: 'Images inside the editor',
        body: 'Bloggers search for images after writing. The editor suggests them alongside the draft, ready to insert.',
      },
      {
        title: 'Show the output first',
        body: 'The landing page leads with a sample post, so visitors can judge the quality before signing up.',
      },
    ],
    screens: [
      shot('inkpot', 'hero.jpg', 2000, 6422, 'Landing page, from the first screen to pricing'),
      shot('inkpot', 'gallery-01.jpg', 2000, 1302, 'Editor with AI image suggestions beside the draft'),
      shot('inkpot', 'gallery-02.jpg', 2000, 1299, 'Dashboard with usage cards (sample data)'),
      shot('inkpot', 'gallery-03.jpg', 2000, 1302, 'Three-step blog creator'),
    ],
    results: [
      'A complete product flow, from landing page to saved post',
      'A three-step input that replaces the blank prompt',
      'An editor with image suggestions built in',
    ],
    lesson: {
      title: 'The hardest part of an AI tool is the input.',
      body: 'A blank prompt yields a generic post; a few structured fields yield a draft worth editing. I apply this principle to every AI product I design.',
    },
    meta: {
      title: 'InkPot · AI blog-writing app concept · Sachin Verma',
      description:
        'InkPot is a self-initiated 2024 concept for an AI blog-writing app, designed by Sachin Verma around one principle: the hardest part of an AI tool is the input.',
    },
    next: 'fingen',
  },
  {
    slug: 'fingen',
    name: 'FinGen',
    kind: 'ai',
    chapter: 'nebula9',
    status: 'Shipped to production',
    tags: ['AI product', 'Shipped to production'],
    oneLiner: 'A financial planning platform with AI chat, designed from scratch and shipped to production.',
    summary:
      'FinGen is a financial planning platform with an AI chatbot. I designed it from scratch for a Nebula9.ai client while the requirements were still evolving. It shipped to production.',
    details: [
      { label: 'Role', value: 'UI/UX designer' },
      { label: 'Client', value: 'A Nebula9.ai client' },
      { label: 'Tools', tools: ['Figma'] },
      { label: 'Status', value: 'Shipped to production' },
    ],
    liveUrl: null,
    stats: [
      { value: '20+', label: 'screens' },
      { value: '3', label: 'review cycles' },
      { value: 'Live', label: 'in production' },
    ],
    problem: {
      lead: 'Financial data was growing faster than the team could interpret it, and the answers remained locked in spreadsheets.',
      points: [
        'Answers required deep knowledge of the data',
        'Spreadsheets and manual reports could not scale',
        'Sensitive financial data required protection',
      ],
    },
    steps: [
      {
        title: 'Shape the brief',
        body: 'With incomplete requirements, I defined what each feature should do and whom it served.',
      },
      {
        title: 'Map every flow',
        body: 'Every path through the product, mapped and validated before visual design began.',
      },
      {
        title: 'Prioritise by use',
        body: 'The most-used screens received the most space; secondary tasks stayed accessible but out of the way.',
      },
      {
        title: 'Prototype and review',
        body: '20+ screens in a clickable prototype, refined over three review cycles until the client approved it.',
      },
    ],
    decisions: [
      {
        title: 'Never start from a blank box',
        body: 'The home screen offers example questions, so users never have to guess what to ask.',
      },
      {
        title: 'The number comes first',
        body: 'In a paragraph, users hunt for the figure. Highlighted numbers and simple charts place it where the eye lands first.',
      },
      {
        title: 'One visual system',
        body: 'Every screen shares the same cards, tables and navigation, so the product only has to be learned once.',
      },
    ],
    screens: [
      shot('fingen', 'gallery-01.jpg', 2000, 1422, 'Home'),
      shot('fingen', 'gallery-02.jpg', 2000, 1422, 'Financial models and scenarios'),
      shot('fingen', 'gallery-03.jpg', 2000, 2158, 'Scenario builder'),
      shot('fingen', 'gallery-04.jpg', 2000, 1422, 'Data sources and metadata'),
      shot('fingen', 'hero.jpg', 2000, 1422, 'Sign-in'),
    ],
    results: [
      'Shipped to production after three review cycles',
      'Closed a data security risk with a change I proposed',
      'The client called the new interface "much cleaner and user-friendly"',
    ],
    lesson: {
      title: 'A design decision can be an architecture decision.',
      body: 'My most valuable contribution to FinGen was not a screen but a rule beneath the interface. It also taught me to take a clear position early when the brief is still evolving.',
    },
    meta: {
      title: 'FinGen · FP&A platform with AI chat · Sachin Verma',
      description:
        'FinGen is a financial planning platform with AI chat. Sachin Verma designed it from scratch at Nebula9.ai, and it shipped to production.',
    },
    next: 'edro',
  },
  {
    slug: 'edro',
    name: 'Edro',
    kind: 'ai',
    chapter: 'nebula9',
    status: 'Delivered to the client',
    tags: ['AI product', 'Delivered to the client'],
    oneLiner: 'A cluttered legal document tool, redesigned as a clear, modern AI workspace.',
    summary:
      'Edro helps legal teams work with complex documents. Its AI capabilities already existed but were hidden behind dated screens. I redesigned the entire product, from its structure to its visual language.',
    details: [
      { label: 'Role', value: 'UI/UX designer at Nebula9.ai' },
      { label: 'Client', value: 'A confidential telecom-sector client' },
      { label: 'Tools', tools: ['Figma', 'Magnific', 'Dribbble', 'Notion'] },
      { label: 'Status', value: 'Delivered to the client' },
    ],
    liveUrl: null,
    stats: [
      { value: '20+', label: 'screens redesigned' },
      { value: '1', label: 'design system' },
      { value: '1', label: 'brand guide' },
    ],
    problem: {
      lead: 'The AI was capable, but dated, cluttered screens concealed what it could do.',
      points: [
        'A dated interface with no clear hierarchy',
        'Navigation that forced users to search for features',
        'No shared components, so screens were inconsistent',
      ],
    },
    steps: [
      {
        title: 'Audit every screen',
        body: 'I documented what was broken and where users lost their way. The product lacked structure, not features.',
      },
      {
        title: 'Establish a clear structure',
        body: 'I reorganised the product so that every screen serves one clear purpose.',
      },
      {
        title: 'Build the design system',
        body: 'A design system tuned for long legal text, with brand guidelines to keep it consistent after handoff.',
      },
      {
        title: 'Design every state',
        body: 'Empty, loading, error and success states, linked into one clickable prototype for review.',
      },
    ],
    decisions: [
      {
        title: 'Consistency across every screen',
        body: 'Shared components ensure a table, button or form field looks and behaves the same everywhere.',
      },
      {
        title: 'Typography for long reading',
        body: 'Legal documents run long, so the typography is set for sustained reading, not quick scanning.',
      },
      {
        title: 'A 60-30-10 colour rule',
        body: 'A primary colour for 60% of each screen, a secondary for 30% and an accent for 10%, documented in the brand guidelines so new screens keep the balance.',
      },
    ],
    screens: [
      shot('edro', 'hero.jpg', 2000, 1125, 'AI chat home'),
      shot('edro', 'gallery-01.jpg', 2000, 623, 'Before and after'),
      shot('edro', 'gallery-02.jpg', 2000, 1125, 'Chat and document view'),
      shot('edro', 'gallery-03.jpg', 2000, 1125, 'Documents'),
      shot('edro', 'gallery-04.jpg', 2000, 1125, 'Draft creation'),
    ],
    results: [
      '20+ screens redesigned across the whole product',
      'A design system and brand guidelines the team can build on',
      'The client was extremely satisfied with the outcome',
    ],
    lesson: {
      title: 'Redesigning a product is more than redesigning screens.',
      body: 'Screens can improve in a day. Structure, user journeys and design rules outlast my time on a project.',
    },
    meta: {
      title: 'Edro · AI legal workspace · Sachin Verma',
      description:
        'Sachin Verma redesigned Edro at Nebula9.ai, turning a cluttered document viewer into an AI legal workspace for a confidential client in the telecom sector.',
    },
    next: 'excellilens',
  },
  {
    slug: 'excellilens',
    name: 'ExcelliLens',
    kind: 'ai',
    chapter: 'nebula9',
    status: 'Delivered and live',
    tags: ['AI product', 'Live'],
    oneLiner: 'An AI platform that turns customer and marketing data into answers a CMO can act on.',
    summary:
      'ExcelliLens helps chief marketing officers understand their customers and campaigns, and decide what to do next. I redesigned the application with a new interface that is more efficient, clearer and built around the purpose of each screen. As lead designer, I directed two designers and served as the client’s primary point of contact.',
    details: [
      { label: 'Role', value: 'Lead designer and primary client contact' },
      { label: 'Client', value: 'Confidential (NDA)' },
      { label: 'Team', value: 'Led a team of 2 designers' },
      { label: 'Timeline', value: 'Under 4 months' },
      {
        label: 'Tools',
        tools: ['Figma', 'Canva', 'Freepik', 'Dribbble'],
        note: 'Figma for wireframes and interface design, Canva for icons and illustrations, Freepik for assets, and Dribbble for visual research.',
      },
      { label: 'Status', value: 'Delivered to the client, now live' },
    ],
    liveUrl: null,
    stats: [
      { value: '62+', label: 'screens designed' },
      { value: '2', label: 'designers I led' },
      { value: '<4', label: 'months to delivery' },
      { value: '2', label: 'lenses designed' },
    ],
    problem: {
      lead: 'CMOs had the right data in the wrong experience. Customers, campaigns and brand tracking each felt like separate products.',
      points: [
        'Dense screens with no clear order',
        'Heavy analytics buried under clutter',
        'Simple answers required deep system knowledge',
      ],
    },
    steps: [
      {
        title: 'Understand the CMO’s context',
        body: 'The decisions they make, the data available, and how it flows through Google Cloud, BigQuery ML and Vertex AI.',
      },
      {
        title: 'Lead the client relationship',
        body: 'I worked directly with the client, incorporated their feedback, contributed to brainstorming and delivered work on schedule every day.',
      },
      {
        title: 'Redesign the interface',
        body: 'Wireframes first, then a new interface across the application: more efficient, clearer and built around each screen’s purpose.',
      },
      {
        title: 'Direct the design team',
        body: 'One component set across both lenses. I directed two designers, and together we delivered 62+ screens.',
      },
    ],
    decisions: [
      {
        title: 'Insight first, data second',
        body: 'Each view opens with the key takeaway in plain language; charts and tables follow for anyone who wants to verify.',
      },
      {
        title: 'Connected lenses',
        body: 'From a high-value customer segment, a CMO can move directly to campaign performance for that same group.',
      },
      {
        title: 'Layered analysis',
        body: 'Marketing mix modelling shows a summary first, then charts, then raw tables, so each user chooses their depth.',
      },
    ],
    screens: [
      shot('excellilens', 'hero.jpg', 2000, 944, 'Home: Customer, Marketing and Brand lenses in one platform'),
      shot('excellilens', 'gallery-01.jpg', 2000, 1420, 'Audience Builder with live segment counts'),
      shot('excellilens', 'gallery-02.jpg', 2000, 1186, 'Customer lifetime value models'),
      shot('excellilens', 'gallery-03.jpg', 2000, 1613, 'Marketing mix and spend optimisation models'),
      shot('excellilens', 'gallery-04.jpg', 2000, 1565, 'Spend optimisation: current against recommended'),
      shot('excellilens', 'gallery-05.jpg', 2000, 2070, 'Results: actual against recommended spend, by channel'),
    ],
    results: [
      'Delivered in under four months, and now live',
      '62+ screens from one shared component system',
      'A new interface: more efficient, clearer and built around purpose',
      'Daily deliverables, consistently on schedule',
      'Complex AI outputs made readable for non-technical leaders',
      'The client praised the work directly on delivery',
    ],
    lesson: {
      title: 'Design for the person deciding, not the analyst.',
      body: 'The models could produce far more numbers than a CMO has time for. My role was deciding which ones they see first. Leading two designers taught me to maintain one vision across a team.',
    },
    meta: {
      title: 'ExcelliLens · AI decision support for CMOs · Sachin Verma',
      description:
        'ExcelliLens unites customer, marketing and brand data for CMOs. Sachin Verma redesigned its interface as lead designer, directing two designers across 62+ screens.',
    },
    next: 'zarah',
  },
  {
    slug: 'zarah',
    name: 'Zarah',
    kind: 'ai',
    chapter: 'studio',
    status: 'Production-ready prototype',
    tags: ['AI product', 'Prototype'],
    oneLiner: 'One AI workspace for travel agencies, replacing the four or five tools they juggle.',
    summary:
      'Zarah is an AI workspace for travel agencies and event planners. As the sole designer, I took it from a requirements document to a production-ready prototype.',
    details: [
      { label: 'Role', value: 'Sole UI/UX designer' },
      { label: 'Client', value: 'A travel-tech client' },
      { label: 'Tools', tools: ['Figma', 'Magnific', 'Dribbble', 'Notion'] },
      { label: 'Status', value: 'Production-ready prototype' },
    ],
    liveUrl: null,
    stats: [
      { value: 'Solo', label: 'designer' },
      { value: 'PRD', label: 'to prototype' },
      { value: '✓', label: 'handed to development' },
    ],
    problem: {
      lead: 'Agents work across Gmail, shared drives and spreadsheets, and a single client question can mean opening four or five tools.',
      points: [
        'Key details buried in email threads',
        'Client history lost between colleagues',
        'No link between what was requested and what was delivered',
      ],
    },
    steps: [
      {
        title: 'Break down the PRD',
        body: 'I analysed the requirements document and defined what the first version needed.',
      },
      {
        title: 'Map every flow',
        body: 'Every path through the product, mapped in wireframes before any visual design.',
      },
      {
        title: 'One pattern everywhere',
        body: 'Screens share one structure, so learning one part of the product teaches the rest.',
      },
      {
        title: 'Design every state',
        body: 'Every empty, loading and error state designed and linked, ready for handoff.',
      },
    ],
    decisions: [
      {
        title: 'One brand colour, carried through',
        body: 'The yellow of the Zarah AI mark runs through every screen, from the navigation to the AI’s answers, so the product reads as one brand.',
      },
      {
        title: 'Realistic content, not placeholder text',
        body: 'Every screen was designed with realistic travel content, so each layout was tested against real-length names, dates and trips.',
      },
      {
        title: 'One component library',
        body: 'Buttons, cards, status chips and forms designed once and used on every screen, ready for developers at handoff.',
      },
    ],
    screens: [
      shot('zarah', 'hero.jpg', 2000, 1125, 'AI chat'),
      shot('zarah', 'gallery-01.jpg', 2000, 1125, 'Dashboard'),
      shot('zarah', 'gallery-02.jpg', 2000, 1125, 'Document management'),
      shot('zarah', 'gallery-03.jpg', 2000, 1125, 'Client management'),
      shot('zarah', 'gallery-04.jpg', 2000, 1125, 'Itinerary management'),
    ],
    results: [
      'A complete SaaS product, from PRD to production-ready screens',
      'Every flow and every state designed',
      'One component library for the whole product',
      'The prototype went straight into development handoff',
    ],
    lesson: {
      title: 'From designing screens to designing a product.',
      body: 'Working alone from PRD to prototype, I had to decide whether each screen should exist, not only how it should look.',
    },
    meta: {
      title: 'Zarah · AI workspace for travel agencies · Sachin Verma',
      description:
        'Zarah is an AI workspace for travel agencies. As the sole designer, Sachin Verma took it from a requirements document to a production-ready prototype.',
    },
    next: 'liberty-india',
  },
  {
    slug: 'liberty-india',
    name: 'Liberty India',
    kind: 'website',
    chapter: 'studio',
    status: 'Live at liberty-india.com',
    tags: ['Website', 'Live'],
    oneLiner: 'A luxury travel website, designed in Figma and taken through to launch.',
    summary:
      'Liberty India plans luxury journeys across India for European travellers. Its previous Webflow site said little about India or the brand. I redesigned it end to end and led the Next.js build through to launch.',
    details: [
      { label: 'Role', value: 'Sole designer and build lead' },
      { label: 'Client', value: 'Liberty India, a luxury travel company' },
      { label: 'Timeline', value: '12 weeks, Jan to May 2026' },
      { label: 'Tools', tools: ['Figma', 'Claude Code', 'Next.js', 'Tailwind CSS', 'ImageKit', 'Resend', 'Vercel'] },
    ],
    liveUrl: 'https://liberty-india.com',
    stats: [
      { value: '100', label: 'SEO score out of 100' },
      { value: '15', label: 'custom route maps' },
      { value: '1→7', label: 'one pattern, seven pages' },
      { value: '12', label: 'weeks, Figma to live' },
    ],
    problem: {
      lead: 'For a company selling premium journeys, the website is the first impression. The previous site looked dated, buried the itineraries and saw little use.',
      points: [
        'A dated Webflow design that undercut a luxury brand',
        'Itineraries, the most persuasive content, were buried',
        'Little content about India or the brand',
      ],
    },
    steps: [
      {
        title: 'Align on goals',
        body: 'Stakeholder sessions defined two objectives: present India as a destination and make the brand clear.',
      },
      {
        title: 'Design in Figma',
        body: 'Every section designed first, with reusable components and a content plan.',
      },
      {
        title: 'Editorial content',
        body: 'Long-form features on Heritage, Culture, Architecture and Nature, reviewed with the client as they developed.',
      },
      {
        title: 'Build and launch',
        body: 'I led the Next.js build section by section, using Claude Code for implementation, and reviewed each section against the Figma file before launch on the client’s domain.',
      },
    ],
    decisions: [
      {
        title: 'Show the journey, not a list',
        body: 'Each of the 15 itineraries has its own route on one shared map of India. A script renders all 15, so they stay consistent.',
      },
      {
        title: 'One pattern for seven pages',
        body: 'A full-width slideshow with a floating text card gives every service page one look. A new service needs no new design.',
      },
      {
        title: 'Performance as a design requirement',
        body: 'Every image is served through ImageKit, which halved image sizes: large photography, fast pages.',
      },
    ],
    screens: [
      shot('liberty-india', 'hero.jpg', 2000, 1007, 'Home, the first impression'),
      shot('liberty-india', 'gallery-01.jpg', 2000, 1010, 'Heritage, set like a magazine feature'),
      shot('liberty-india', 'gallery-02.jpg', 2000, 2417, 'Our Services: one pattern for every service'),
      shot('liberty-india', 'gallery-03.jpg', 2000, 1013, 'An itinerary page, Gems of South India'),
      shot('liberty-india', 'gallery-04.jpg', 2000, 992, 'Contact page, connected to the team’s inbox'),
    ],
    results: [
      'Live on the client’s own domain, replacing the previous Webflow site',
      '100/100 SEO and 90/100 performance on PageSpeed Insights',
      '15 route maps from one system, none drawn by hand',
      'A scope log maintained for the client, so every change was agreed',
    ],
    lesson: {
      title: 'Design and delivery work best as one process.',
      body: 'Leading the build meant every visual decision was also a technical one. The details that make a site feel premium were preserved from Figma to the live site.',
    },
    meta: {
      title: 'Liberty India · Luxury travel website · Sachin Verma',
      description:
        'Sachin Verma designed the Liberty India luxury travel website and led its Next.js build. It scores 100/100 for SEO on Google PageSpeed Insights.',
    },
    next: 'bookunitedhotels',
  },
  {
    slug: 'bookunitedhotels',
    name: 'BookUnitedHotels',
    kind: 'website',
    chapter: 'studio',
    status: 'Live at bookunitedhotels.com',
    tags: ['Website', 'Live'],
    oneLiner: 'A direct-booking site for 39 boutique hotels in Istanbul, from Figma to payment approval.',
    summary:
      'Guests book 39 boutique hotels in Istanbul directly through this site. I designed it, led the front-end build, and completed the search and server work that enabled payments.',
    details: [
      { label: 'Role', value: 'Designer and build lead' },
      { label: 'Client', value: 'BookUnitedHotels, through Zarah AI LLP' },
      { label: 'Tools', tools: ['Figma', 'Claude Code', 'React', 'Next.js', 'Google Search Console', 'DigitalOcean'] },
      { label: 'Status', value: 'Live' },
    ],
    liveUrl: 'https://bookunitedhotels.com',
    stats: [
      { value: '39', label: 'boutique hotels' },
      { value: '2', label: 'builds: React, then Next.js' },
      { value: '✓', label: 'payment gateway approval' },
    ],
    problem: {
      lead: 'A direct booking depends on three moments: the guest finds the hotel, the page loads, and the payment goes through. If one fails, the booking goes elsewhere.',
      points: [
        'Hotel pages had to load fast',
        'Search engines had to be able to index them',
        'The server had to pass a payment gateway’s review',
      ],
    },
    steps: [
      { title: 'Design in Figma', body: 'The site and every hotel page designed before development.' },
      {
        title: 'Build and launch',
        body: 'Built first in React and Vite, with Claude Code handling implementation. After launch, I led the migration to Next.js.',
      },
      {
        title: 'Audit the site',
        body: 'Search visibility, load performance and security, reviewed end to end.',
      },
      {
        title: 'Harden the server',
        body: 'Firewall, server and SSH settings on DigitalOcean, configured to meet the payment gateway’s requirements.',
      },
    ],
    decisions: [
      {
        title: 'Pre-rendered hotel pages',
        body: 'With static rendering in Next.js, each hotel page loads complete and fast, for guests and for search engines.',
      },
      {
        title: 'Search visibility',
        body: 'I configured Google Search Console and indexing to track which hotel pages Google has indexed.',
      },
      {
        title: 'The server is part of the product',
        body: 'It is invisible on the page, but it determines whether a guest can complete a payment.',
      },
    ],
    screens: [
      shot('bookunitedhotels', 'hero.jpg', 2000, 1250, 'Home, with hotel search up front'),
      shot('bookunitedhotels', 'gallery-01.jpg', 1440, 810, 'Hotel picks with nightly prices'),
      shot('bookunitedhotels', 'gallery-02.jpg', 1440, 580, 'Handpicked hotels, inspected on site'),
    ],
    results: [
      'Live, with hotel pages pre-rendered in Next.js',
      'Search Console set up and indexing configured',
      'Approved by the payment gateway after the audit',
    ],
    lesson: {
      title: 'Learn what the work requires.',
      body: 'The site could not accept payments until the server met the gateway’s requirements, so I learned that discipline too. A booking site is complete only when guests can find it, load it and pay.',
    },
    meta: {
      title: 'BookUnitedHotels · Hotel booking website · Sachin Verma',
      description:
        'BookUnitedHotels lets guests book 39 boutique hotels in Istanbul directly. Sachin Verma designed the site, led its front-end build and its migration to Next.js.',
    },
    next: 'inspiration-india',
  },
  {
    slug: 'inspiration-india',
    name: 'Inspiration India',
    kind: 'website',
    chapter: 'studio',
    status: 'Live',
    tags: ['Website', 'Live'],
    oneLiner: 'A luxury travel website for India: 20+ pages, designed in Figma and launched in eight weeks.',
    summary:
      'Inspiration India is a luxury travel company. I took its website from low-fidelity wireframes to high-fidelity designs in Figma, then led the build through to launch. The site needed about 875 photos, so I automated the sourcing through the Pexels and Magnific APIs and a Midjourney connector, then refined every page once they were in place.',
    details: [
      { label: 'Role', value: 'Designer and build lead' },
      { label: 'Client', value: 'Inspiration India, a luxury travel company' },
      { label: 'Timeline', value: 'Jun to Aug 2026' },
      {
        label: 'Tools',
        tools: [
          'Figma',
          'Claude Code',
          'Pexels API',
          'Magnific API',
          'Midjourney connector',
          'ImageKit',
          'Vercel',
          'DigitalOcean',
        ],
      },
    ],
    liveUrl: 'https://inspiration-india.vercel.app/',
    stats: [
      { value: '8', label: 'weeks to launch' },
      { value: '20+', label: 'pages' },
      { value: '~875', label: 'photos, sourced at scale' },
      { value: '4', label: 'revision rounds' },
    ],
    problem: {
      lead: 'A travel website sells through its imagery. This one needed about 875 photos across 20+ pages, on an eight-week timeline.',
      points: [
        '20+ pages to design and deliver',
        'About 875 photos to source and place',
        'Eight weeks from wireframe to launch',
      ],
    },
    steps: [
      {
        title: 'Wireframes to high fidelity',
        body: 'Low-fidelity wireframes, then high-fidelity designs in Figma, finalised with the client.',
      },
      {
        title: 'From design to build',
        body: 'I led the build of the finished design: 20+ responsive pages, hosted on Vercel and DigitalOcean.',
      },
      {
        title: 'Photo sourcing at scale',
        body: 'I automated the sourcing of about 875 photos with Claude Code, through the Pexels and Magnific APIs and a Midjourney connector. ImageKit keeps them fast.',
      },
      {
        title: 'Refine every page',
        body: 'With the photography in place, I refined the design page by page.',
      },
    ],
    decisions: [
      {
        title: 'Design finalised before development',
        body: 'Every page was resolved at high fidelity in Figma first, so the build followed a finished plan.',
      },
      {
        title: 'Fast pages at scale',
        body: 'All 875 photos are served through ImageKit, so an image-heavy site still loads quickly.',
      },
      {
        title: 'Consistency across 20+ pages',
        body: 'Reusable Figma components define the layout once, so every page, and every photo on it, follows the same rules.',
      },
    ],
    screens: [
      shot('inspiration-india', 'hero.jpg', 2000, 1250, 'Home, a full-screen film of India'),
      shot('inspiration-india', 'gallery-01.jpg', 2000, 1250, 'Heritage, with a custom illustration'),
      shot('inspiration-india', 'gallery-02.jpg', 2000, 1250, 'Programmes, 16 journeys across India'),
      shot('inspiration-india', 'gallery-03.jpg', 2000, 1250, 'A programme page'),
    ],
    results: [
      'Live in eight weeks, from wireframe to launch',
      'Client sign-off within four revision rounds',
      '20+ pages and about 875 photos in one consistent visual language',
    ],
    lesson: {
      title: 'Automate the repetitive work, own the design.',
      body: 'Sourcing about 875 photos manually would have taken weeks. Automating that work kept my attention on how every page looks and reads.',
    },
    meta: {
      title: 'Inspiration India · Luxury travel website · Sachin Verma',
      description:
        'Sachin Verma designed the Inspiration India luxury travel website in Figma and led its build, delivering 20+ pages in eight weeks.',
    },
    next: 'zarah-ledger',
  },
  {
    slug: 'zarah-ledger',
    name: 'Zarah Ledger',
    kind: 'product',
    chapter: 'studio',
    status: 'Built, and reviewed with the client over five rounds',
    tags: ['Business app', 'Built, in client review'],
    oneLiner: 'Supplier payments for a travel company, consolidated from email and Excel into one system.',
    summary:
      'Liberty India DMC pays hotels, guides and transport companies for every trip it operates, from offices in India and the UAE. Payment requests arrived by email and were tracked in Excel. Zarah Ledger, a Zarah AI LLP product, brings those payments into one system. It is built and has been reviewed with the client over five rounds.',
    details: [
      { label: 'Role', value: 'UI/UX designer at Zarah AI LLP' },
      { label: 'Client', value: 'Liberty India DMC, India and UAE offices' },
      { label: 'Year', value: '2026' },
      { label: 'Built on', tools: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS'] },
      { label: 'Status', value: 'Built, in review with the client' },
    ],
    liveUrl: null,
    stats: [
      { value: '31', label: 'screens in the app' },
      { value: '2', label: 'offices: India and the UAE' },
      { value: '5', label: 'review rounds with the client' },
    ],
    problem: {
      lead: 'Payment requests arrived by email, bank details came in messages and photos, and payments were tracked in Excel.',
      points: [
        'No single view of what was due',
        'No reliable way to trace a payment later',
        'Bank details scattered across messages',
      ],
    },
    steps: [
      {
        title: 'Design the daily views',
        body: 'A dashboard for each team, built around what needs doing today.',
      },
      {
        title: 'Simplify long forms',
        body: 'Long forms organised into clear sections, with concise guidance under the fields that need it.',
      },
      {
        title: 'Design every state',
        body: 'Empty, full and blocked states, so every screen makes sense on a quiet day or a busy one.',
      },
      {
        title: 'Review with the client',
        body: 'The working app went through five review rounds with the client, the latest in October 2026.',
      },
    ],
    decisions: [
      {
        title: 'Today comes first',
        body: 'Every dashboard opens on what needs doing today, with the totals that matter at the top.',
      },
      {
        title: 'Totals that explain themselves',
        body: 'Each total states what it includes and in which currency, so nobody has to guess before paying.',
      },
      {
        title: 'Every blocked action explains itself',
        body: 'When a payment cannot proceed yet, the reason appears beside the button.',
      },
    ],
    screens: [
      shot('zarah-ledger', 'accounts-dashboard.jpg', 2000, 1004, 'Accounts dashboard (sample data)'),
      shot('zarah-ledger', 'new-trip-file.jpg', 2000, 1006, 'New trip file'),
      shot('zarah-ledger', 'ops-dashboard.jpg', 2000, 1004, 'Ops dashboard (sample data)'),
      shot('zarah-ledger', 'record-payment.jpg', 1984, 996, 'Recording a payment (sample data)'),
    ],
    results: [
      'Built, and reviewed with the client over five rounds',
      'One system for supplier payments, replacing email and Excel',
      'Works in desktop and mobile browsers',
      'A proposal to take it live in both offices',
    ],
    lesson: {
      title: 'In a money app, trust is a design decision.',
      body: 'People act only on payment screens they trust. Clear totals, plain language and a reason for every blocked action mattered as much as the layout.',
    },
    meta: {
      title: 'Zarah Ledger · Supplier payments for a travel company · Sachin Verma',
      description:
        'Zarah Ledger brings Liberty India DMC’s supplier payments into one system. Built at Zarah AI LLP and reviewed with the client over five rounds.',
    },
    next: 'zarahflow',
  },
  {
    slug: 'zarahflow',
    name: 'ZarahFlow',
    kind: 'product',
    chapter: 'studio',
    status: 'Clickable prototype, proposed to the client',
    tags: ['Business app', 'Prototype'],
    oneLiner: 'Lead and order management for a furniture maker, across web and mobile.',
    summary:
      'Sunny Overseas makes custom furniture for hotels, restaurants and outdoor spaces. Its enquiries were scattered across WhatsApp chats, notebooks and Excel. ZarahFlow, a Zarah AI LLP product, brings them into one system. I designed its web app for the office and its mobile app for the sales team, and linked both into a clickable prototype.',
    details: [
      { label: 'Role', value: 'UI/UX designer at Zarah AI LLP' },
      { label: 'Client', value: 'Sunny Overseas, a furniture maker' },
      { label: 'Year', value: '2026' },
      { label: 'Tools', tools: ['Figma'] },
      { label: 'Status', value: 'Clickable prototype, proposed to the client' },
    ],
    liveUrl: null,
    stats: [
      { value: '50+', label: 'screens and dialogs' },
      { value: '2', label: 'apps: web and mobile' },
      { value: '✓', label: 'clickable prototype' },
    ],
    problem: {
      lead: 'Enquiries came in from many channels, then lived in WhatsApp chats, notebooks and Excel.',
      points: ['Leads without a clear owner', 'Follow-ups that slipped', 'No single view of where things stood'],
    },
    steps: [
      {
        title: 'A home for every role',
        body: 'Each person opens the app to their own work, not to everyone’s.',
      },
      {
        title: 'Mobile for the sales team',
        body: 'Salespeople spend the day away from a desk, so their side of ZarahFlow is designed for the phone.',
      },
      {
        title: 'One component system',
        body: 'Buttons, badges, tabs and inputs designed once and shared across web and mobile.',
      },
      {
        title: 'Prototype every state',
        body: 'Menus, pickers, dialogs and confirmations linked into one clickable prototype that behaves like the real product.',
      },
    ],
    decisions: [
      {
        title: 'Colour only where it counts',
        body: 'Warm neutrals for the page, dark buttons for primary actions, and colour reserved for status, so a coloured chip always carries meaning.',
      },
      {
        title: 'What needs attention comes first',
        body: 'Each home screen opens with what needs attention now.',
      },
      {
        title: 'Designed for one-handed use',
        body: 'On mobile, one primary action per card and touch targets sized for the thumb, so salespeople can act between meetings.',
      },
    ],
    screens: [
      shot('zarahflow', 'admin-dashboard.jpg', 1904, 1064, 'Admin dashboard (sample data)'),
      shot('zarahflow', 'my-day.jpg', 1904, 1064, 'A salesperson’s day (sample data)'),
      shot('zarahflow', 'lead-file.jpg', 1904, 1064, 'A lead’s file (sample data)'),
      shot('zarahflow', 'sales-app.jpg', 1700, 1050, 'The sales app on mobile (sample data)'),
    ],
    results: [
      'A clickable prototype of the web app and the mobile app',
      '50+ screens and dialogs from one shared component system',
      'Menus, pickers and confirmations designed alongside the main screens',
      'The prototype went to the client with the proposal',
    ],
    lesson: {
      title: 'Design the handoffs, not just the screens.',
      body: 'Leads were lost between people, not inside any single screen. The moments where work changes hands needed as much design attention as the screens.',
    },
    meta: {
      title: 'ZarahFlow · Lead and order management · Sachin Verma',
      description:
        'ZarahFlow brings a furniture maker’s enquiries into one system. Sachin Verma designed its web and mobile apps at Zarah AI LLP and linked them into a clickable prototype.',
    },
    next: 'inkpot',
  },
];

// The tools a project lists, for the logos on its card.
export function toolsOf(project) {
  return project.details.find((row) => row.tools)?.tools ?? [];
}

export function getProject(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getChapter(id) {
  return chapters.find((chapter) => chapter.id === id) ?? null;
}

export function projectsInChapter(id) {
  return projects.filter((project) => project.chapter === id);
}
