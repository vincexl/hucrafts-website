export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-600">© {new Date().getFullYear()} HuCrafts. Made with curiosity.</p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/#projects" className="text-zinc-600 hover:text-zinc-900 transition-colors">Projects</a>
          <a href="/blog" className="text-zinc-600 hover:text-zinc-900 transition-colors">Blog</a>
          <a href="/#knowledge" className="text-zinc-600 hover:text-zinc-900 transition-colors">Knowledge</a>
          <a href="/#about" className="text-zinc-600 hover:text-zinc-900 transition-colors">About</a>
          <a href="/#contact" className="text-zinc-600 hover:text-zinc-900 transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
