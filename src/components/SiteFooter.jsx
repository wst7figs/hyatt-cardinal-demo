import { useState } from 'react'
import { Check } from 'lucide-react'
import Logo from './Logo.jsx'
import { shop } from '../data.js'
import { Button, Container, inputClass } from './Primitives.jsx'

const COLUMNS = {
  info: [
    {
      title: 'Services',
      links: ['Screen printing', 'Embroidery', 'Direct to garment', 'Headwear', 'Private label', 'Uniform programs'],
    },
    {
      title: 'Company',
      links: ['About the shop', 'How ordering works', 'Recent work', 'Reviews', 'Careers'],
    },
    {
      title: 'Help',
      links: ['Artwork guidelines', 'Size charts', 'Turnaround times', 'Garment care', 'FAQ'],
    },
  ],
  shop: [
    {
      title: 'Shop',
      links: ['T-Shirts', 'Hoodies & Fleece', 'Headwear', 'Outerwear', 'Bags & Accessories', 'Gift cards'],
    },
    {
      title: 'Help',
      links: ['Shipping and delivery', 'Returns and exchanges', 'Size guide', 'Track an order', 'Contact us'],
    },
    {
      title: 'Company',
      links: ['About the shop', 'Printing services', 'Reviews', 'Wholesale accounts', 'Careers'],
    },
  ],
}

const dead = (e) => e.preventDefault()

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <div className="border-b border-ink-700">
      <Container className="grid items-center gap-5 py-10 lg:grid-cols-2">
        <div>
          <h2 className="text-[22px] text-bone">Get pricing updates and overrun sales</h2>
          <p className="mt-1.5 text-[14px] text-bone-muted">About one email a month. Unsubscribe any time.</p>
        </div>
        {done ? (
          <p className="flex items-center gap-2 text-[15px] font-medium text-bone lg:justify-self-end">
            <Check size={18} className="text-volt-500" />
            You are subscribed.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (email.trim()) setDone(true)
            }}
            className="flex w-full gap-2 lg:max-w-md lg:justify-self-end"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className={inputClass}
            />
            <Button type="submit" className="shrink-0">
              Subscribe
            </Button>
          </form>
        )}
      </Container>
    </div>
  )
}

export default function SiteFooter({ variant = 'info' }) {
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <Newsletter />

      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Logo className="h-14" />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-bone-muted">{shop.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {shop.socials.map((s) => (
              <a key={s.label} href="#" onClick={dead} className="text-[14px] text-bone-muted hover:text-bone">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {COLUMNS[variant].map((col) => (
          <div key={col.title}>
            <h3 className="text-[14px] font-semibold text-bone">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" onClick={dead} className="text-[14px] text-bone-muted hover:text-bone">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-[14px] font-semibold text-bone">Contact</h3>
          <address className="mt-4 space-y-2.5 text-[14px] not-italic text-bone-muted">
            <p>
              {shop.addressLine1}
              <br />
              {shop.addressLine2}
            </p>
            <p>
              <a href={shop.phoneHref} className="hover:text-bone">
                {shop.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${shop.email}`} className="break-all hover:text-bone">
                {shop.email}
              </a>
            </p>
            <p>{shop.hoursShort}</p>
          </address>
        </div>
      </Container>

      <div className="border-t border-ink-700">
        <Container className="flex flex-col gap-3 pb-24 pt-6 text-[13px] text-bone-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {shop.name}
          </p>
          <div className="flex flex-wrap gap-5">
            {['Privacy', 'Terms', 'Accessibility'].map((l) => (
              <a key={l} href="#" onClick={dead} className="hover:text-bone">
                {l}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}
