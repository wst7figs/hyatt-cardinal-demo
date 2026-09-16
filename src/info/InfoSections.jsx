import { ArrowRight, ChevronDown, Phone, Star } from 'lucide-react'
import Media, { pickColor } from '../components/Media.jsx'
import Estimator from '../components/Estimator.jsx'
import { Button, Container, SectionHeader, Stars, TextLink } from '../components/Primitives.jsx'
import {
  shop,
  services,
  products,
  processSteps,
  workSamples,
  testimonials,
  faqs,
  photos,
  reviewSummary,
  trustStats,
  clients,
} from '../data.js'
import { money } from '../shop/useCart.js'

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-10 sm:py-12 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

const WORDMARKS = [
  'text-[14px] font-extrabold uppercase tracking-[0.14em]',
  'font-serif text-[18px] font-semibold italic',
  'text-[13px] font-bold uppercase tracking-[0.24em]',
  'text-[17px] font-extrabold tracking-[-0.03em]',
  'text-[14px] font-semibold uppercase tracking-[0.1em]',
  'font-serif text-[17px] font-bold',
]

export function Hero({ onEstimate }) {
  return (
    <section className="border-b border-ink-700 bg-ink-950">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16 lg:py-20">
        <div>
          <a
            href="#reviews"
            className="inline-flex items-center gap-2.5 rounded-full border border-ink-600 bg-ink-900 py-1.5 pl-1.5 pr-4 text-[13px] text-bone-muted transition-colors duration-150 hover:border-ink-500 hover:text-bone"
          >
            <span className="flex items-center gap-1 rounded-full bg-volt-500 px-2 py-0.5 text-[12px] font-bold text-ink-900">
              <Star size={12} strokeWidth={0} className="fill-ink-900" />
              {reviewSummary.rating}
            </span>
            Rated by {reviewSummary.count} customers on {reviewSummary.source}
          </a>

          <h1 className="mt-6 max-w-3xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.035em] text-bone sm:text-[54px] xl:text-[64px]">
            Branded apparel, printed in house and delivered on time.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-bone-muted">
            Screen printing, embroidery and direct to garment for teams, schools and businesses
            across Ontario. Every order includes a free proof, and every quote comes back within one
            business day.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#quote" size="xl">
              Start your quote
              <ArrowRight size={18} />
            </Button>
            <Button as="a" href={shop.phoneHref} size="xl" variant="outline">
              <Phone size={17} />
              {shop.phone}
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-ink-700 pt-6">
            {trustStats.map((s, i) => (
              <div key={s.label} className={i === 0 ? 'pr-4' : 'border-l border-ink-700 px-4'}>
                <p className="text-[24px] font-extrabold tracking-[-0.03em] text-bone sm:text-[30px]">{s.value}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-bone-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Estimator onContinue={onEstimate} />
      </Container>

      <div className="border-t border-ink-700">
        <Container className="flex flex-col items-center gap-5 py-7 lg:flex-row lg:justify-between lg:gap-10">
          <p className="shrink-0 text-[13px] font-medium text-bone-faint">
            Trusted by teams and businesses across Hamilton
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-ink-400 lg:justify-end">
            {clients.map((c, i) => (
              <li key={c} className={WORDMARKS[i % WORDMARKS.length]}>
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}

export function Services({ onPick }) {
  return (
    <Section id="services">
      <SectionHeader
        title="Explore our services"
        action={<TextLink href="#quote">Get a quote</TextLink>}
      />
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {services.map((s) => (
          <button key={s.id} type="button" onClick={() => onPick(s.name)} className="group text-left">
            <Media
              src={s.image}
              alt={s.name}
              garment={s.garment}
              color={s.color}
              print={s.print}
              zoom
              className="aspect-square rounded-xl"
            />
            <h3 className="mt-3 text-[15px] font-semibold text-bone underline-offset-4 group-hover:underline">
              {s.name}
            </h3>
            <p className="mt-0.5 text-[13px] text-bone-muted">{s.min}</p>
          </button>
        ))}
      </div>
    </Section>
  )
}

const FEATURED = ['hc-tee-heavy', 'hc-hoodie-mid', 'hc-crew', 'hc-cap-6panel', 'hc-coach', 'hc-tote']

export function Garments() {
  const list = FEATURED.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  return (
    <Section id="garments">
      <SectionHeader
        title="Popular garments"
        description="Blank prices at our highest quantity tier. Printing is added to your quote."
        action={<TextLink href="#quote">Ask about other styles</TextLink>}
      />
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {list.map((p) => {
          const low = p.bulk?.length ? p.bulk[p.bulk.length - 1].price : p.price
          return (
            <a key={p.id} href="#quote" className="group">
              <Media
                src={p.image}
                alt={p.name}
                garment={p.garment}
                color={pickColor(p.colors).hex}
                zoom
                className="aspect-square rounded-xl"
              />
              <h3 className="mt-3 text-[15px] font-semibold leading-snug text-bone underline-offset-4 group-hover:underline">
                {p.name}
              </h3>
              <p className="mt-0.5 text-[13px] text-bone-muted">{p.colors.length} colours</p>
              <p className="mt-1 text-[14px] text-bone">
                From <span className="font-semibold">{money(low)}</span>
              </p>
            </a>
          )
        })}
      </div>
    </Section>
  )
}

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeader title="How ordering works" />
      <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((s, i) => (
          <li key={s.title}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-volt-500 text-[15px] font-bold text-ink-900">
              {i + 1}
            </span>
            <h3 className="mt-4 text-[17px] text-bone">{s.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-bone-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function ArtworkHelp() {
  return (
    <Section>
      <div className="grid overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 lg:grid-cols-2">
        <Media
          src={photos.artwork}
          alt="Artwork prepared for print"
          garment="tee"
          color="#2b3a55"
          print="HC"
          pad="p-[12%]"
          className="aspect-[4/3] lg:aspect-auto lg:min-h-[360px]"
        />
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="text-[13px] font-semibold text-volt-500">Artwork help</p>
          <h2 className="mt-2 text-[28px] text-bone sm:text-[32px]">Only have a sketch? We will redraw it.</h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-bone-muted">
            Send a photo, a rough drawing or an old shirt. We clean it up for print at no charge on
            orders over 50 pieces, and you see it on the garment before you approve anything.
          </p>
          <div className="mt-7">
            <Button as="a" href="#quote" variant="light" size="lg">
              Send your artwork
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

const initials = (title) =>
  title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export function Work() {
  return (
    <Section id="work">
      <SectionHeader
        title="Recent work"
        description="A few orders that left the shop this season."
        action={<TextLink href="#quote">Start your order</TextLink>}
      />
      <div className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {workSamples.map((w) => (
          <article key={w.title}>
            <Media
              src={w.image}
              alt={`${w.title}, ${w.type}`}
              garment={w.garment}
              color={w.color}
              print={initials(w.title)}
              pad="p-[14%]"
              className="aspect-[4/3] rounded-xl"
            />
            <h3 className="mt-3 text-[16px] text-bone">{w.title}</h3>
            <p className="mt-0.5 text-[14px] text-bone-muted">
              {w.type}, {w.method.charAt(0).toLowerCase() + w.method.slice(1)}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}

export function Reviews() {
  return (
    <Section id="reviews">
      <SectionHeader
        title="What customers say"
        action={
          <div className="flex items-center gap-2 text-[14px] text-bone-muted">
            <Stars value={reviewSummary.rating} size={16} />
            <span>
              <span className="font-semibold text-bone">{reviewSummary.rating}</span> from{' '}
              {reviewSummary.count} {reviewSummary.source} reviews
            </span>
          </div>
        }
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-xl border border-ink-700 bg-ink-850 p-6">
            <Stars value={5} />
            <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-bone">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[14px]">
              <div className="font-semibold text-bone">{t.name}</div>
              <div className="text-bone-muted">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-16">
        <div>
          <h2 className="text-[24px] text-bone sm:text-[28px]">Frequently asked questions</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-bone-muted">
            Can&apos;t find your answer? Call the shop at{' '}
            <a href={shop.phoneHref} className="font-medium text-bone underline underline-offset-4">
              {shop.phone}
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-ink-700 border-y border-ink-700">
          {faqs.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[15px] font-semibold text-bone [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-bone-muted transition-transform duration-150 group-open:rotate-180"
                />
              </summary>
              <p className="pb-5 pr-8 text-[14px] leading-relaxed text-bone-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}

