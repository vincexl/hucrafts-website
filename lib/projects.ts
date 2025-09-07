import type { Project } from '@/types';


export const CATEGORIES = ['All', 'Engineering', 'Design', 'Events'] as const;
export type Category = typeof CATEGORIES[number];

export const PROJECTS: Project[] = [
{
id: 'eng-1',
slug: 'skyslide-automated-dna-sample-shuttle',
title: 'SkySlide — Automated DNA Sample Shuttle',
blurb: 'Vertical lift + overhead shuttle system integrating PLC and Mechanical Design.',
category: 'Engineering',
tags: ['PLC', 'TwinCAT', 'Motion Control', 'GD&T', 'Facility Integration'],
image: '/images/proj-skyslide.jpg',
link: '/projects/skyslide-automated-dna-sample-shuttle'
},
{
id: 'eng-2',
slug: 'odtc-thermal-cycler-ui',
title: 'ODTC Thermal Cycler UI',
blurb: 'SiLA-based Python GUI with multi-threaded event handling and SOAP bindings.',
category: 'Engineering',
tags: ['Python', 'SiLA', 'GUI', 'PySide6'],
image: '/images/proj-odtc.jpg',
link: '/projects/odtc-thermal-cycler-ui'
},
{
id: 'des-1',
slug: 'fortune-cookie-render',
title: 'Fortune Cookie Render',
blurb: 'Playful photoreal rendering exploration with three-point lighting and stylized backgrounds.',
category: 'Design',
tags: ['Rendering', 'Photo-Based 3D Modeling'],
image: '/images/proj-fortunecookie.jpg',
link: '/projects/fortune-cookie-render'
},
{
id: 'evt-1',
slug: 'mini-bake-off-summer-2025',
title: '不大略癫烘焙大赛 — Mini Bake Off 2025',
blurb: 'A fun baking competition to foster human connection through culinary creativity.',
category: 'Events',
tags: ['Creativity', 'Event Planning', 'Bonding'],
image: '/images/mini-bake-off.jpg',
link: '/projects/mini-bake-off-summer-2025'
},
// {
// id: 'des-2',
// slug: 'hucrafts-poster-series',
// title: 'HuCrafts Poster Series — 痛快',
// blurb: 'Bold type + ink textures exploring motion and freedom.',
// category: 'Design',
// tags: ['Typography', 'Poster'],
// image: '/images/proj-poster.jpg',
// link: '/projects/hucrafts-poster-series'
// }
];


export function getProjectBySlug(slug: string) {
return PROJECTS.find((p) => p.slug === slug) || null;
}