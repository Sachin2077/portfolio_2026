import Link from 'next/link';
import { cx } from '@/lib/cx';

// Button styles from the Figma file:
// primary = "Contact me!", soft = "My projects", dark = "View my journey".
const variants = {
  primary: 'bg-primary text-white/90 shadow-btn-primary hover:bg-[#5c8bfc] active:translate-y-px',
  soft: 'bg-chip text-chip-ink hover:bg-[#c6d7ff] active:translate-y-px',
  dark: 'bg-button-dark border border-[#383838] text-white/90 shadow-btn-dark hover:brightness-110 active:translate-y-px',
};

const sizes = {
  sm: 'h-[35px] px-2.5 text-base',
  md: 'h-12 px-[34px] text-base',
  lg: 'h-[54px] px-[34px] text-base',
};

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-sans font-medium tracking-[0.15px] transition-[background-color,filter,transform] duration-150';

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external = false,
  ...props
}) {
  const classes = cx(base, variants[variant], sizes[size], className);

  if (!href) {
    return (
      <button type="button" className={classes} {...props}>
        {children}
      </button>
    );
  }

  if (external || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
