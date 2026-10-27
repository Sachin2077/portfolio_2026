import { cx } from '@/lib/cx';

// A case-study block: small blue label, serif heading, then the content.
export default function CaseSection({ label, title, children, className }) {
  return (
    <section className={cx('border-t border-line pt-12', className)}>
      {label ? (
        <p className="font-poppins text-[13.8px] font-medium tracking-[0.15px] text-journey">{label}</p>
      ) : null}
      <h2 className="mt-2 font-serif text-[clamp(30px,2.1vw,40px)] leading-[1.1] text-ink/80">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
