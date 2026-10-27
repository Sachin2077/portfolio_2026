import Image from 'next/image';
import { tagline } from '@/content/home';

// Figma: "Frame 35", the inset band under the hero with the nerd-glasses avatar.
export default function TaglineBand() {
  return (
    <section aria-label="Tagline" className="relative rounded-[10px] pb-[23px] shadow-band">
      <div className="mx-auto flex max-w-[898px] flex-col items-center gap-2 px-6 pt-[clamp(48px,3.54vw,68px)] text-center tracking-[0.13px]">
        <p className="w-full font-serif text-[clamp(26px,1.98vw,38px)] leading-[1.3] text-fade-title">
          {tagline.title}
        </p>
        <p className="w-full text-sm font-medium leading-[18.2px] text-fade-sub">{tagline.stats}</p>
      </div>
      <div className="relative mx-auto mt-[18px] h-[111px] w-[74px]">
        <Image
          src="/images/figma/avatar-nerd.png"
          alt={tagline.avatarAlt}
          fill
          sizes="74px"
          className="object-cover"
        />
        {/* Figma "Rectangle 4901" and "Rectangle 4903": two touch-up pixels on the avatar. */}
        <img
          src="/images/icons/tagline-rect-4901.svg"
          alt=""
          aria-hidden
          width={2}
          height={1}
          className="absolute left-[46px] top-[74px] h-px w-[2px]"
        />
        <img
          src="/images/icons/tagline-rect-4903.svg"
          alt=""
          aria-hidden
          width={4}
          height={1}
          className="absolute left-[42px] top-[56px] h-px w-[4px]"
        />
      </div>
    </section>
  );
}
