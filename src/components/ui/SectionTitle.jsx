import { cx } from '@/lib/cx';

// Large centered serif title with an optional short line under it, as on "My Journey".
export default function SectionTitle({ id, title, intro, as: Tag = 'h2', className }) {
  return (
    <div className={cx('mx-auto flex max-w-[682px] flex-col items-center text-center', className)}>
      <Tag id={id} className="font-serif text-display text-ink/80">
        {title}
      </Tag>
      {intro ? (
        <p className="mt-5 max-w-[556px] text-[13.8px] font-medium leading-[21px] tracking-[0.15px] text-ink/70">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
