import { cx } from '@/lib/cx';

// The brand sheet's window: a bar with three pixel dots and an address, framing a screen.
export default function BrowserFrame({ path, children, className }) {
  return (
    <div className={cx('overflow-hidden rounded-[7.14px] bg-canvas shadow-float', className)}>
      <div aria-hidden className="flex h-9 items-center gap-2 border-b border-line bg-tile px-4">
        <span className="size-2 bg-[#ff8ca8]" />
        <span className="size-2 bg-[#ffd166]" />
        <span className="size-2 bg-[#7ee7c8]" />
        {path ? (
          <span className="ml-3 min-w-0 truncate font-pixel text-[13px] text-ink/45">{path}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
