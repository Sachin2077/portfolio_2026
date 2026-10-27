import { Analytics } from '@vercel/analytics/next';
import { Inter, Pixelify_Sans, Ponomar, Poly, Poppins } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { hero } from '@/content/home';
import { site } from '@/content/site';
import './globals.css';

// Fonts used in the Figma file. Each one is exposed as a CSS variable read by the Tailwind theme.
const inter = Inter({ subsets: ['latin'], variable: '--nf-inter', display: 'swap' });
const ponomar = Ponomar({
  weight: '400',
  subsets: ['latin'],
  variable: '--nf-ponomar',
  display: 'swap',
  adjustFontFallback: false,
});
const pixelify = Pixelify_Sans({ subsets: ['latin'], variable: '--nf-pixelify', display: 'swap' });
const poppins = Poppins({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--nf-poppins',
  display: 'swap',
});
const poly = Poly({ weight: '400', subsets: ['latin'], variable: '--nf-poly', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s · Sachin Verma' },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: 'Sachin Verma · UI/UX Designer',
    description: hero.body,
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630, alt: hero.sceneAlt }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/images/figma/logo-avatar.png' },
};

export const viewport = {
  themeColor: '#f5f5f2',
};

// Tells search engines who the site belongs to, and that the LinkedIn and GitHub profiles are his.
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'UI/UX Designer',
  worksFor: { '@type': 'Organization', name: 'Zarah AI LLP' },
  sameAs: [site.social.linkedin, site.social.github],
};

export default function RootLayout({ children }) {
  // Browser extensions such as Grammarly add attributes to <html> and <body> before React loads.
  // suppressHydrationWarning ignores those two tags' own attributes only, not the page inside them.
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ponomar.variable} ${pixelify.variable} ${poppins.variable} ${poly.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Vercel Web Analytics: page views, sent only from the deployed site. */}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
