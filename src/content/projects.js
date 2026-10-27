// Case studies, in the order they happened. Each one sits in a career chapter and ends with what it taught me.
// Every page at /projects/[slug] renders from its entry here. Images live in public/images/projects/<slug>/.

export const chapters = [
  {
    id: 'start',
    number: 1,
    when: '2024',
    where: 'On my own',
    title: 'Where it started',
    intro:
      'Before client work, I gave myself a brief: an AI tool that writes blog posts. It taught me the first rule I still design by.',
    lesson: 'The input decides the output.',
  },
  {
    id: 'nebula9',
    number: 2,
    when: '2024 to 2025',
    where: 'Nebula9.ai',
    title: 'Designing AI for real clients',
    intro:
      'At a generative AI startup I designed for finance, legal and marketing teams. Each project added one rule to how I work.',
    lesson: 'A design decision can shape the whole product.',
  },
  {
    id: 'studio',
    number: 3,
    when: '2025 to now',
    where: 'Zarah AI LLP',
    title: 'Owning it end to end',
    intro:
      'At the studio I co-founded, I take products from the first document to a prototype, and websites from Figma to the live site.',
    lesson: 'Design and build are one job.',
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
    oneLiner: 'An AI blog writer that asks for a few clear details before it drafts anything.',
    summary:
      'InkPot is a web app concept that turns a title, keywords and sub-headings into a blog post. I designed it alone in 2024, from the landing page to the editor.',
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
      lead: 'Most AI writing tools give you an empty box and a button. You get a post that could be about anything.',
      points: [
        'A blank prompt gives generic output',
        'Pages of settings stop people before they start',
        'Finding images comes after writing, as extra work',
      ],
    },
    steps: [
      {
        title: 'Map the path',
        body: 'From landing page to saved post. Most of the difficulty sat on one screen, the one where you ask.',
      },
      {
        title: 'Split the ask',
        body: 'Language and tone first, then title, keywords and sub-headings, then Start writing.',
      },
      {
        title: 'Design the editor',
        body: 'The article keeps its headings on the left. Suggested images wait on the right.',
      },
      {
        title: 'Close the loop',
        body: 'A landing page that shows a sample post first, a quick sign-in, and a dashboard of past posts.',
      },
    ],
    decisions: [
      {
        title: 'Structured input over an open prompt',
        body: 'Writers already know their title, keywords and sub-headings. Asking for those gives the AI direction and keeps the writer in control.',
      },
      {
        title: 'Images inside the editor',
        body: 'Bloggers look for pictures after they write. The editor suggests them beside the draft, ready to drop in.',
      },
      {
        title: 'Show the output first',
        body: 'The landing page leads with a sample post, so visitors judge the writing before they sign up.',
      },
    ],
    screens: [
      shot('inkpot', 'hero.jpg', 2000, 6422, 'Landing page, from the first screen to pricing'),
      shot('inkpot', 'gallery-01.jpg', 2000, 1302, 'Editor with AI image suggestions beside the draft'),
      shot('inkpot', 'gallery-02.jpg', 2000, 1299, 'Dashboard with usage cards (sample numbers)'),
      shot('inkpot', 'gallery-03.jpg', 2000, 1302, 'Blog creator in three short steps'),
    ],
    results: [
      'A full product flow, from landing page to saved post',
      'A three-step input in place of the blank prompt',
      'An editor with image suggestions built in',
    ],
    lesson: {
      title: 'The hardest part of an AI tool is the input.',
      body: 'A blank box gets a generic post. A few clear fields get a draft worth editing. I carry this into every AI product I design.',
    },
    meta: {
      title: 'InkPot · AI blog-writing app concept · Sachin Verma',
      description:
        'InkPot is a self-initiated 2024 concept for an AI blog-writing app. Sachin Verma designed it and learned that the hardest part of an AI tool is the input.',
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
      'FinGen is a financial planning platform with an AI chatbot. I designed it from scratch for a Nebula9.ai client while the requirements were still changing. It shipped to production.',
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
      lead: 'Financial data was growing faster than the team could read it, and the answers sat in spreadsheets.',
      points: [
        'Getting an answer needed deep knowledge of the data',
        'Spreadsheets and manual reports did not scale',
        'Sensitive financial data to protect',
      ],
    },
    steps: [
      {
        title: 'Shape the brief',
        body: 'Requirements were incomplete, so I took a position on what each feature should do and who it was for.',
      },
      {
        title: 'Map every flow',
        body: 'Every path through the product, mapped first. AI tools helped me check that the flows held up.',
      },
      {
        title: 'Prioritise by use',
        body: 'The screens people use most got the most room. Everything else stayed close but out of the way.',
      },
      {
        title: 'Prototype and review',
        body: '20+ screens in a clickable prototype, revised over three review cycles until the client approved it.',
      },
    ],
    decisions: [
      {
        title: 'Never start from a blank box',
        body: 'The home screen offers example questions, so nobody has to guess what to ask.',
      },
      {
        title: 'The number comes first',
        body: 'In a paragraph, people hunt for the number. Highlighted figures and simple charts put it where the eye lands first.',
      },
      {
        title: 'One visual system',
        body: 'Every screen shares the same cards, tables and navigation, so nobody learns the product twice.',
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
      body: 'The most useful thing I designed on FinGen was not a screen but a rule underneath the screens. It also taught me to take a position early when the brief is still moving.',
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
      'Edro helps legal teams work with complex documents. Its AI was already there, hidden under dated screens. I redesigned the whole product, from how it is organised to how it looks.',
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
      lead: 'The AI was capable, but dated, cluttered screens hid what it could do.',
      points: [
        'A dated look with no clear hierarchy',
        'Navigation that made people hunt for things',
        'No shared components, so no two screens matched',
      ],
    },
    steps: [
      {
        title: 'Audit every screen',
        body: 'I logged what was broken and where people got lost. The product was missing structure, not features.',
      },
      {
        title: 'Give it a clear structure',
        body: 'I reorganised the product so every screen has one clear job.',
      },
      {
        title: 'Build the system',
        body: 'A design system tuned for long legal text, and brand guidelines so it stays consistent after handoff.',
      },
      {
        title: 'Design every state',
        body: 'Empty, loading, error and success, linked into one clickable prototype for review.',
      },
    ],
    decisions: [
      {
        title: 'One look across every screen',
        body: 'Shared components mean a table, a button or a form field looks and works the same on every screen.',
      },
      {
        title: 'Type for long reading',
        body: 'Legal documents run long, so the type is set for comfortable reading, not quick scanning.',
      },
      {
        title: 'A 60-30-10 colour rule',
        body: 'A main colour for 60% of each screen, a second for 30%, an accent for 10%. Written into the brand guidelines so new screens keep the balance.',
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
      'The client was extremely satisfied with the result',
    ],
    lesson: {
      title: 'Redesigning a product is more than redesigning screens.',
      body: 'Screens can improve in a day. Structure, journeys and design rules outlast my time on the project.',
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
      'ExcelliLens helps chief marketing officers see what is happening with their customers and campaigns, and decide what to do. I revamped the application with a new interface that is more efficient, clearer and built around what each screen is for. As the main designer, I led two designers and was the client’s first point of contact.',
    details: [
      { label: 'Role', value: 'Main designer and the client’s first contact' },
      { label: 'Client', value: 'Confidential (NDA)' },
      { label: 'Team', value: 'Me, leading 2 designers' },
      { label: 'Timeline', value: 'Under 4 months' },
      {
        label: 'Tools',
        tools: ['Figma', 'Canva', 'Freepik', 'Dribbble'],
        note: 'Figma for wireframes and design, Canva for icons and illustrations, Freepik for assets, Dribbble for inspiration.',
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
      lead: 'CMOs had the right data in the wrong experience. Customers, campaigns and brand tracking each felt like a separate product.',
      points: [
        'Dense screens with no clear order',
        'Heavy analytics buried under clutter',
        'Simple answers needed deep system knowledge',
      ],
    },
    steps: [
      {
        title: 'Learn the CMO’s world',
        body: 'The decisions they make, the data that exists, and how it moves through Google Cloud, BigQuery ML and Vertex AI.',
      },
      {
        title: 'Own the client conversation',
        body: 'I talked to the client directly, took their changes and suggestions, helped with brainstorming, and delivered work on time every day.',
      },
      {
        title: 'Rebuild the interface',
        body: 'Wireframes first, then a new interface for the whole application: more efficient, clearer, and built around what each screen is for.',
      },
      {
        title: 'Lead two designers',
        body: 'One component set for both lenses. Two designers worked under me, and together we designed 62+ screens.',
      },
    ],
    decisions: [
      {
        title: 'Insight first, data second',
        body: 'Each view opens with the takeaway in plain words. The charts and tables sit below for anyone who wants to check.',
      },
      {
        title: 'Lenses that point to each other',
        body: 'From a high-value customer segment, a CMO jumps straight to how campaigns perform for that same group.',
      },
      {
        title: 'Heavy analysis in layers',
        body: 'Marketing mix modeling shows a summary first, then charts, then raw tables. Each person picks their own depth.',
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
      'Work delivered to the client on time, every day',
      'Complex AI outputs made readable for non-technical leaders',
      'The client praised the work directly on delivery',
    ],
    lesson: {
      title: 'Design for the person deciding, not the analyst.',
      body: 'The models could produce far more numbers than a CMO has time for. My job was choosing which one they see first. Leading two designers taught me to hold one vision across other hands.',
    },
    meta: {
      title: 'ExcelliLens · AI decision support for CMOs · Sachin Verma',
      description:
        'ExcelliLens unites customer, marketing and brand data for CMOs. Sachin Verma revamped its interface as the main designer, leading two designers across 62+ screens.',
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
    oneLiner: 'One AI workspace for travel agencies, in place of the four or five tools they juggle.',
    summary:
      'Zarah is an AI workspace for travel agencies and event planners. As the only designer, I took it from a requirements document to a production-ready prototype.',
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
      lead: 'Agents work across Gmail, shared drives and spreadsheets. To answer one client question they might open four or five tools.',
      points: [
        'Key details buried in email threads',
        'Client history lost between colleagues',
        'No link between what was asked and what was delivered',
      ],
    },
    steps: [
      {
        title: 'Break down the PRD',
        body: 'I read the requirements document closely and set out what the first version needed.',
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
        body: 'The yellow of the Zarah AI mark runs through every screen, from the menu to the AI’s answers, so the product feels like one brand.',
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
      body: 'Working alone from PRD to prototype, I had to decide whether each screen should exist, not just how it looks.',
    },
    meta: {
      title: 'Zarah · AI workspace for travel agencies · Sachin Verma',
      description:
        'Zarah is an AI workspace for travel agencies. As the only designer, Sachin Verma took it from a requirements document to a production-ready prototype.',
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
    oneLiner: 'A luxury travel website I designed in Figma and built with Claude Code.',
    summary:
      'Liberty India plans luxury trips across India for travellers from Europe. Their old Webflow site said little about India or the brand. I redesigned it end to end and built the front end with Claude Code.',
    details: [
      { label: 'Role', value: 'Sole designer and builder, with Claude Code' },
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
      lead: 'For a company selling costly trips, the website is the first impression. The old one looked dated, hid the itineraries and went largely unused.',
      points: [
        'A dated Webflow design that undercut a luxury brand',
        'Itineraries, the most persuasive content, were buried',
        'It said little about India or Liberty India',
      ],
    },
    steps: [
      {
        title: 'Agree the goal',
        body: 'Stakeholder sessions set two jobs: show India as a destination and make the brand clear.',
      },
      {
        title: 'Design in Figma',
        body: 'Every section designed first, with reusable components and a plan for the content.',
      },
      {
        title: 'Write like a magazine',
        body: 'Long reads on Heritage, Culture, Architecture and Nature, reviewed with the client as they took shape.',
      },
      {
        title: 'Build and launch',
        body: 'Claude Code built it in Next.js one section at a time, and I checked each against the Figma file. Live on the client’s own domain.',
      },
    ],
    decisions: [
      {
        title: 'Show the journey, don’t list it',
        body: 'Each of the 15 itineraries has its own route map on one shared map of India. A script renders all 15, so they match.',
      },
      {
        title: 'One pattern for seven pages',
        body: 'A full-width slideshow with a floating text card gives every service page one look. A new service needs no new design.',
      },
      {
        title: 'Speed is part of the design',
        body: 'Every image goes through ImageKit, which cut image sizes by half. Big photographs, still a fast site.',
      },
    ],
    screens: [
      shot('liberty-india', 'hero.jpg', 2000, 1007, 'Home, the first impression'),
      shot('liberty-india', 'gallery-01.jpg', 2000, 1010, 'Heritage, set like a magazine feature'),
      shot('liberty-india', 'gallery-02.jpg', 2000, 2417, 'Our Services: one pattern for every service'),
      shot('liberty-india', 'gallery-03.jpg', 2000, 1013, 'An itinerary page, Gems of South India'),
      shot('liberty-india', 'gallery-04.jpg', 2000, 992, 'Contact, wired to the team’s inbox'),
    ],
    results: [
      'Live on the client’s own domain, replacing the old Webflow site',
      '100/100 SEO and 90/100 performance on PageSpeed Insights',
      '15 route maps from one system, none drawn by hand',
      'A scope log kept for the client, so nothing changed by surprise',
    ],
    lesson: {
      title: 'Design and build became one job.',
      body: 'Owning the build meant every visual decision was also an engineering decision. The small details that make a site feel luxurious did not get lost between Figma and the live site.',
    },
    meta: {
      title: 'Liberty India · Luxury travel website · Sachin Verma',
      description:
        'Sachin Verma designed the Liberty India travel website and built it in Next.js with Claude Code. It has a 100/100 SEO score on Google PageSpeed Insights.',
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
      'Guests book 39 boutique hotels in Istanbul directly on this site. I designed it, built the front end with Claude Code, and did the search and server work that let it take payments.',
    details: [
      { label: 'Role', value: 'Designer and builder, with Claude Code' },
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
      lead: 'A direct booking comes down to three moments: the guest finds the hotel, the page opens, and they pay. If one fails, the booking goes elsewhere.',
      points: [
        'Hotel pages had to load fast',
        'Search engines had to be able to read them',
        'The server had to pass a payment gateway’s review',
      ],
    },
    steps: [
      { title: 'Design in Figma', body: 'The site and every hotel page, designed before any code.' },
      {
        title: 'Build and launch',
        body: 'Built with Claude Code, first in React and Vite. After launch, I led the move to Next.js.',
      },
      {
        title: 'Audit the site',
        body: 'How it shows up in search, how fast it loads, and how secure it is.',
      },
      {
        title: 'Harden the server',
        body: 'Firewall, server and SSH settings on DigitalOcean, changed to meet the payment gateway’s rules.',
      },
    ],
    decisions: [
      {
        title: 'Hotel pages built ahead of time',
        body: 'With static rendering in Next.js, each hotel page arrives whole and fast, for guests and for search engines.',
      },
      {
        title: 'See what Google sees',
        body: 'I set up Google Search Console and indexing, so we know which hotel pages Google has picked up.',
      },
      {
        title: 'The server is part of the site',
        body: 'None of it shows on the page, but it decides whether a guest can pay there.',
      },
    ],
    screens: [
      shot('bookunitedhotels', 'hero.jpg', 2000, 1250, 'Home, with hotel search up front'),
      shot('bookunitedhotels', 'gallery-01.jpg', 1440, 810, 'Hotel picks with nightly prices'),
      shot('bookunitedhotels', 'gallery-02.jpg', 1440, 580, 'Handpicked hotels, inspected on site'),
    ],
    results: [
      'Live, with hotel pages pre-built in Next.js',
      'Search Console set up and indexing configured',
      'Approved by the payment gateway after the audit',
    ],
    lesson: {
      title: 'Learn what the work needs.',
      body: 'The site could not take payments until the server met the gateway’s rules, so I learned that part too. A booking site is finished only when a guest can find it, open it and pay.',
    },
    meta: {
      title: 'BookUnitedHotels · Hotel booking website · Sachin Verma',
      description:
        'BookUnitedHotels lets guests book 39 boutique hotels in Istanbul directly. Sachin Verma designed the site, built its front end with Claude Code and moved it to Next.js.',
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
    oneLiner:
      'A luxury travel website for India, designed in Figma and built with Claude Code, with about 875 photos sourced through APIs.',
    summary:
      'Inspiration India is a luxury travel company. I took its website from low-fidelity wireframes to high-fidelity mockups in Figma, then built it with Claude Code. The site needed about 875 photos, so I had Claude Code source them through the Pexels and Magnific APIs, a Midjourney connector and more.',
    details: [
      { label: 'Role', value: 'Designer and builder, with Claude Code' },
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
      { value: '~875', label: 'photos, sourced with Claude Code' },
      { value: '4', label: 'revision rounds' },
    ],
    problem: {
      lead: 'A travel website sells with its pictures. This one needed about 875 of them across 20+ pages, on an eight-week timeline.',
      points: [
        '20+ pages to design and build',
        'About 875 photos to find and place',
        'Eight weeks from wireframe to launch',
      ],
    },
    steps: [
      {
        title: 'Wireframes to mockups',
        body: 'Low-fidelity wireframes first, then high-fidelity mockups in Figma, finalised with the client.',
      },
      {
        title: 'Design into code',
        body: 'I built the finished Figma design with Claude Code: 20+ responsive pages, hosted on Vercel and DigitalOcean.',
      },
      {
        title: 'About 875 photos',
        body: 'Claude Code sourced them through the Pexels and Magnific APIs and a Midjourney connector. ImageKit keeps them fast.',
      },
      {
        title: 'Refine every page',
        body: 'With the photos in place, I refined the design page by page.',
      },
    ],
    decisions: [
      {
        title: 'Finish the design before the code',
        body: 'Every page was settled at high fidelity in Figma first, so the build followed a finished plan, not a moving one.',
      },
      {
        title: 'Let AI do the searching',
        body: 'Finding 875 photos one at a time would have taken weeks. Claude Code searched the sources through their APIs, so my time went into the design.',
      },
      {
        title: 'One look across 20 pages',
        body: 'Reusable Figma components set the layout once, so every page, and every photo on it, follows the same rules.',
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
      '20+ pages and about 875 photos in one consistent look',
    ],
    lesson: {
      title: 'Automate the repetitive work, own the design.',
      body: 'Sourcing about 875 photos by hand would have taken weeks. Claude Code did the searching through APIs, which kept my attention on how every page looks and reads.',
    },
    meta: {
      title: 'Inspiration India · Luxury travel website · Sachin Verma',
      description:
        'Sachin Verma designed the Inspiration India luxury travel website in Figma and built it with Claude Code, sourcing about 875 photos through APIs.',
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
    oneLiner: 'Supplier payments for a travel company, in one place instead of email and Excel.',
    summary:
      'Liberty India DMC pays hotels, guides and transport companies for every trip it runs, from offices in India and the UAE. Payment requests went by email and were tracked in Excel. Zarah Ledger, a product of Zarah AI LLP, brings those payments into one place. It is built, and has been reviewed with the client over five rounds.',
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
        'No easy way to trace a payment later',
        'Bank details scattered across messages',
      ],
    },
    steps: [
      {
        title: 'Design the daily views',
        body: 'A dashboard for each team, built around what needs doing today.',
      },
      {
        title: 'Calm the long forms',
        body: 'Long forms split into clear sections, with a short hint under the fields that need one.',
      },
      {
        title: 'Design every state',
        body: 'Empty, full and blocked states, so a screen still makes sense on a quiet day or a busy one.',
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
        body: 'Each total says what it adds up and in which currency, so nobody has to guess before paying.',
      },
      {
        title: 'Every block says why',
        body: 'When a payment cannot go ahead yet, the reason sits right beside the button.',
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
      'One place for supplier payments, in place of email and Excel',
      'Works in desktop and phone browsers',
      'A proposal to take it live in both offices',
    ],
    lesson: {
      title: 'In a money app, trust is a design decision.',
      body: 'People only act on a payment screen they trust. Clear totals, plain words and a reason for every block did as much for that as the layout.',
    },
    meta: {
      title: 'Zarah Ledger · Supplier payments for a travel company · Sachin Verma',
      description:
        'Zarah Ledger brings Liberty India DMC’s supplier payments into one place. Built at Zarah AI LLP and reviewed with the client over five rounds.',
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
    oneLiner: 'Leads and orders for a furniture maker, in one place on the web and on the phone.',
    summary:
      'Sunny Overseas makes custom furniture for hotels, restaurants and outdoor spaces. Its enquiries were spread across WhatsApp chats, notebooks and Excel. ZarahFlow, a product of Zarah AI LLP, brings them into one place. I designed its web app for the office and its phone app for the sales team, and linked them into a clickable prototype.',
    details: [
      { label: 'Role', value: 'UI/UX designer at Zarah AI LLP' },
      { label: 'Client', value: 'Sunny Overseas, a furniture maker' },
      { label: 'Year', value: '2026' },
      { label: 'Tools', tools: ['Figma'] },
      { label: 'Status', value: 'Clickable prototype, proposed to the client' },
    ],
    liveUrl: null,
    stats: [
      { value: '50+', label: 'screens and pop-ups' },
      { value: '2', label: 'apps: web and phone' },
      { value: '✓', label: 'clickable prototype' },
    ],
    problem: {
      lead: 'Enquiries came in from many places, then lived in WhatsApp chats, notebooks and Excel.',
      points: ['Leads without a clear owner', 'Follow-ups that slipped', 'No single view of where things stood'],
    },
    steps: [
      {
        title: 'A home for every role',
        body: 'Each person opens the app to the work that is theirs, not to everyone’s.',
      },
      {
        title: 'An app for the road',
        body: 'Salespeople spend the day away from a desk, so their side of ZarahFlow is built for the phone.',
      },
      {
        title: 'One set of parts',
        body: 'Buttons, badges, tabs and inputs designed once and shared by every screen, on the web and the phone.',
      },
      {
        title: 'Prototype every state',
        body: 'Menus, pickers, pop-ups and confirmations linked into one clickable prototype, so it feels like the real product.',
      },
    ],
    decisions: [
      {
        title: 'Colour only where it counts',
        body: 'Warm neutrals for the page, dark buttons for the main actions, and colour kept for status, so a coloured chip always means something.',
      },
      {
        title: 'What needs attention comes first',
        body: 'Each home screen opens with what needs a look now, before anything else.',
      },
      {
        title: 'Built for a thumb',
        body: 'On the phone, one main action per card and buttons sized for a thumb, so a salesperson can act between meetings.',
      },
    ],
    screens: [
      shot('zarahflow', 'admin-dashboard.jpg', 1904, 1064, 'Admin dashboard (sample data)'),
      shot('zarahflow', 'my-day.jpg', 1904, 1064, 'A salesperson’s day (sample data)'),
      shot('zarahflow', 'lead-file.jpg', 1904, 1064, 'A lead’s file (sample data)'),
      shot('zarahflow', 'sales-app.jpg', 1700, 1050, 'The sales app on the phone (sample data)'),
    ],
    results: [
      'A clickable prototype of the web app and the phone app',
      '50+ screens and pop-ups from one shared set of components',
      'Menus, pickers and confirmations designed, not just the main screens',
      'The prototype went to the client with the proposal',
    ],
    lesson: {
      title: 'Design the handoffs, not just the screens.',
      body: 'Leads got lost between people, not inside any one screen. The moments where work changes hands needed as much design as the screens did.',
    },
    meta: {
      title: 'ZarahFlow · Leads and orders for a furniture maker · Sachin Verma',
      description:
        'ZarahFlow brings a furniture maker’s enquiries into one place. Sachin Verma designed its web app and phone app at Zarah AI LLP and linked them into a clickable prototype.',
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
