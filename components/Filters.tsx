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
    <div className="hidden md:flex gap-2">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={[
            'rounded-full px-4 py-2 text-sm border transition',
            selected === c ? 'bg-black text-white border-black' : 'border-zinc-300 hover:bg-white',
          ].join(' ')}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
