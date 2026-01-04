import Link from 'next/link';

export default function ProjectCardProductManagement() {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">Product Management Course</h3>
      <p className="mb-4">Curated learning resources and tools for aspiring and practicing product managers.</p>
      <Link href="/projects/product-management-course" className="text-blue-600 underline">
        View Resources
      </Link>
    </div>
  );
}
