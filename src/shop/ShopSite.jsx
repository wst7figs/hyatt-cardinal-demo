import { useState } from 'react'
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Users,
  Truck,
  PenTool,
  PackageCheck,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Media, { GarmentTrio, pickColor } from '../components/Media.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import {
  Button,
  Container,
  SectionHeader,
  Stars,
  TextLink,
  inputBase,
} from '../components/Primitives.jsx'
import {
  categories,
  storePromos,
  storeReviews,
  products,
  photos,
  shop,
  FREE_SHIPPING_THRESHOLD,
} from '../data.js'
import { useCart, money } from './useCart.js'
import CartDrawer from './CartDrawer.jsx'
import QuickView from './QuickView.jsx'
import ShopCatalog from './ShopCatalog.jsx'

const PROMO_ICONS = { Truck, PenTool, PackageCheck, ShieldCheck }

const STORE_HERO = [
  { type: 'tee', color: '#1e1c1c', print: 'HC', cls: 'left-[4%] top-[7%] w-[60%]' },
  { type: 'hoodie', color: '#2f4f43', cls: 'bottom-[5%] right-[3%] w-[62%]' },
]

const HERO_TILES = [
  { category: 'fleece', eyebrow: 'Best seller', title: 'Hoodies and crewnecks', garment: 'hoodie', color: '#4a4f57' },
  { category: 'headwear', eyebrow: 'Team orders', title: 'Caps and beanies', garment: 'cap', color: '#2b3a55' },
]

const lowestIn = (category) =>
  Math.min(
    ...products
      .filter((p) => p.category === category)
      .map((p) => (p.bulk?.length ? p.bulk[p.bulk.length - 1].price : p.price))
  )

const BULK_TRIO = [
  { type: 'hoodie', color: '#1e1c1c', cls: 'left-[8%] top-[16%] w-[42%]' },
  { type: 'hoodie', color: '#8d8a86', cls: 'left-[29%] top-[20%] w-[42%]' },
  { type: 'hoodie', color: '#2f4f43', cls: 'left-[50%] top-[24%] w-[42%]' },
]

const BULK_POINTS = [
  'Pricing below the listed bulk tiers',
  'Mixed sizes and colours in one order',
  'Printing and embroidery quoted together',
]

function SearchBox({ query, setQuery, onSubmit, className = '' }) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className={`relative ${className}`}
    >
      <Search
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bone-faint"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search t-shirts, hoodies, hats"
        aria-label="Search products"
        className={`${inputBase} w-full rounded-full py-2.5 pl-11 pr-4`}
      />
    </form>
  )
}

