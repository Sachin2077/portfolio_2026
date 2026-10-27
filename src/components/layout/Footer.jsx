import Link from 'next/link';
import ContactForm from '@/components/layout/ContactForm';
import CopyEmail from '@/components/layout/CopyEmail';
import SocialLinks from '@/components/ui/SocialLinks';
import { footer } from '@/content/home';
import { navLinks, sectionHref, site } from '@/content/site';
import { rem } from '@/lib/rem';

const linkClass =
  'text-[13.9px] font-medium leading-[21px] tracking-[0.15px] text-ink/80 transition-colors hover:text-primary';

const siteLinks = navLinks.slice(0, 4);
const moreLinks = [
  { label: navLinks[4].label, href: sectionHref(navLinks[4].id) },
  { label: 'Contact me', href: `mailto:${site.email}` },
  { label: 'Back to top', href: sectionHref('home') },
];

function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="size-[10px]" aria-hidden focusable="false">
      <path
        d="M5 9.2S8.1 6.4 8.1 4.1a3.1 3.1 0 0 0-6.2 0C1.9 6.4 5 9.2 5 9.2Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="5" cy="4.1" r="1.05" fill="currentColor" />
    </svg>
  );
}

// Figma: "Footer" 138:241, with a contact form added on the right. The words are Sachin's.
export default function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="footer-title"
      className="relative mt-[clamp(120px,11.5vw,220px)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[39.4%] top-[-22px] hidden h-[610px] w-[54.8%] md:block"
        style={{
          backgroundImage: 'url(/images/figma/footer-grid.png)',
          backgroundSize: `${rem(734)} ${rem(610)}`,
          backgroundPosition: 'left top',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle ${rem(608)} at ${rem(576)} ${rem(342)}, rgb(245 245 242 / 0) ${rem(182)}, #f5f5f2 ${rem(486)})`,
          }}
        />
      </div>

      <div className="container-page relative z-10 pb-20 pt-[78px] xl:pb-[87px]">
        {/* The words and links on the left, the contact form on the right, over the grid. */}
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-start lg:gap-12 xl:pl-[197px]">
          <div>
            <h2
              id="footer-title"
              className="text-[clamp(28px,1.9vw,36.4px)] font-normal leading-[1.26] text-ink/80"
            >
              <span className="block">{footer.heading}</span>
              <span className="block text-ink/50">{footer.subheading}</span>
            </h2>

            <div className="mt-[46px]">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-[13.9px] font-medium leading-[21px] tracking-[0.15px] text-ink/50">
                  {footer.pinnedLabel}
                </span>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
                <CopyEmail
                  email={site.email}
                  className="rounded-full bg-pill px-2.5 py-0.5 text-[11.1px] font-semibold tracking-[0.1px] text-ink/70 shadow-pill transition-colors hover:text-primary"
                />
              </p>

              <nav aria-label="Footer" className="mt-8 grid w-fit grid-cols-[auto_auto] gap-x-20">
                <ul className="flex flex-col gap-2.5">
                  {siteLinks.map((link) => (
                    <li key={link.id}>
                      <Link href={sectionHref(link.id)} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-2.5">
                  {moreLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <SocialLinks labelled className="mt-10" />

            <p className="mt-10 flex flex-wrap items-center gap-1.5 text-[11.1px] font-medium leading-[16.8px] tracking-[0.12px] text-ink/50">
              Based in
              <span className="inline-flex h-[18px] items-center gap-1 rounded-[17px] bg-pill/50 px-[7px] text-[9.4px] font-semibold leading-[10px] tracking-[0.1px] text-ink/70 shadow-pill">
                <PinIcon />
                {site.location}
              </span>
              {site.country} · {site.timezone}
            </p>
            <p className="mt-2.5 text-[10.9px] font-medium leading-[16.8px] tracking-[0.12px] text-muted">
              Copyright © {new Date().getFullYear()} {site.name}
            </p>
            <p className="mt-[26px] text-[10.9px] font-medium leading-[16.8px] tracking-[0.12px] text-muted">
              {footer.credit.lead} <span className="text-ink/50">{footer.credit.strong}</span>
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <div
        className="relative h-[75px] bg-repeat-x"
        style={{
          backgroundImage: 'url(/images/figma/footer-grass.png)',
          backgroundSize: `auto ${rem(75)}`,
          backgroundPosition: 'center bottom',
        }}
      >
        <p className="absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1.5 px-4 text-center text-[11.1px] font-medium leading-[16.8px] tracking-[0.12px] text-moss [text-shadow:0_0.5px_0.5px_#d8ffd4]">
          Made with
          <img src="/images/icons/footer-heart.svg" alt="love" width={11} height={11} className="size-[11px]" />
          {footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
