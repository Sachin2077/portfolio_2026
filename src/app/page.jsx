import About from '@/components/sections/About';
import Beliefs from '@/components/sections/Beliefs';
import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import Projects from '@/components/sections/Projects';
import ScopeOfWork from '@/components/sections/ScopeOfWork';
import TaglineBand from '@/components/sections/TaglineBand';
import { beliefs } from '@/content/home';
import { projects } from '@/content/projects';

// Scope of work links each area and trait to the case study that shows it.
const proofs = Object.fromEntries(projects.map(({ slug, name }) => [slug, { slug, name }]));

export default function HomePage() {
  return (
    <>
      <Hero />
      <TaglineBand />
      <About />
      <Beliefs title={beliefs.title} items={beliefs.items} />
      <Journey />
      <Projects />
      <ScopeOfWork proofs={proofs} />
    </>
  );
}
