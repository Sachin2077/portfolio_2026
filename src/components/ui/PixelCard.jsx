import PixelArt from '@/components/ui/PixelArt';
import PixelBadge from '@/components/ui/PixelBadge';
import SerifText from '@/components/ui/SerifText';
import { beliefMark, journeyDash } from '@/lib/pixels';
import { cx } from '@/lib/cx';

// `sm` matches the Figma journey card. `md` is the same card set about 30% larger from 768px up.
// `fluid` scales between the two with --u, for the pinned journey, which has to fit the screen's height.
const SIZES = {
  sm: {
    padding: 'px-[9px] py-[18px]',
    title: 'text-xl leading-[21px]',
    meta: 'text-xs leading-4',
    body: 'text-sm leading-[21px]',
    footer: 'pt-8',
  },
  md: {
    padding: 'px-[9px] py-[18px] md:px-[14px] md:py-[22px]',
    title: 'text-xl leading-[21px] md:text-[25px] md:leading-[28px]',
    meta: 'text-xs leading-4 md:text-[13px] md:leading-5',
    body: 'text-sm leading-[21px] md:text-[15.5px] md:leading-[25px]',
    footer: 'pt-8',
  },
  fluid: {
    padding: 'p-step',
    title: 'text-step-title',
    meta: 'text-step-meta',
    body: 'text-step-body',
    footer: 'pt-[calc(var(--u)*22)]',
  },
};

// Figma: the journey card ("Background+Shadow" inside Frame 51–56). Reused for the "What you can count on" cards.
// Without a `number`, the pixel mark from the belief cards takes the badge's place.
export default function PixelCard({
  number,
  title,
  meta,
  body,
  footer,
  tinted = false,
  size = 'sm',
  as: Tag = 'h3',
  padding,
  className,
  style,
  ...rest
}) {
  const s = SIZES[size];
  return (
    <div
      {...rest}
      style={style}
      className={cx(
        'relative flex flex-col overflow-hidden rounded-[7.14px] shadow-float',
        padding ?? s.padding,
        tinted ? 'bg-[linear-gradient(210.94deg,#f5f5f2_0%,#f6f9fd_148.44%)]' : 'bg-canvas',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {number ? <PixelBadge number={number} /> : <PixelArt pixels={beliefMark} width={17} height={18} />}
        <img src="/images/icons/card-pin.svg" alt="" aria-hidden width={10} height={10} className="size-[10px]" />
      </div>
      <Tag className={cx('mt-2.5 font-serif tracking-[0.15px] text-night', s.title)}>
        <SerifText>{title}</SerifText>
      </Tag>
      {meta ? (
        <p className={cx('mt-2 font-medium tracking-[0.15px] text-ink/50', s.meta)}>{meta}</p>
      ) : null}
      <p className={cx('mt-2.5 font-poppins font-light tracking-[0.15px] text-journey', s.body)}>{body}</p>
      <div className={cx('mt-auto', s.footer)}>
        {footer ?? <PixelArt pixels={journeyDash} width={48} height={3} />}
      </div>
    </div>
  );
}
