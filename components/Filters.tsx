'use client';

import type { Category } from '@/lib/projects';

export default function Filters({
  categories,
  selected,
  onSelect,
}: {
  categories: readonly Category[];
  selected: Category;
  onSelect: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          aria-pressed={selected === c}
          className={[
            'rounded-full px-4 py-2 text-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2',
            selected === c
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white border-zinc-300 hover:border-zinc-400 text-zinc-700',
          ].join(' ')}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
