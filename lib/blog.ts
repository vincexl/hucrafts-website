import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
    slug: string;
    title: string;
    date: string; // YYYY-MM-DD
    description: string;
    series?: string;
    part?: number;
    youtube?: string; // YouTube video ID
    video?: string; // local video path, e.g. /videos/foo.mp4
    readingMinutes: number;
};

export type Post = PostMeta & { html: string };

export const SERIES_BLURBS: Record<string, string> = {
    'CAD × Claude Code':
        'A video and article series on pairing Claude Code with mechanical engineering tools — CAD, PLM, and the scriptable seams between them.',
};

function parseFile(filename: string): { meta: PostMeta; content: string; draft: boolean } {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
        draft: Boolean(data.draft),
        content,
        meta: {
            slug: filename.replace(/\.md$/, ''),
            title: String(data.title ?? filename),
            date: String(data.date ?? ''),
            description: String(data.description ?? ''),
            series: data.series ? String(data.series) : undefined,
            part: typeof data.part === 'number' ? data.part : undefined,
            youtube: data.youtube ? String(data.youtube) : undefined,
            video: data.video ? String(data.video) : undefined,
            readingMinutes: Math.max(1, Math.round(words / 200)),
        },
    };
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith('.md'))
        .map(parseFile)
        .filter((p) => !p.draft)
        .map((p) => p.meta)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
    const filename = `${slug}.md`;
    if (!fs.existsSync(path.join(BLOG_DIR, filename))) return null;
    const { meta, content, draft } = parseFile(filename);
    if (draft) return null;
    return { ...meta, html: marked.parse(content) as string };
}

export function formatPostDate(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    if (!y || !m || !d) return date;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[m - 1]} ${d}, ${y}`;
}
