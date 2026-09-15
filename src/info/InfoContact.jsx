import { useState } from 'react'
import { MapPin, Phone, Mail, Check, Upload } from 'lucide-react'
import { Button, Container, Field, inputClass } from '../components/Primitives.jsx'
import { shop, services } from '../data.js'

const QUANTITIES = ['Under 24', '24 to 71', '72 to 143', '144 to 287', '288 or more', 'Not sure yet']
const TIMING = ['No fixed date', 'Within 2 weeks', 'Within 1 week', 'Rush, under 5 days']

export default function InfoContact({ service, setService }) {
  const [sent, setSent] = useState(false)
  const [file, setFile] = useState(null)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: QUANTITIES[1],
    timing: TIMING[0],
    message: '',
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section id="quote" className="py-10 sm:py-12">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-ink-700 bg-ink-850 p-6 sm:p-9">
            {sent ? (
              <div className="py-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-volt-500 text-ink-900">
                  <Check size={24} strokeWidth={3} />
                </span>
                <h2 className="mt-5 text-[26px] text-bone">Thanks, we have your request</h2>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-bone-muted">
                  We will email {form.email || 'you'} within one business day with pricing and a
                  timeline. For anything urgent, call {shop.phone}.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                  Send another request
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-[26px] text-bone sm:text-[28px]">Get a free quote</h2>
                <p className="mt-1.5 text-[15px] text-bone-muted">
                  Tell us what you need. We reply within one business day with pricing and a timeline.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                  className="mt-7 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" required>
                      <input required value={form.name} onChange={set('name')} className={inputClass} />
                    </Field>
                    <Field label="Company or team" hint="Optional">
                      <input value={form.company} onChange={set('company')} className={inputClass} />
                    </Field>
                    <Field label="Email" required>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Phone" hint="Optional">
                      <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <Field label="Service">
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Not sure yet</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Quantity">
                      <select value={form.quantity} onChange={set('quantity')} className={inputClass}>
                        {QUANTITIES.map((q) => (
                          <option key={q}>{q}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Needed by">
                      <select value={form.timing} onChange={set('timing')} className={inputClass}>
                        {TIMING.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Project details" required>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Garment, colours, print locations and sizes. For example: 60 black hoodies, logo on the left chest and a large back print."
                      className={`${inputClass} resize-y`}
                    />
                  </Field>

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-ink-500 px-4 py-4 text-[14px] text-bone-muted transition-colors duration-150 hover:border-bone-faint">
                    <Upload size={18} className="shrink-0 text-bone" />
                    <span className="min-w-0 truncate">
                      {file ? file.name : 'Attach artwork: AI, EPS, PDF, SVG, PNG or JPG'}
                    </span>
                    <input
                      type="file"
                      accept=".ai,.eps,.pdf,.svg,.png,.jpg,.jpeg,.psd"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      className="sr-only"
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <Button type="submit" size="lg">
                      Request my quote
                    </Button>
                    <p className="text-[13px] text-bone-faint">No obligation to order.</p>
                  </div>
                </form>
              </>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-ink-700 bg-ink-850 p-6 sm:p-7">
            <h3 className="text-[18px] text-bone">Visit or call the shop</h3>
            <ul className="mt-5 space-y-4 text-[14px] text-bone-muted">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-bone-faint" />
                <span>
                  {shop.addressLine1}
                  <br />
                  {shop.addressLine2}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-bone-faint" />
                <a href={shop.phoneHref} className="hover:text-bone">
                  {shop.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-bone-faint" />
                <a href={`mailto:${shop.email}`} className="break-all hover:text-bone">
                  {shop.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 border-t border-ink-700 pt-5">
              <h4 className="text-[14px] font-semibold text-bone">Hours</h4>
              <dl className="mt-3 space-y-2 text-[14px]">
                {shop.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-bone-muted">{h.day}</dt>
                    <dd className="text-right text-bone">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
