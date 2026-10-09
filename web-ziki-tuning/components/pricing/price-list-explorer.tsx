'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Search } from 'lucide-react'
import { categoryLabels, formatPLN, priceList, type Category } from '@/lib/data'
import { cn } from '@/lib/utils'

type Sort = 'asc' | 'desc' | 'default'
const categories = Object.keys(categoryLabels) as Category[]

export function PriceListExplorer() {
  const [active, setActive] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState<Sort>('default')
  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = priceList.filter(
      (item) =>
        (active === 'all' || item.category === active) &&
        (!q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)),
    )
    if (sort === 'default') return filtered
    return [...filtered].sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price))
  }, [active, sort, query])

  const counts = useMemo(() => {
    const map = new Map<Category, number>()
    for (const item of priceList) map.set(item.category, (map.get(item.category) ?? 0) + 1)
    return map
  }, [])

  const total = items.reduce((sum, i) => sum + i.price, 0)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 border border-border bg-card p-4 md:p-6">
        <div role="group" aria-label="Filtr kategorií" className="flex flex-wrap gap-2">
          <FilterChip label="Vše" count={priceList.length} active={active === 'all'} onClick={() => setActive('all')} />
          {categories.map((c) => (
            <FilterChip
              key={c}
              label={categoryLabels[c]}
              count={counts.get(c) ?? 0}
              active={active === c}
              onClick={() => setActive(c)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative flex-1 md:max-w-sm">
            <span className="sr-only">Hledat v ceníku</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hledat turbo, nitro, kapotu…"
              className="h-11 w-full border border-input bg-background pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </label>
          <div role="group" aria-label="Řazení podle ceny" className="flex gap-2">
            <SortButton active={sort === 'default'} onClick={() => setSort('default')}>
              Výchozí
            </SortButton>
            <SortButton active={sort === 'asc'} onClick={() => setSort('asc')}>
              <ArrowUpNarrowWide className="size-4" aria-hidden="true" />
              Nejlevnější
            </SortButton>
            <SortButton active={sort === 'desc'} onClick={() => setSort('desc')}>
              <ArrowDownWideNarrow className="size-4" aria-hidden="true" />
              Nejdražší
            </SortButton>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {`Zobrazeno ${items.length} položek · součet všeho by stál ${formatPLN(total)}`}
      </p>

      {items.length === 0 ? (
        <p className="border border-dashed border-border p-10 text-center text-muted-foreground">
          Nic jsme nenašli. Zkuste hledat „turbo“ – to máme vždycky.
        </p>
      ) : (
        <ul className="divide-y divide-border border border-border">
          {items.map((item) => (
            <li
              key={item.slug}
              className="group grid gap-3 bg-background p-5 transition-colors hover:bg-card md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">{categoryLabels[item.category]}</p>
                <h2 className="mt-1 font-display text-lg uppercase leading-tight">{item.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <p className="font-display text-2xl tabular-nums text-accent md:text-right">{formatPLN(item.price)}</p>
              <Link
                href={`/kontakt?uprava=${item.slug}`}
                className="inline-flex w-fit items-center border border-primary px-4 py-2 font-display text-xs uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={`Chci to: ${item.name}`}
              >
                Chci to
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 border px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-all',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border text-foreground/80 hover:border-primary hover:text-primary',
      )}
    >
      {label}
      <span className={cn('text-xs tabular-nums', active ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{count}</span>
    </button>
  )
}

function SortButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-11 items-center gap-2 border px-3 text-sm font-semibold transition-colors',
        active ? 'border-accent bg-accent/15 text-accent' : 'border-border text-foreground/80 hover:border-accent',
      )}
    >
      {children}
    </button>
  )
}
