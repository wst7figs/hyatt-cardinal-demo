import { useEffect, useState } from 'react'
import { X, Plus, Minus, Trash2, Check, ShoppingBag } from 'lucide-react'
import Media from '../components/Media.jsx'
import { Button } from '../components/Primitives.jsx'
import { money, unitPriceFor, nextTierFor } from './useCart.js'
import { FREE_SHIPPING_THRESHOLD } from '../data.js'

function Stepper({ qty, onChange, label }) {
  return (
    <div className="flex h-9 items-center rounded-lg border border-ink-600">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label={`Decrease ${label}`}
        className="flex h-full w-9 items-center justify-center text-bone-muted hover:text-bone"
      >
        <Minus size={14} />
      </button>
      <span className="min-w-[2rem] text-center text-[14px] font-medium text-bone">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label={`Increase ${label}`}
        className="flex h-full w-9 items-center justify-center text-bone-muted hover:text-bone"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export default function CartDrawer({ open, onClose, cart }) {
  const [placed, setPlaced] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setPlaced(false)
  }, [open])

  if (!open) return null

  const pct = Math.min(100, (cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="animate-fade-in absolute inset-0 bg-black/60" onClick={onClose} />

      <aside className="animate-drawer-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink-700 bg-ink-900">
        <header className="flex items-center justify-between border-b border-ink-700 px-6 py-4">
          <h2 className="text-[18px] text-bone">
            Your cart{' '}
            {cart.count > 0 ? <span className="font-normal text-bone-muted">({cart.count})</span> : null}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-lg p-2 text-bone-muted hover:bg-ink-800 hover:text-bone"
          >
            <X size={20} />
          </button>
        </header>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-volt-500 text-ink-900">
              <Check size={24} strokeWidth={3} />
            </span>
            <h3 className="mt-5 text-[22px] text-bone">Order placed</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-bone-muted">
              This demo stops before payment. Nothing was charged and no order was created.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                cart.clear()
                setPlaced(false)
                onClose()
              }}
            >
              Continue shopping
            </Button>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={36} className="text-ink-500" />
            <p className="mt-4 text-[16px] font-semibold text-bone">Your cart is empty</p>
            <p className="mt-1 text-[14px] text-bone-muted">Choose a garment, colour and size to get started.</p>
            <Button variant="outline" className="mt-6" onClick={onClose}>
              Browse products
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-ink-700 px-6 py-4">
              <p className="text-[14px] text-bone-muted">
                {cart.toFreeShipping > 0 ? (
                  <>
                    Add <span className="font-semibold text-bone">{money(cart.toFreeShipping)}</span> more
                    for free shipping
                  </>
                ) : (
                  <span className="font-semibold text-bone">Your order ships free</span>
                )}
              </p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink-700">
                <div
                  className="h-full rounded-full bg-volt-500 transition-[width] duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-ink-700 overflow-y-auto px-6">
              {cart.items.map((i) => {
                const unit = unitPriceFor(i.product, i.qty)
                const tier = nextTierFor(i.product, i.qty)
                return (
                  <li key={i.key} className="flex gap-4 py-5">
                    <Media
                      src={i.product.image}
                      alt=""
                      garment={i.product.garment}
                      color={i.color.hex}
                      pad="p-2"
                      className="h-20 w-20 shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[15px] font-semibold leading-snug text-bone">{i.product.name}</h3>
                        <button
                          type="button"
                          onClick={() => cart.remove(i.key)}
                          aria-label={`Remove ${i.product.name}`}
                          className="shrink-0 rounded-md p-1 text-bone-faint hover:text-bone"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="mt-0.5 text-[13px] text-bone-muted">
                        {i.color.name}, {i.size}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <Stepper
                          qty={i.qty}
                          label={i.product.name}
                          onChange={(q) => cart.setQty(i.key, q)}
                        />
                        <div className="text-right">
                          <div className="text-[15px] font-semibold text-bone">{money(unit * i.qty)}</div>
                          {unit < i.product.price ? (
                            <div className="text-[12px] text-bone-muted">{money(unit)} each</div>
                          ) : null}
                        </div>
                      </div>
                      {tier ? (
                        <p className="mt-2.5 text-[13px] text-bone-muted">
                          Add {tier.need} more to pay {money(tier.price)} each
                        </p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>

            <footer className="border-t border-ink-700 px-6 py-5">
              <dl className="space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <dt className="text-bone-muted">Subtotal</dt>
                  <dd className="text-bone">{money(cart.subtotal)}</dd>
                </div>
                {cart.savings > 0 ? (
                  <div className="flex justify-between">
                    <dt className="text-bone-muted">Bulk savings</dt>
                    <dd className="font-medium text-volt-500">-{money(cart.savings)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-bone-muted">Shipping</dt>
                  <dd className="text-bone">{cart.shipping === 0 ? 'Free' : money(cart.shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink-700 pt-3 text-[16px] font-semibold">
                  <dt className="text-bone">Total</dt>
                  <dd className="text-bone">{money(cart.total)}</dd>
                </div>
              </dl>
              <Button size="lg" className="mt-5 w-full" onClick={() => setPlaced(true)}>
                Checkout
              </Button>
              <p className="mt-3 text-center text-[12px] text-bone-faint">Demo checkout. No payment is taken.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
