import { useMemo, useState } from 'react'
import Media, { pickColor } from '../components/Media.jsx'
import { Button, Container, SectionHeader, Stars, inputBase } from '../components/Primitives.jsx'
import { products, categories } from '../data.js'
import { money } from './useCart.js'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
  { id: 'rating', label: 'Top rated' },
]

const PRICES = [
  { id: 'any', label: 'Any price', test: () => true },
  { id: 'under30', label: 'Under $30', test: (p) => p.price < 30 },
  { id: '30to60', label: '$30 to $60', test: (p) => p.price >= 30 && p.price <= 60 },
  { id: 'over60', label: 'Over $60', test: (p) => p.price > 60 },
]

function ProductCard({ product, onQuickView }) {
  const [color, setColor] = useState(() => pickColor(product.colors))
  const lowest = product.bulk?.length ? product.bulk[product.bulk.length - 1] : null
  const open = () => onQuickView(product, color)

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={open}
        aria-label={`View ${product.name}`}
        className="relative block overflow-hidden rounded-xl"
      >
        <Media
          src={product.image}
          alt={product.name}
          garment={product.garment}
          color={color.hex}
          zoom
          className="aspect-square"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink-900 px-2.5 py-1 text-[12px] font-semibold text-bone">
            {product.badge}
          </span>
        ) : null}
      </button>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {product.colors.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setColor(c)}
            title={c.name}
            aria-label={c.name}
            aria-pressed={color.name === c.name}
            className={`h-5 w-5 rounded-full border border-black/30 ring-offset-2 ring-offset-ink-900 transition-shadow duration-150 ${
              color.name === c.name ? 'ring-2 ring-bone' : 'hover:ring-1 hover:ring-ink-400'
            }`}
            style={{ background: c.hex }}
          />
        ))}
      </div>

      <h3 className="mt-2 text-[15px] font-semibold leading-snug text-bone">
        <button type="button" onClick={open} className="text-left underline-offset-4 hover:underline">
          {product.name}
        </button>
      </h3>

      <div className="mt-1 flex items-center gap-1.5 text-[13px] text-bone-muted">
        <Stars value={product.rating} size={13} />
        {product.rating} ({product.reviews})
      </div>

      <p className="mt-2 text-[15px] text-bone">
        <span className="font-semibold">{money(product.price)}</span>
        {product.compareAt ? (
          <span className="ml-2 text-[13px] text-bone-faint line-through">{money(product.compareAt)}</span>
        ) : null}
      </p>
      {lowest ? (
        <p className="text-[13px] text-bone-muted">
          As low as {money(lowest.price)} at {lowest.qty}
        </p>
      ) : null}
    </article>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-ink-700 py-5 first:pt-0">
      <h3 className="text-[14px] font-semibold text-bone">{title}</h3>
      <div className="mt-3 space-y-0.5">{children}</div>
    </div>
  )
}

function FilterOption({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[14px] transition-colors duration-150 ${
        active ? 'bg-ink-800 font-semibold text-bone' : 'text-bone-muted hover:bg-ink-850 hover:text-bone'
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
            active ? 'border-volt-500' : 'border-ink-500'
          }`}
        >
          {active ? <span className="h-2 w-2 rounded-full bg-volt-500" /> : null}
        </span>
        {label}
      </span>
      {count !== undefined ? <span className="text-[13px] font-normal text-bone-faint">{count}</span> : null}
    </button>
  )
}

export default function ShopCatalog({ query, setQuery, category, setCategory, onQuickView }) {
  const [sort, setSort] = useState('featured')
  const [price, setPrice] = useState('any')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const priceTest = PRICES.find((p) => p.id === price).test

    let list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        priceTest(p) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q)))
    )

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [query, category, sort, price])

  const title = category === 'all' ? 'All products' : categories.find((c) => c.id === category)?.name
  const filtered = category !== 'all' || price !== 'any' || query.trim() !== ''
  const reset = () => {
    setCategory('all')
    setPrice('any')
    setQuery('')
  }

  return (
    <section id="catalogue" className="scroll-mt-36 py-10 sm:py-12">
      <Container>
        <SectionHeader
          title={title}
          description="Bulk pricing is applied automatically in the cart at 24, 72 and 144 pieces per style."
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[230px_1fr]">
          <aside className="hidden lg:block">
            <FilterGroup title="Category">
              <FilterOption
                active={category === 'all'}
                onClick={() => setCategory('all')}
                label="All products"
                count={products.length}
              />
              {categories.map((c) => (
                <FilterOption
                  key={c.id}
                  active={category === c.id}
                  onClick={() => setCategory(c.id)}
                  label={c.name}
                  count={products.filter((p) => p.category === c.id).length}
                />
              ))}
            </FilterGroup>
            <FilterGroup title="Price">
              {PRICES.map((p) => (
                <FilterOption key={p.id} active={price === p.id} onClick={() => setPrice(p.id)} label={p.label} />
              ))}
            </FilterGroup>
            {filtered ? (
              <button
                type="button"
                onClick={reset}
                className="mt-4 text-[14px] font-semibold text-bone underline underline-offset-4"
              >
                Clear all filters
              </button>
            ) : null}
          </aside>

          <div className="min-w-0">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:hidden">
              {[{ id: 'all', name: 'All' }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors duration-150 ${
                    category === c.id
                      ? 'border-bone bg-bone text-ink-900'
                      : 'border-ink-600 text-bone-muted hover:text-bone'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-700 pb-4">
              <p className="text-[14px] text-bone-muted">
                {visible.length} {visible.length === 1 ? 'product' : 'products'}
                {query.trim() ? (
                  <>
                    {' '}
                    for <span className="text-bone">&ldquo;{query.trim()}&rdquo;</span>
                  </>
                ) : null}
              </p>
              <label className="flex items-center gap-2 text-[14px] text-bone-muted">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className={`${inputBase} rounded-lg px-3 py-2`}
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {visible.length === 0 ? (
              <div className="mt-6 rounded-xl border border-ink-700 bg-ink-850 px-6 py-14 text-center">
                <p className="text-[16px] font-semibold text-bone">No products match these filters</p>
                <p className="mt-1.5 text-[14px] text-bone-muted">Try a different search or clear the filters.</p>
                <Button variant="outline" className="mt-5" onClick={reset}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
