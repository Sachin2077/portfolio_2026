# Sachin Verma · Portfolio

The pixel-art portfolio, built from the Figma file **Portfolio → "Portfolio - revamp" → Frame 31**.

- **React 19** with **Next.js 16** (App Router, JavaScript, no Vite, no TypeScript)
- **Tailwind CSS 4** with design tokens taken from Figma
- Fonts from Figma, served by `next/font`: Inter, Ponomar, Pixelify Sans, Poppins, Poly
- Every page is static HTML at build time, so it can be hosted anywhere. Vercel is the easiest.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/app/globals.css` | Design tokens (colours, fonts, shadows) from Figma, plus a few utilities |
| `src/app/layout.jsx` | Fonts, SEO metadata, header and footer around every page |
| `src/app/page.jsx` | Home page: puts the sections in order |
| `src/app/projects/[slug]/page.jsx` | One template for every case-study page |
| `src/app/not-found.jsx` | 404 page |
| `src/content/site.js` | Name, email, social links, nav labels |
| `src/content/home.js` | **All home page copy**, section by section |
| `src/content/projects.js` | **All case-study copy**, one entry per project |
| `src/components/layout/` | Header (sticky, mobile menu, active section) and footer |
| `src/components/sections/` | Hero, tagline band, about, beliefs, journey, projects, scope of work |
| `src/components/ui/` | Small shared pieces: buttons, chips, pixel badges, pixel cards, section titles |
| `src/lib/pixels.js` | Pixel ornaments from Figma (number brackets, arrows, dashes) as data |
| `public/images/figma/` | Images exported from Figma |
| `public/images/icons/` | SVG icons exported from Figma |

## Changing the words

All copy lives in `src/content/`. Edit the text there and the page updates. No component needs to change.

- Hero headline: `hero.headline` in `home.js`. The `accent` part shows in blue.
- Career chapters: `chapters` at the top of `projects.js`. Each project names its `chapter`, and the Projects section groups cards under it.
- Selected work: `featured` in `projects.js` lists the strongest projects in display order. The first two get full-width cards.
- Tools: `scope.tools` in `home.js`. Each tool names a logo file in `public/images/tools/` (brand marks from Simple Icons, or each company's own site or app-store icon).
- A project's tools: the `Tools` row in its `details` lists tool names, and each shows with its logo on the case study and the Selected work card. Logos come from the Tools section; tools only a project uses are in `src/lib/tool-logos.js`.
- Hero image: `public/images/hero/city-rooftop.png`, kept at 2× the hero's width (3876 × 2182) so it stays sharp on retina screens.
- A new case study: add an entry to `projects.js` with the same keys as the others, give it a `chapter`, and set `next` on the project before it.
- Case-study screenshots: put them in `public/images/projects/<slug>/` and list them in the project's `screens`. The first one is the cover.

## Sizes on laptops and desktops

From 1200px wide up, the page is the 1920px Figma frame scaled to fit the window, never below 67%. A 1280px laptop sees it the way it looked at 67% browser zoom, a 1440px laptop at 75%, and a 1920px screen at full size. Phones and tablets keep their own layouts at full size.

Write sizes in px, as Figma gives them. When the site builds, `postcss-pxtorem` turns every px in the CSS into rem, and the root font size in `globals.css` does the scaling. For a size set in JavaScript, use `rem()` from `src/lib/rem.js`.

## Contact form

The form in the footer sends each note to your inbox through [Resend](https://resend.com), from the server action in `src/lib/contact.js`. Its words live in `footer.form` in `home.js`.

It needs a Resend API key. Copy `.env.example` to `.env.local` and fill it in for local use. On Vercel, add the same variables, or install the Resend integration from the Vercel Marketplace, which sets `RESEND_API_KEY` for you. Until a key is set, the form says the note didn't send and points visitors to your email address.

## How it maps to Figma

| Figma layer | Component |
| --- | --- |
| Header (81:34) | `components/layout/Header.jsx` |
| Frame 58 + city image (121:32, 85:80) | `components/sections/Hero.jsx` |
| Frame 35 (87:747) | `components/sections/TaglineBand.jsx` |
| Frame 59 (136:36) | `components/sections/About.jsx` |
| What I believe, cards 137:49 / 137:84, "next" arrow | `components/sections/Beliefs.jsx` |
| My Journey, Frame 67 and Frame 55 cards, card 113:4838 | `components/sections/Journey.jsx` |
| Footer (138:241) | `components/layout/Footer.jsx` |

Projects and Scope of work are not drawn in Figma yet. They reuse the same frames, cards, chips and type.
