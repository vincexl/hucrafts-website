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
}
