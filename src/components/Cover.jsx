import { ArrowRight, Check } from 'lucide-react'
import Logo from './Logo.jsx'
import { Container } from './Primitives.jsx'

function Bar({ className = '' }) {
  return <div className={`rounded-[3px] bg-ink-600 ${className}`} />
}

function InfoPreview() {
  return (
    <div className="flex aspect-[16/10] flex-col gap-2.5 rounded-lg bg-ink-900 p-4">
      <div className="flex items-center gap-2">
        <Bar className="h-3 w-12" />
        <div className="ml-4 flex gap-2">
          <Bar className="h-2 w-8" />
          <Bar className="h-2 w-8" />
          <Bar className="h-2 w-8" />
        </div>
        <div className="ml-auto h-4 w-14 rounded-[3px] bg-volt-500" />
      </div>
      <div className="grid flex-1 grid-cols-2 overflow-hidden rounded-md bg-ink-800">
        <div className="flex flex-col justify-center gap-2 p-3">
          <Bar className="h-3 w-4/5" />
          <Bar className="h-3 w-3/5" />
          <div className="mt-1 h-3.5 w-12 rounded-[3px] bg-volt-500" />
        </div>
        <div className="bg-studio" />
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-[3px] bg-studio/80" />
        ))}
      </div>
    </div>
  )
}

function StorePreview() {
  return (
    <div className="flex aspect-[16/10] flex-col gap-2.5 rounded-lg bg-ink-900 p-4">
      <div className="flex items-center gap-2">
        <Bar className="h-3 w-12" />
        <div className="mx-3 h-4 flex-1 rounded-full bg-ink-700" />
        <Bar className="h-3 w-3" />
        <div className="h-3 w-3 rounded-[3px] bg-volt-500" />
      </div>
      <div className="grid flex-1 grid-cols-[22%_1fr] gap-2.5">
        <div className="flex flex-col gap-2 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Bar key={i} className="h-2 w-4/5" />
          ))}
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-[3px] bg-studio/80" />
          ))}
        </div>
      </div>
    </div>
  )
}

function Option({ label, title, body, points, preview, onOpen }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 transition-colors duration-150 hover:border-ink-500">
      <div className="border-b border-ink-700 bg-ink-950 p-5">{preview}</div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[13px] font-semibold text-volt-500">{label}</p>
        <h2 className="mt-1.5 text-[22px] text-bone">{title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-bone-muted">{body}</p>
        <ul className="mt-5 space-y-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[14px] text-bone-muted">
              <Check size={16} className="mt-0.5 shrink-0 text-volt-500" />
              {p}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onOpen}
          className="mt-auto inline-flex items-center gap-2 pt-7 text-left text-[15px] font-semibold text-bone underline-offset-4 after:absolute after:inset-0 group-hover:underline"
        >
          Open the {title.toLowerCase()}
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  )
}

export default function Cover({ onOpen }) {
  return (
    <div className="min-h-screen bg-ink-900">
      <Container className="flex min-h-screen flex-col justify-center py-14">
        <Logo className="h-20 self-start" />
        <h1 className="mt-8 max-w-2xl text-[34px] text-bone sm:text-[44px]">
          Two directions for the new website
        </h1>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-bone-muted">
          Both use the same branding and content. Open one, click through it, and use the bar at
          the bottom of the screen to switch.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Option
            label="Option 1"
            title="Informational website"
            body="For customers who want to understand what you do and ask for a quote. Organised like the Vistaprint homepage: services, garments, process, past work and a quote form."
            points={[
              'Service and garment overview',
              'Print method comparison',
              'Recent work and reviews',
              'Quote form with artwork upload',
            ]}
            preview={<InfoPreview />}
            onOpen={() => onOpen('info')}
          />
          <Option
            label="Option 2"
            title="Online store"
            body="For customers who want to buy blanks directly. A full catalogue with filters, product details, and a cart that applies bulk pricing automatically."
            points={[
              'Category and price filters',
              'Colour, size and quantity selection',
              'Bulk pricing at 24, 72 and 144 pieces',
              'Cart with free shipping progress',
            ]}
            preview={<StorePreview />}
            onOpen={() => onOpen('shop')}
          />
        </div>

        <p className="mt-8 text-[13px] text-bone-faint">
          Contact details, prices, client names and reviews are placeholders.
        </p>
      </Container>
    </div>
  )
}