function ShopHeader({ query, setQuery, category, cartCount, onOpenCart, onGoCategory }) {
  const [open, setOpen] = useState(false)
  const nav = [{ id: 'all', name: 'All products' }, ...categories]

  const go = (id) => {
    onGoCategory(id)
    setOpen(false)
  }
  const search = () => onGoCategory(category, true)

  return (
    <>
      <div className="bg-volt-500 text-ink-900">
        <Container className="py-2 text-center text-[13px] font-medium">
          Free shipping on orders over {money(FREE_SHIPPING_THRESHOLD)}. Bulk pricing starts at 24
          pieces.
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-900">
        <Container className="flex h-20 items-center gap-3 lg:gap-8">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="-ml-2 rounded-lg p-2 text-bone hover:bg-ink-800 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="#top" className="shrink-0">
            <Logo className="h-16" />
          </a>

          <SearchBox
            query={query}
            setQuery={setQuery}
            onSubmit={search}
            className="hidden max-w-xl flex-1 md:block"
          />

          <div className="ml-auto flex items-center gap-1">
            <a
              href="#bulk"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-medium text-bone-muted hover:bg-ink-800 hover:text-bone xl:flex"
            >
              <Users size={18} />
              Bulk orders
            </a>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-medium text-bone-muted hover:bg-ink-800 hover:text-bone sm:flex"
            >
              <User size={18} />
              <span className="hidden lg:inline">Sign in</span>
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Cart, ${cartCount} items`}
              className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] font-medium text-bone hover:bg-ink-800"
            >
              <ShoppingBag size={19} />
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 ? (
                <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-volt-500 px-1 text-[11px] font-bold text-ink-900 lg:static">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </Container>

        <Container className="pb-3 md:hidden">
          <SearchBox query={query} setQuery={setQuery} onSubmit={search} />
        </Container>

        <nav className="hidden border-t border-ink-700 lg:block">
          <Container className="flex h-12 items-center gap-1">
            {nav.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => go(c.id)}
                className={`rounded-lg px-3 py-2 text-[14px] font-medium transition-colors duration-150 ${
                  category === c.id ? 'bg-ink-800 text-bone' : 'text-bone-muted hover:text-bone'
                }`}
              >
                {c.name}
              </button>
            ))}
          </Container>
        </nav>

        {open ? (
          <div className="border-t border-ink-700 lg:hidden">
            <Container className="py-2">
              <nav className="flex flex-col">
                {nav.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => go(c.id)}
                    className="border-b border-ink-800 py-3 text-left text-[15px] font-medium text-bone"
                  >
                    {c.name}
                  </button>
                ))}
                <a
                  href="#bulk"
                  onClick={() => setOpen(false)}
                  className="py-3 text-[15px] font-medium text-bone"
                >
                  Bulk orders
                </a>
              </nav>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  )
}

function ShopHero({ onGoCategory }) {
  const hoodie = products.find((p) => p.id === 'hc-hoodie-mid')

  return (
    <section className="pt-6 sm:pt-8">
      <Container>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 lg:col-span-2">
            <div className="grid h-full md:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-volt-500">
                  Wholesale blanks
                </p>
                <h1 className="mt-3 text-[38px] font-extrabold leading-[1.03] tracking-[-0.035em] text-bone sm:text-[50px]">
                  The blanks we print on, at bulk prices.
                </h1>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-bone-muted">
                  Heavyweight tees, fleece and headwear, stocked in Hamilton and shipped across Canada
                  in 2 business days.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
                  <Button size="xl" onClick={() => onGoCategory('all')}>
                    Shop all products
                    <ArrowRight size={18} />
                  </Button>
                  <div>
                    <p className="text-[13px] text-bone-muted">T-shirts from</p>
                    <p className="text-[22px] font-extrabold tracking-[-0.02em] text-bone">
                      {money(lowestIn('tees'))}
                      <span className="ml-1.5 text-[13px] font-medium tracking-normal text-bone-muted">
                        in bulk
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <GarmentTrio
                  src={photos.storeHero}
                  alt="Blank tee and hoodie from the store"
                  items={STORE_HERO}
                  className="h-full min-h-[300px]"
                />
                <div className="absolute bottom-4 left-4 rounded-xl bg-ink-900 px-4 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]">
                  <p className="text-[12px] text-bone-muted">{hoodie.name}</p>
                  <p className="text-[16px] font-bold text-bone">
                    From {money(hoodie.bulk[hoodie.bulk.length - 1].price)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {HERO_TILES.map((t) => (
              <button
                key={t.category}
                type="button"
                onClick={() => onGoCategory(t.category)}
                className="group flex min-h-[190px] overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 text-left transition-colors duration-150 hover:border-ink-500"
              >
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-bone-faint">
                      {t.eyebrow}
                    </p>
                    <h2 className="mt-2 text-[21px] font-bold leading-tight tracking-[-0.02em] text-bone">
                      {t.title}
                    </h2>
                    <p className="mt-1.5 text-[14px] text-bone-muted">
                      From <span className="font-semibold text-bone">{money(lowestIn(t.category))}</span>
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-bone underline-offset-4 group-hover:underline">
                    Shop now
                    <ArrowRight size={15} />
                  </span>
                </div>
                <Media
                  garment={t.garment}
                  color={t.color}
                  zoom
                  pad="p-[14%]"
                  className="w-[42%] shrink-0"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          {storePromos.map((p) => {
            const Icon = PROMO_ICONS[p.icon]
            return (
              <div key={p.title} className="flex items-start gap-3 bg-ink-900 px-5 py-4">
                <Icon size={20} className="mt-0.5 shrink-0 text-volt-500" />
                <div>
                  <p className="text-[14px] font-semibold text-bone">{p.title}</p>
                  <p className="mt-0.5 text-[13px] text-bone-muted">{p.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function CategoryTiles({ onGoCategory }) {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <SectionHeader
          title="Shop by category"
          action={<TextLink onClick={() => onGoCategory('all')}>View all products</TextLink>}
        />
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => {
            const items = products.filter((p) => p.category === c.id)
            const lead = items[0]
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onGoCategory(c.id)}
                className="group text-left"
              >
                <Media
                  src={c.image}
                  alt={c.name}
                  garment={lead?.garment ?? c.garment}
                  color={lead ? pickColor(lead.colors).hex : c.color}
                  zoom
                  className="aspect-square rounded-xl"
                />
                <h3 className="mt-3 text-[15px] font-semibold text-bone underline-offset-4 group-hover:underline">
                  {c.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-bone-muted">
                  {items.length} {items.length === 1 ? 'style' : 'styles'}
                </p>
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function BulkBanner() {
  return (
    <section id="bulk" className="py-10 sm:py-12">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 lg:grid-cols-2">
          <GarmentTrio
            src={photos.bulk}
            alt="Stack of team hoodies"
            items={BULK_TRIO}
            className="aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-[380px]"
          />
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="text-[13px] font-semibold text-volt-500">Teams and businesses</p>
            <h2 className="mt-2 text-[28px] text-bone sm:text-[32px]">Ordering 144 pieces or more?</h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-bone-muted">
              Large orders are quoted by hand and usually come in below the listed bulk price. Send
              the styles, quantities and artwork, and we reply the next business day.
            </p>
            <ul className="mt-5 space-y-2.5">
              {BULK_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] text-bone-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-volt-500" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button as="a" href={`mailto:${shop.email}?subject=Bulk%20order%20quote`} size="lg">
                Request a bulk quote
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function StoreReviews() {
  const avg = (products.reduce((n, p) => n + p.rating, 0) / products.length).toFixed(1)
  const total = products.reduce((n, p) => n + p.reviews, 0)

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <SectionHeader
          title="Customer reviews"
          action={
            <div className="flex items-center gap-2 text-[14px] text-bone-muted">
              <Stars value={Number(avg)} size={16} />
              <span>
                <span className="font-semibold text-bone">{avg}</span> average from{' '}
                {total.toLocaleString('en-CA')} reviews
              </span>
            </div>
          }
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {storeReviews.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-xl border border-ink-700 bg-ink-850 p-6">
              <Stars value={r.rating} />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-bone">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[14px]">
                <div className="font-semibold text-bone">{r.name}</div>
                <div className="text-bone-muted">Reviewed the {r.product}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function ShopSite() {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [quick, setQuick] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  function goToCategory(id, keepQuery = false) {
    setCategory(id)
    if (!keepQuery) setQuery('')
    requestAnimationFrame(() => {
      document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div id="top" className="min-h-screen bg-ink-900">
      <ShopHeader
        query={query}
        setQuery={setQuery}
        category={category}
        cartCount={cart.count}
        onOpenCart={() => setCartOpen(true)}
        onGoCategory={goToCategory}
      />

      <main>
        <ShopHero onGoCategory={goToCategory} />
        <CategoryTiles onGoCategory={goToCategory} />
        <ShopCatalog
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          onQuickView={(product, color) => setQuick({ product, color })}
        />
        <BulkBanner />
        <StoreReviews />
      </main>

      <SiteFooter variant="shop" />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
      {quick ? (
        <QuickView
          product={quick.product}
          initialColor={quick.color}
          onClose={() => setQuick(null)}
          onAdd={(p, c, s, q) => {
            cart.add(p, c, s, q)
            setQuick(null)
            setCartOpen(true)
          }}
        />
      ) : null}
    </div>
  )
}
