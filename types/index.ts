import type { Category } from '@/lib/projects';

export type ProjectCategory = Exclude<Category, 'All'>;

export interface Project {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  category: ProjectCategory; // never 'All'
  tags: string[];
  image: string;
  link: string;
  /** Coordinate-frame name shown beside the title, e.g. 'skyslide'. */
  frame?: string;
  /** Real imagery and write-up not ready yet: the tile renders as an open frame with no link. */
  pending?: boolean;
}
