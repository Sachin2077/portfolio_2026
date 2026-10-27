import { cx } from '@/lib/cx';

// Tag pills from the brand sheet ("UI/UX", "Design System", "Research"), one tone per meaning.
const tones = {
  blue: 'bg-chip text-chip-ink',
  mint: 'bg-[#d5f6ea] text-[#24795d]',
  pink: 'bg-[#ffe1e9] text-[#b8456a]',
  yellow: 'bg-[#fff2c7] text-[#8a5a00]',
  grey: 'bg-pill text-ink/70',
};

const sizes = {
  md: 'h-7 px-3 text-[13px]',
  sm: 'h-6 px-2.5 text-[12px]',
};

export default function Chip({ tone = 'blue', size = 'md', className, children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center whitespace-nowrap rounded-full font-medium tracking-[0.1px]',
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

// Picks a tone for a project status or kind tag.
export function toneForTag(tag) {
  const value = tag.toLowerCase();
  if (value.startsWith('ai product') || value.startsWith('website') || value.startsWith('business app')) return 'blue';
  if (value.startsWith('live') || value.startsWith('shipped')) return 'mint';
  if (value.startsWith('delivered') || value.startsWith('built')) return 'yellow';
  if (value.startsWith('prototype') || value.startsWith('self-initiated') || value.startsWith('concept')) return 'pink';
  return 'grey';
}
