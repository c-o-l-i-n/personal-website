export interface SideProject {
  name: string;
  url: string;
  logoSrc: string;
  notes: string;
}

export const sideProjects: SideProject[] = [
  {
    name: 'Newsletter Studio',
    url: 'https://newsletterstudio.colinaw.com',
    logoSrc: '/images/logos/newsletter-studio.webp',
    notes: 'Write and print a vintage-newspaper-style newsletter',
  },
  {
    name: 'Mell',
    url: 'https://github.com/VoxelPenguin/mell#readme',
    logoSrc: '/images/logos/mell.webp',
    notes:
      "Empower your community to report and solve local issues! Winner of Harper Hack '25",
  },
  {
    name: 'Whisker Jam',
    url: 'https://github.com/c-o-l-i-n/whisker-jam#readme',
    logoSrc: '/images/logos/whisker-jam.webp',
    notes:
      'Create a realtime virtual rock band made up of cats! Winner of the Supabase Launch Week 12 Hackathon',
  },
  {
    name: 'EventMaster Pro',
    url: 'https://github.com/joshies-foundation/event-master-pro#readme',
    logoSrc: '/images/logos/emp.svg',
    notes:
      'Supercharge dynamic, multi-day competitions with realtime brackets, betting, analytics, and more',
  },
  {
    name: 'Potluk',
    url: 'https://potl.uk',
    logoSrc: '/images/logos/potluk.svg',
    notes: 'Coordinate who brings what to your potluck',
  },
  {
    name: 'Presto Parts',
    url: 'https://prestoparts.org',
    logoSrc: '/images/logos/pp.svg',
    notes: 'Organize sheet music PDFs in a few minutes, not many hours',
  },
  {
    name: 'Drill Generator',
    url: 'https://drillgenerator.com',
    logoSrc: '/images/logos/drill-generator.svg',
    notes: 'Generate drills in the style of OSUMB tryouts',
  },
];
