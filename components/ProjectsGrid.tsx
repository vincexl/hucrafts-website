import ProjectCard from '@/components/ProjectCard';
import type { Project } from '@/types';


export default function ProjectsGrid({ projects }: { projects: Project[] }) {
return (
<div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{projects.map((p) => (
<ProjectCard key={p.id} p={p} />
))}
</div>
);
}