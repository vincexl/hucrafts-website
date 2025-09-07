export default function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
return (
<div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
<div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100" aria-hidden>{icon}</div>
<span className="text-sm font-medium">{title}</span>
</div>
);
}