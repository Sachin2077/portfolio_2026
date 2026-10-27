import { scope } from '@/content/home';
import { cx } from '@/lib/cx';

const pad = (n) => String(n).padStart(2, '0');

// Static class names, so Tailwind generates them.
const SPAN = {
  4: 'xl:col-span-4',
  5: 'xl:col-span-5',
  6: 'xl:col-span-6',
  7: 'xl:col-span-7',
  8: 'xl:col-span-8',
  12: 'xl:col-span-12',
};

// The groups between two featured ones, which share a row.
function rowOf(groups, index) {
  let start = index;
  let end = index;
  while (start > 0 && !groups[start - 1].featured) start -= 1;
  while (end < groups.length - 1 && !groups[end + 1].featured) end += 1;
  return { row: groups.slice(start, end + 1), at: index - start };
}

// From 1200px, featured groups take a full row. Two groups share a row by how many tools each holds,
// so tiles sit at a similar spacing in both cards. Three split it evenly.
function spanFor(groups, index) {
  if (groups[index].featured) return 12;
  const { row, at } = rowOf(groups, index);
  if (row.length !== 2) return 12 / row.length;
  const [a, b] = row.map((group) => group.items.length);
  const first = Math.min(8, Math.max(4, Math.round((12 * a) / (a + b))));
  return at === 0 ? first : 12 - first;
}

// From tablets up to 1200px the cards sit two to a row. A group with four or more tools takes the whole
// row so its tiles stay on one line, and so does a group left without a partner.
function fullOnTablet(groups, index) {
  const group = groups[index];
  if (group.items.length >= 4) return true;
  const paired = rowOf(groups, index).row.filter((g) => g.items.length < 4);
  return paired.length % 2 === 1 && paired.at(-1) === group;
}

function GlobeIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="size-[11px]" aria-hidden focusable="false">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1 6h10M6 1c1.7 1.6 1.7 8.4 0 10M6 1C4.3 2.6 4.3 9.4 6 11"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

// A small corner badge for products that share their maker's logo (Claude Code, Codex, Atlas).
function Badge({ type }) {
  const glyph = { terminal: '>_', code: '</>' }[type];
  return (
    <span
      aria-hidden
      className="absolute -bottom-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-md bg-night px-1 text-white shadow-[0_1px_2px_rgb(0_0_0/0.25)]"
    >
      {type === 'globe' ? <GlobeIcon /> : <span className="font-pixel text-[10px] leading-none">{glyph}</span>}
    </span>
  );
}

function ToolTile({ tool }) {
  return (
    <li className="group flex flex-col items-center gap-2.5 text-center">
      <span className="relative grid size-16 place-items-center rounded-2xl bg-white shadow-[0_1px_2px_rgb(0_0_0/0.06),0_6px_14px_-6px_rgb(0_0_0/0.12)] ring-1 ring-black/[0.04] transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_2px_4px_rgb(0_0_0/0.06),0_12px_20px_-8px_rgb(0_0_0/0.18)]">
        <img
          src={`/images/tools/${tool.logo}`}
          alt=""
          width={tool.large ? 42 : 34}
          height={tool.large ? 42 : 34}
          loading="lazy"
          decoding="async"
          className={cx('rounded-[8px] object-contain', tool.large ? 'size-[42px]' : 'size-[34px]')}
        />
        {tool.badge ? <Badge type={tool.badge} /> : null}
      </span>
      <span className="text-[12.5px] font-medium leading-4 text-ink/75">{tool.name}</span>
    </li>
  );
}

function TileGrid({ items, className }) {
  return (
    <ul className={cx('grid grid-cols-[repeat(auto-fit,minmax(84px,1fr))] gap-x-2 gap-y-7', className)}>
      {items.map((tool) => (
        <ToolTile key={tool.name} tool={tool} />
      ))}
    </ul>
  );
}

function GroupLabel({ group }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h4 className="font-poppins text-[13.8px] font-medium tracking-[0.15px] text-journey">{group.label}</h4>
      <span className="font-poppins text-xs font-medium tracking-[0.15px] text-ink/40">
        {pad(group.items.length)}
      </span>
    </div>
  );
}

// "Tools I use": one card per kind of work, with AI as the featured row.
export default function ToolStack() {
  const groups = scope.tools;

  return (
    <div className="mt-[clamp(80px,6.25vw,120px)]" aria-labelledby="tools-title" role="region">
      <h3
        id="tools-title"
        className="text-center font-serif text-[clamp(30px,1.98vw,38px)] leading-[1.1] tracking-[0.13px] text-charcoal"
      >
        {scope.toolsTitle}
      </h3>
      <p className="mx-auto mt-4 max-w-[560px] text-center text-[15px] font-medium leading-6 text-ink/70">
        {scope.toolsIntro}
      </p>

      <ul className="mt-12 grid gap-[23px] md:grid-cols-2 xl:grid-cols-12">
        {groups.map((group, index) => (
          <li
            key={group.label}
            className={cx(
              'rounded-2xl p-6 shadow-tile md:p-7',
              SPAN[spanFor(groups, index)],
              !group.featured && fullOnTablet(groups, index) && 'md:col-span-2',
              group.featured
                ? 'bg-[linear-gradient(120deg,#e8f0ff_0%,#f1f4fb_45%,#f3f3f0_100%)] md:col-span-2'
                : 'bg-tile',
            )}
          >
            {group.featured ? (
              <div className="grid gap-8 xl:grid-cols-[310px_1fr] xl:items-center xl:gap-10">
                <div>
                  <GroupLabel group={group} />
                  <p className="mt-4 text-balance font-serif text-[clamp(26px,1.8vw,34px)] leading-[1.15] text-fade-title">
                    {group.headline}
                  </p>
                  <p className="mt-2 text-[14.5px] font-medium leading-6 text-ink/60">{group.note}</p>
                </div>
                <TileGrid items={group.items} />
              </div>
            ) : (
              <>
                <GroupLabel group={group} />
                <TileGrid items={group.items} className="mt-7" />
                {group.note ? (
                  <p className="mt-7 text-[13px] font-medium leading-5 text-ink/55">{group.note}</p>
                ) : null}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
