import { site } from '@/content/site';
import { cx } from '@/lib/cx';

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" className="size-[15px]" aria-hidden focusable="false">
      <path
        fill="#262323"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return <img src="/images/icons/footer-linkedin.svg" alt="" width={14} height={14} className="size-[14px]" />;
}

const profiles = [
  { name: 'LinkedIn', href: site.social.linkedin, Icon: LinkedInIcon },
  { name: 'GitHub', href: site.social.github, Icon: GitHubIcon },
];

// LinkedIn and GitHub, from site.js. `labelled` shows each name beside its icon; without it the icons stand
// alone, and screen readers still hear the name.
export default function SocialLinks({ labelled = false, className }) {
  return (
    <ul className={cx('flex items-center gap-2.5', className)}>
      {profiles.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labelled ? undefined : `Sachin Verma on ${name}, opens in a new tab`}
            className={cx(
              'inline-flex h-9 items-center justify-center rounded-lg border border-graphite/10 bg-canvas shadow-social transition-transform hover:-translate-y-0.5',
              labelled ? 'gap-2 px-3 text-[13.9px] font-medium tracking-[0.15px] text-ink/80' : 'w-9',
            )}
          >
            <Icon />
            {labelled ? (
              <>
                {name}
                <span className="sr-only">, opens in a new tab</span>
              </>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
