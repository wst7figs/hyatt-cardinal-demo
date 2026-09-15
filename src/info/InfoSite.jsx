import { useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { Button, Container } from '../components/Primitives.jsx'
import { shop } from '../data.js'
import InfoContact from './InfoContact.jsx'
import {
  Hero,
  Services,
  Garments,
  HowItWorks,
  Methods,
  ArtworkHelp,
  Work,
  Reviews,
  Faq,
  About,
} from './InfoSections.jsx'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Garments', href: '#garments' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Our work', href: '#work' },
  { label: 'FAQ', href: '#faq' },
]

function UtilityBar() {
  return (
    <div className="hidden border-b border-ink-700 bg-ink-950 md:block">
      <Container className="flex h-9 items-center justify-between text-[13px] text-bone-muted">
        <span>Free digital proof on every order</span>
        <div className="flex items-center gap-5">
          <span>{shop.hoursShort}</span>
          <a href={shop.phoneHref} className="flex items-center gap-1.5 font-medium text-bone hover:underline">
            <Phone size={13} />
            {shop.phone}
          </a>
        </div>
      </Container>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-900">
      <Container className="flex h-20 items-center gap-8">
        <a href="#top" className="shrink-0">
          <Logo className="h-16" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-[14px] font-medium text-bone-muted transition-colors duration-150 hover:bg-ink-800 hover:text-bone"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button as="a" href="#quote" className="hidden sm:inline-flex">
            Get a quote
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="rounded-lg p-2 text-bone hover:bg-ink-800 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-ink-700 lg:hidden">
          <Container className="py-3">
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink-800 py-3 text-[15px] font-medium text-bone"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid gap-2 pb-2 sm:grid-cols-2">
              <Button as="a" href="#quote" onClick={() => setOpen(false)}>
                Get a quote
              </Button>
              <Button as="a" href={shop.phoneHref} variant="outline">
                <Phone size={15} />
                {shop.phone}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}

export default function InfoSite() {
  const [prefill, setPrefill] = useState(null)

  function requestQuote(details) {
    setPrefill({ ...details, at: Date.now() })
    requestAnimationFrame(() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <div id="top" className="min-h-screen bg-ink-900">
      <UtilityBar />
      <Header />
      <main>
        <Hero onEstimate={(d) => requestQuote({ ...d, fromEstimate: true })} />
        <Services onPick={(name) => requestQuote({ service: name })} />
        <Garments />
        <HowItWorks />
        <Methods />
        <ArtworkHelp />
        <Work />
        <Reviews />
        <Faq />
        <InfoContact prefill={prefill} />
        <About />
      </main>
      <SiteFooter variant="info" />
    </div>
  )
}
