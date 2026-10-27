// Site-wide facts: who, where, and how to reach Sachin. Used by the header, footer and metadata.

export const site = {
  name: 'Sachin Verma',
  title: 'Sachin Verma · UI/UX Designer · Gurugram',
  description:
    'Sachin Verma is a UI/UX designer in Gurugram and co-founder of Zarah AI. He plans, designs and builds AI products and websites, starting with the people who will use them.',
  url: 'https://sachinverma.site',
  location: 'Gurugram',
  country: 'India',
  timezone: 'IST, UTC+5:30',
  email: 'vermasachin543@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/sachin-verma2077/',
    github: 'https://github.com/Sachin2077',
  },
};

// Section links. `id` matches the section's id on the home page.
export const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About me', id: 'about' },
  { label: 'Journey', id: 'journey' },
  { label: 'Projects', id: 'projects' },
  { label: 'Scope of work', id: 'scope' },
];

export const sectionHref = (id) => `/#${id}`;
