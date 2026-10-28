import Image from 'next/image';
import Button from '@/components/ui/Button';
import { sectionHref } from '@/content/site';

export const metadata = {
  title: { absolute: 'Page not found · Sachin Verma' },
};

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-24 text-center md:py-32">
      <div className="relative h-[111px] w-[74px]">
        <Image
          src="/images/figma/avatar-nerd.png"
          alt="Pixel-art avatar of Sachin with pink hair, a cap, round glasses and a hoodie"
          fill
          sizes="74px"
          className="object-cover"
        />
      </div>
      <p className="mt-8 font-poppins text-[13.8px] font-medium tracking-[0.15px] text-journey">
        404 · Page not found
      </p>
      <h1 className="mt-3 font-serif text-display text-ink/80">This page does not exist.</h1>
      <p className="mt-4 max-w-[480px] text-lg font-medium leading-[30px] text-ink/70">
        The link may be outdated or mistyped. You can return to the home page or browse my projects.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href={sectionHref('projects')} variant="soft" size="md" className="px-6">
          View projects
        </Button>
      </div>
    </section>
  );
}
