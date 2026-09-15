import { useEffect, useState } from 'react'
import { X, Minus, Plus, Truck } from 'lucide-react'
import Media from '../components/Media.jsx'
import { Button, Stars, inputBase } from '../components/Primitives.jsx'
import { money, unitPriceFor } from './useCart.js'

export default function QuickView({ product, initialColor, onClose, onAdd }) {
  const [color, setColor] = useState(initialColor || product.colors[0])
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null)
  const [qty, setQty] = useState(1)
  const [tried, setTried] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const unit = unitPriceFor(product, qty)
  const tiers = [
    { label: '1+', price: product.price, min: 1 },
    ...(product.bulk || []).map((b) => ({ label: b.qty, price: b.price, min: parseInt(b.qty, 10) })),
  ]
  const activeTier = tiers.filter((t) => qty >= t.min).pop()

  function submit() {
    if (!size) {
      setTried(true)
      return
    }
    onAdd(product, color, size, qty)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="animate-fade-in absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="animate-pop-in relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-ink-700 bg-ink-900 sm:rounded-2xl md:flex-row">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-ink-900/90 p-2 text-bone hover:bg-ink-800"
        >
          <X size={20} />
        </button>

        <div className="relative shrink-0 md:w-[46%]">
          <Media
            key={color.name}
            src={product.image}
            alt={`${product.name} in ${color.name}`}
            garment={product.garment}
            color={color.hex}
            pad="p-[16%]"
            className="animate-fade-in aspect-[4/3] h-full md:aspect-auto md:min-h-[480px]"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-ink-900 px-2.5 py-1 text-[12px] font-semibold text-bone">
              {product.badge}
            </span>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          <h2 className="pr-8 text-[24px] text-bone">{product.name}</h2>
          <div className="mt-2 flex items-center gap-2 text-[14px] text-bone-muted">
            <Stars value={product.rating} />
            {product.rating} ({product.reviews} reviews)
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-[26px] font-bold text-bone">{money(unit)}</span>
            <span className="text-[14px] text-bone-muted">each</span>
            {product.compareAt && unit === product.price ? (
              <span className="text-[14px] text-bone-faint line-through">{money(product.compareAt)}</span>
            ) : null}
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-bone-muted">{product.blurb}</p>

          <div className="mt-6">
            <p className="text-[14px] font-semibold text-bone">
              Colour: <span className="font-normal text-bone-muted">{color.name}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c)}
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={color.name === c.name}
                  className={`h-9 w-9 rounded-full border border-black/30 ring-offset-2 ring-offset-ink-900 transition-shadow duration-150 ${
                    color.name === c.name ? 'ring-2 ring-bone' : 'hover:ring-1 hover:ring-ink-400'
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[14px] font-semibold text-bone">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`h-10 min-w-12 rounded-lg border px-3 text-[14px] font-medium transition-colors duration-150 ${
                    size === s
                      ? 'border-bone bg-bone text-ink-900'
                      : 'border-ink-600 text-bone hover:border-bone-faint'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {tried && !size ? (
              <p className="mt-2 text-[13px] font-medium text-volt-500">Choose a size to continue.</p>
            ) : null}
          </div>

          {tiers.length > 1 ? (
            <div className="mt-6">
              <p className="text-[14px] font-semibold text-bone">Bulk pricing per piece</p>
              <div
                className="mt-3 grid overflow-hidden rounded-lg border border-ink-700 text-center"
                style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}
              >
                {tiers.map((t) => (
                  <div
                    key={t.label}
                    className={`border-r border-ink-700 py-2.5 last:border-r-0 ${
                      t === activeTier ? 'bg-ink-800' : ''
                    }`}
                  >
                    <div className="text-[12px] text-bone-muted">{t.label}</div>
                    <div className={`mt-0.5 text-[14px] font-semibold ${t === activeTier ? 'text-volt-500' : 'text-bone'}`}>
                      {money(t.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-lg border border-ink-600">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-full w-11 items-center justify-center text-bone-muted hover:text-bone"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
                aria-label="Quantity"
                className={`${inputBase} h-full w-16 border-0 bg-transparent text-center text-[15px] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none`}
              />
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-full w-11 items-center justify-center text-bone-muted hover:text-bone"
              >
                <Plus size={16} />
              </button>
            </div>
            <Button size="lg" className="flex-1" onClick={submit}>
              Add to cart, {money(unit * qty)}
            </Button>
          </div>

          <p className="mt-5 flex items-center gap-2 text-[13px] text-bone-muted">
            <Truck size={16} className="shrink-0" />
            Blanks ship in 2 business days. Printed orders take 7 to 10.
          </p>
        </div>
      </div>
    </div>
  )
}
