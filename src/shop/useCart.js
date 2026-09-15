import { useState, useMemo, useCallback } from 'react'
import { FREE_SHIPPING_THRESHOLD } from '../data.js'

const SHIPPING_FLAT = 14

/* Bulk tiers are written as "24+", "72+". The best tier a line qualifies for
   sets that line's unit price. */
export function unitPriceFor(product, qty) {
  if (!product.bulk?.length) return product.price
  let price = product.price
  for (const tier of product.bulk) {
    const min = parseInt(tier.qty, 10)
    if (qty >= min) price = tier.price
  }
  return price
}

export function nextTierFor(product, qty) {
  if (!product.bulk?.length) return null
  for (const tier of product.bulk) {
    const min = parseInt(tier.qty, 10)
    if (qty < min) return { need: min - qty, price: tier.price }
  }
  return null
}

export function useCart() {
  const [items, setItems] = useState([])

  const add = useCallback((product, color, size, qty = 1) => {
    const key = `${product.id}|${color.name}|${size}`
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [
        ...prev,
        {
          key,
          product,
          color,
          size,
          qty,
        },
      ]
    })
  }, [])

  const setQty = useCallback((key, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    )
  }, [])

  const remove = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totals = useMemo(() => {
    let subtotal = 0
    let listTotal = 0
    let count = 0
    for (const i of items) {
      const unit = unitPriceFor(i.product, i.qty)
      subtotal += unit * i.qty
      listTotal += i.product.price * i.qty
      count += i.qty
    }
    const savings = listTotal - subtotal
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT
    return {
      count,
      subtotal,
      savings,
      shipping,
      total: subtotal + shipping,
      toFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    }
  }, [items])

  return { items, add, setQty, remove, clear, ...totals }
}

export const money = (n) =>
  n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2 })
