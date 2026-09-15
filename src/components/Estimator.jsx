import { useMemo, useState } from 'react'
import { ArrowRight, Minus, Plus } from 'lucide-react'
import Media from './Media.jsx'
import { Button } from './Primitives.jsx'
import { estimator, products } from '../data.js'
import { money, unitPriceFor } from '../shop/useCart.js'

const tierPrice = (tiers, qty) =>
  tiers.reduce((price, t) => (qty >= t.min ? t.price : price), tiers[0].price)

function Label({ children, aside }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <span className="text-[13px] font-semibold text-bone">{children}</span>
      {aside ? <span className="text-[12px] text-bone-faint">{aside}</span> : null}
    </div>
  )
}

function Segmented({ label, options, value, onChange, disabled = false }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={`grid rounded-lg border border-ink-600 bg-ink-950 p-1 ${
        disabled ? 'pointer-events-none opacity-40' : ''
      }`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={disabled ? -1 : 0}
            onClick={() => onChange(o.value)}
            className={`h-9 whitespace-nowrap rounded-md px-1 text-[12px] font-semibold transition-colors duration-150 sm:text-[13px] ${
              active ? 'bg-bone text-ink-900' : 'text-bone-muted hover:text-bone'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export default function Estimator({ onContinue, className = '' }) {
  const [garmentId, setGarmentId] = useState('tee')
  const [methodId, setMethodId] = useState('screen')
  const [qty, setQty] = useState(72)
  const [colours, setColours] = useState(2)
  const [locations, setLocations] = useState(1)

  const garment = estimator.garments.find((g) => g.id === garmentId)
  const method = estimator.methods.find((m) => m.id === methodId)
  const product = products.find((p) => p.id === garment.productId)
  const belowMin = qty < method.minimum

  const { unit, total } = useMemo(() => {
    const blank = unitPriceFor(product, qty)
    const decoration = tierPrice(method.tiers, qty) * (method.perColour ? colours : 1) * locations
    return { unit: blank + decoration, total: (blank + decoration) * qty }
  }, [product, method, qty, colours, locations])

  const setQuantity = (n) => setQty(Math.min(10000, Math.max(1, Number.isFinite(n) ? n : 1)))

  return (
    <div
      className={`rounded-2xl border border-ink-700 bg-ink-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-ink-700 px-5 py-3.5 sm:px-6">
        <div>
          <p className="text-[15px] font-semibold text-bone">Instant price estimate</p>
          <p className="text-[13px] text-bone-muted">Garment and printing, per piece</p>
        </div>
        <span className="shrink-0 rounded-full border border-ink-600 px-2.5 py-1 text-[12px] font-medium text-bone-muted">
          No signup
        </span>
      </div>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div>
          <Label>Garment</Label>
          <div className="grid grid-cols-4 gap-2">
            {estimator.garments.map((g) => {
              const active = g.id === garmentId
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGarmentId(g.id)}
                  aria-pressed={active}
                  className={`overflow-hidden rounded-lg border text-center transition-colors duration-150 ${
                    active ? 'border-volt-500 ring-1 ring-volt-500' : 'border-ink-600 hover:border-ink-500'
                  }`}
                >
                  <Media garment={g.garment} color={g.color} pad="p-[12%]" className="aspect-[5/3]" />
                  <span
                    className={`block truncate px-1 py-1 text-[12px] font-semibold ${
                      active ? 'text-bone' : 'text-bone-muted'
                    }`}
                  >
                    {g.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <Label>Decoration</Label>
          <Segmented
            label="Decoration method"
            value={methodId}
            onChange={setMethodId}
            options={estimator.methods.map((m) => ({ value: m.id, label: m.label }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <Label aside={`Min ${method.minimum}`}>Quantity</Label>
            <div className="flex h-11 items-center rounded-lg border border-ink-600 bg-ink-950 transition-[border-color,box-shadow] duration-150 focus-within:border-volt-500 focus-within:ring-4 focus-within:ring-volt-500/15">
              <button
                type="button"
                onClick={() => setQuantity(qty - 1)}
                aria-label="Decrease quantity"
                className="flex h-full w-9 shrink-0 items-center justify-center text-bone-muted hover:text-bone"
              >
                <Minus size={15} />
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                value={qty}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                aria-label="Quantity"
                className="h-full w-full min-w-0 bg-transparent text-center text-[15px] font-semibold text-bone focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => setQuantity(qty + 1)}
                aria-label="Increase quantity"
                className="flex h-full w-9 shrink-0 items-center justify-center text-bone-muted hover:text-bone"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
          <div>
            <Label>Print locations</Label>
            <Segmented
              label="Print locations"
              value={locations}
              onChange={setLocations}
              options={[
                { value: 1, label: '1 side' },
                { value: 2, label: '2 sides' },
              ]}
            />
          </div>
        </div>

        <div>
          <Label aside={method.perColour ? 'Per location' : 'Screen print only'}>Ink colours</Label>
          <Segmented
            label="Ink colours"
            value={colours}
            onChange={setColours}
            disabled={!method.perColour}
            options={[1, 2, 3, 4].map((n) => ({ value: n, label: String(n) }))}
          />
        </div>

        <div className="rounded-xl border border-ink-700 bg-ink-850 px-5 py-4" aria-live="polite">
          {belowMin ? (
            <div>
              <p className="text-[15px] font-semibold text-bone">
                {method.label} starts at {method.minimum} pieces
              </p>
              <p className="mt-1 text-[13px] text-bone-muted">
                Increase your quantity, or use DTG for smaller runs.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="light" onClick={() => setQuantity(method.minimum)}>
                  Set to {method.minimum}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMethodId('dtg')}>
                  Switch to DTG
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[13px] text-bone-muted">Estimated per piece</p>
                <p className="mt-1 text-[34px] font-extrabold leading-none tracking-[-0.03em] text-bone">
                  {money(unit)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-bone-muted">{qty.toLocaleString('en-CA')} pieces</p>
                <p className="mt-1 text-[18px] font-bold text-bone">{money(total)}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <Button
            size="lg"
            className="w-full"
            disabled={belowMin}
            onClick={() =>
              onContinue({ service: method.service, garment: garment.formLabel, quantity: qty, locations })
            }
          >
            Get my exact quote
            <ArrowRight size={17} />
          </Button>
          <p className="mt-2.5 text-center text-[12px] text-bone-faint">
            Estimate based on standard garments. Final pricing is confirmed in writing.
          </p>
        </div>
      </div>
    </div>
  )
}
