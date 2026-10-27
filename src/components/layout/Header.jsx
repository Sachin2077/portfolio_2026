'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import SocialLinks from '@/components/ui/SocialLinks';
import { navLinks, sectionHref } from '@/content/site';
import { cx } from '@/lib/cx';

const sectionIds = navLinks.map((link) => link.id);

// Highlights the nav link for the section that crosses the middle of the screen.
function useActiveSection(enabled) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    if (!enabled) return undefined;
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-[18px]" aria-label="Sachin Verma, home">
      <span className="relative size-11 shrink-0 rounded-lg bg-logo-tile md:size-14">
        <Image
          src="/images/figma/logo-avatar.png"
          alt=""
          width={50}
          height={50}
          priority
          className="absolute inset-[3px] size-[calc(100%-6px)] object-cover"
        />
      </span>
      <span className="whitespace-nowrap font-pixel text-[22px] leading-none tracking-[0.15px] text-black md:text-[29px]">
        Sachin Portfolio
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const sectionInView = useActiveSection(onHome);
  const active = onHome ? sectionInView : pathname.startsWith('/projects') ? 'projects' : null;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas shadow-header">
      <div className="relative flex h-[72px] items-center justify-between px-5 md:h-[90px] md:px-8 2xl:px-[72px]">
        <Logo />

        <nav
          aria-label="Main"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:block"
        >
          <ul className="flex items-center gap-6">
            {navLinks.map((link, i) => (
              <li key={link.id} className="flex items-center gap-6">
                {i > 0 ? <span aria-hidden className="h-[15px] w-px bg-divider" /> : null}
                <Link
                  href={sectionHref(link.id)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={cx(
                    'whitespace-nowrap text-[17px] font-medium leading-[22.5px] tracking-[0.15px] transition-colors 2xl:text-[20px]',
                    active === link.id ? 'text-link' : 'text-graphite/80 hover:text-link',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <SocialLinks />
          </div>
          <span className="hidden sm:block">
            <Button href="#contact" size="lg" className="w-[151px] px-0">
              Contact me
            </Button>
          </span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg bg-tile shadow-tile xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className={cx('h-[3px] w-5 bg-pixel transition-transform', menuOpen && 'translate-y-2 rotate-45')} />
              <span className={cx('h-[3px] w-5 bg-pixel-soft transition-opacity', menuOpen && 'opacity-0')} />
              <span className={cx('h-[3px] w-5 bg-pixel transition-transform', menuOpen && '-translate-y-2 -rotate-45')} />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!menuOpen}
        className="border-t border-line bg-canvas px-5 pb-6 pt-2 xl:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={sectionHref(link.id)}
                onClick={() => setMenuOpen(false)}
                aria-current={active === link.id ? 'location' : undefined}
                className={cx(
                  'block border-b border-line py-3.5 text-lg font-medium tracking-[0.15px]',
                  active === link.id ? 'text-link' : 'text-graphite/80',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          href="#contact"
          size="md"
          className="mt-5 w-full"
          onClick={() => setMenuOpen(false)}
        >
          Contact me
        </Button>
        <SocialLinks labelled className="mt-5" />
      </nav>
    </header>
  );
}
