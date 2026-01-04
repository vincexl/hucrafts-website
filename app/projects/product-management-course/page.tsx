import Link from 'next/link';

export default function ProductManagementCourse() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Product Management Course: Learning Resources</h1>
      <p className="mb-6">Curated resources and tools for learning product management. Explore documents, frameworks, and guides to help you on your journey.</p>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Featured Document</h2>
        <ul className="list-disc pl-6">
          <li>
            <Link href="/SMART.html" target="_blank" className="text-blue-600 underline">
              SMART Goals Worksheet (interactive tool)
            </Link>
          </li>
        </ul>
      </section>
      {/* Add more resources, links, or tools here as needed */}
    </main>
  );
}
