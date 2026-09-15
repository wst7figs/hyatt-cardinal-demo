import { Check, ChevronDown } from 'lucide-react'
import Media, { GarmentTrio, pickColor } from '../components/Media.jsx'
import { Button, Container, SectionHeader, Stars, TextLink } from '../components/Primitives.jsx'
import {
  shop,
  services,
  products,
  processSteps,
  methods,
  workSamples,
  testimonials,
  faqs,
  photos,
  reviewSummary,
} from '../data.js'
import { money } from '../shop/useCart.js'

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-10 sm:py-12 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

const HIGHLIGHTS = ['No minimum with DTG', '7 to 10 day turnaround', 'Free digital proof']

export function Hero() {
  return (
    <section className="pt-6 sm:pt-8">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <h1 className="text-[34px] text-bone sm:text-[44px]">
              Custom apparel, printed in house in Hamilton
            </h1>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-bone-muted">
              Screen printing, embroidery and direct to garment for teams, businesses and events.
              You approve a free proof before anything is printed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button as="a" href="#quote" size="lg">
                Get a free quote
              </Button>
              <Button as="a" href="#work" size="lg" variant="outline">
                See our work
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-2 text-[14px] text-bone-muted">
                  <Check size={16} className="text-volt-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <GarmentTrio
            src={photos.infoHero}
            alt="Printed apparel from the shop"
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[460px]"
          />
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-1 rounded-xl bg-volt-500 px-5 py-3 text-center text-[14px] text-ink-900 sm:flex-row sm:gap-2">
          <span className="font-semibold">Reorders have no setup fee.</span>
          <span>Screens and embroidery files are kept on file for 24 months.</span>
        </div>
      </Container>
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
      <div className="rounded-2xl border border-ink-700 bg-ink-850 p-7 sm:p-10">
        <SectionHeader
          title="How ordering works"
          description="Most orders are ready 7 to 10 business days after you approve the proof."
        />
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
      </div>
    </Section>
  )
}

const METHOD_ROWS = [
  ['bestFor', 'Best for'],
  ['minimum', 'Minimum order'],
  ['colours', 'Colours'],
  ['turnaround', 'Turnaround'],
  ['pricing', 'Pricing'],
]

export function Methods() {
  return (
    <Section id="methods">
      <SectionHeader
        title="Choosing a print method"
        description="Not sure which one fits? Send your artwork and we will recommend one in your quote."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {methods.map((m) => (
          <div key={m.name} className="rounded-xl border border-ink-700 bg-ink-850 p-6">
            <h3 className="text-[18px] text-bone">{m.name}</h3>
            <dl className="mt-4 divide-y divide-ink-700">
              {METHOD_ROWS.map(([key, label]) => (
                <div key={key} className="flex justify-between gap-6 py-2.5 text-[14px]">
                  <dt className="shrink-0 text-bone-muted">{label}</dt>
                  <dd className="text-right text-bone">{m[key]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
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

const ABOUT_POINTS = [
  {
    title: 'Printed in house',
    body: 'Nothing is sent out to another shop. You are welcome to visit and see your order on press.',
  },
  {
    title: 'Proof before print',
    body: 'You approve colours, size and placement on a mockup before any screens are made.',
  },
  {
    title: 'Easy reorders',
    body: 'Screens and embroidery files are kept for 24 months, so reordering has no setup fee.',
  },
]

export function About() {
  return (
    <section className="mt-2 border-t border-ink-700 py-10 sm:py-12">
      <Container>
        <h2 className="text-[18px] text-bone">
          {shop.name}: printing apparel in Hamilton since {shop.since}
        </h2>
        <p className="mt-3 max-w-4xl text-[14px] leading-relaxed text-bone-muted">
          We are a screen printing and embroidery shop on Barton Street East. Sports clubs,
          restaurants, trades companies, schools and clothing brands send us their artwork, and we
          print it on garments we stock and trust. Every job is printed, checked and packed by the
          same people you speak to on the phone.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {ABOUT_POINTS.map((a) => (
            <div key={a.title}>
              <h3 className="text-[15px] text-bone">{a.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-bone-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
