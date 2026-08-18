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
        tags: ['PLC', 'GD&T', 'Facility'],
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        link: '/projects/skyslide-automated-dna-sample-shuttle'
    },
    {
        id: 'eng-2',
        slug: 'arena-plm-implementation',
        title: 'Design Metadata Migration & PLM Implementation',
        blurb: 'Migrated 2k+ CAD files with metadata to Arena PLM, established workflows and user training.',
        category: 'Engineering',
        tags: ['PLM', 'Jupyter Notebook', 'Naive Bayes'],
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
        link: '/projects/arena-plm-implementation'
    },
    {
        id: 'eng-3',
        slug: 'odtc-thermal-cycler-ui',
        title: 'ODTC Thermal Cycler UI',
        blurb: 'SiLA-based Python GUI with multi-threaded event handling and SOAP bindings.',
        category: 'Engineering',
        tags: ['Python', 'SiLA', 'GUI'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        link: '/projects/odtc-thermal-cycler-ui'
    },
    {
        id: 'des-1',
        slug: 'fortune-cookie-render',
        title: 'Fortune Cookie Render',
        blurb: 'Playful photoreal rendering exploration with three-point lighting and stylized backgrounds.',
        category: 'Design',
        tags: ['Rendering', '3D Modeling'],
        image: '/images/proj-fortunecookie.png',
        link: '/projects/fortune-cookie-render'
    },
    {
        id: 'evt-1',
        slug: 'mini-bake-off-summer-2025',
        title: '不大略癫烘焙大赛 — Mini Bake Off 2025',
        blurb: 'A fun baking competition to foster human connection through culinary creativity.',
        category: 'Events',
        tags: ['Creativity', 'Experiential Design'],
        image: '/images/bakeoff/apple-crumble-pie.jpg',
        link: '/projects/mini-bake-off-summer-2025/polls'
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