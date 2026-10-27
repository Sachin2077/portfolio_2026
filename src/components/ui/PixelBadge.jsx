import PixelArt from '@/components/ui/PixelArt';
import { cornerBottomRight, cornerTopLeft } from '@/lib/pixels';
import { cx } from '@/lib/cx';

// A two-digit number held between two pixel brackets, as on the journey cards.
export default function PixelBadge({ number, className }) {
  return (
    <span
      className={cx(
        'relative inline-grid size-5 shrink-0 place-items-center font-poppins text-[13.8px] font-medium leading-none tracking-[0.15px] text-journey',
        className,
      )}
    >
      <PixelArt pixels={cornerTopLeft} width={5} height={5} className="absolute left-0 top-0" />
      <span className="translate-y-px">{String(number).padStart(2, '0')}</span>
      <PixelArt
        pixels={cornerBottomRight}
        width={5}
        height={5}
        className="absolute bottom-0 right-0"
      />
    </span>
  );
}
