import { toolLogo } from '@/lib/tool-logos';
import { cx } from '@/lib/cx';

// The tools behind a project, as small logo chips. `compact` shows the logos alone, with each name for
// screen readers and on hover.
export default function ToolList({ tools, compact = false, className }) {
  return (
    <ul className={cx('flex flex-wrap', compact ? 'gap-1.5' : 'gap-2', className)}>
      {tools.map((name) => {
        const logo = toolLogo(name);
        return (
          <li
            key={name}
            title={compact ? name : undefined}
            className={cx(
              'inline-flex items-center rounded-lg bg-white shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-black/[0.05]',
              compact
                ? 'size-8 justify-center'
                : 'h-8 gap-2 pl-2 pr-2.5 text-[13.5px] font-medium leading-none text-ink/75',
            )}
          >
            {logo ? (
              <img
                src={`/images/tools/${logo}`}
                alt=""
                width={18}
                height={18}
                loading="lazy"
                decoding="async"
                className="size-[18px] rounded-[4px] object-contain"
              />
            ) : null}
            {compact ? <span className="sr-only">{name}</span> : name}
          </li>
        );
      })}
    </ul>
  );
}
