import { scope } from '@/content/home';

// Logos for the tools a case study names. Most come from the Tools section in home.js. These are the tools
// only a project used, and the longer names a project gives a tool.
const projectOnly = {
  'Google Search Console': 'google-search-console.svg',
  'Pexels API': 'pexels.svg',
  'Magnific API': 'magnific.svg',
  'Midjourney connector': 'midjourney.png',
  Freepik: 'freepik.svg',
  Dribbble: 'dribbble.svg',
};

const shared = new Map(scope.tools.flatMap((group) => group.items).map((tool) => [tool.name, tool.logo]));

// The tool's logo file in public/images/tools, or null when it has none.
export function toolLogo(name) {
  return shared.get(name) ?? projectOnly[name] ?? null;
}
