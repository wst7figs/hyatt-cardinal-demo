import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react'
import { Button, Container } from '../components/Primitives.jsx'
import { shop, services } from '../data.js'

const GARMENTS = ['T-shirts', 'Hoodies', 'Crewnecks', 'Polos', 'Hats', 'Jackets', 'Bags', 'Not sure yet']
const LOCATIONS = ['Front', 'Back', 'Left chest', 'Sleeve', 'Other']
const STEPS = ['Project', 'Artwork', 'Contact']
const MAX_FILES = 5
const MAX_BYTES = 25 * 1024 * 1024
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const NEXT_STEPS = [
  { title: 'We review your request', body: 'A production lead checks the garments, quantities and artwork.' },
  { title: 'You get a written quote', body: 'Itemised pricing and a delivery date within one business day.' },
  { title: 'You approve a proof', body: 'Nothing is printed until you sign off on the mockup.' },
]

const EMPTY = {
  service: '',
  garments: [],
  quantity: '',
  deadline: '',
  locations: [],
  details: '',
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  contactBy: 'Email',
}

const control =
  'w-full rounded-lg border bg-ink-950 text-[15px] text-bone placeholder:text-ink-400 transition-[border-color,box-shadow] duration-150 focus:border-volt-500 focus:outline-none focus:ring-4 focus:ring-volt-500/15'

const tone = (error) => (error ? 'border-volt-500' : 'border-ink-600 hover:border-ink-500')

const localToday = () => {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value) {
  if (!value) return 'No fixed date'
  return new Date(`${value}T00:00`).toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function ErrorText({ id, children }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-volt-500">
      <AlertCircle size={14} className="shrink-0" />
      {children}
    </p>
  )
}

function Field({ id, label, optional, error, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-medium text-bone">
          {label}
        </label>
        {optional ? <span className="text-[12px] text-bone-faint">Optional</span> : null}
      </div>
      {children}
      {error ? (
        <ErrorText id={`${id}-error`}>{error}</ErrorText>
      ) : hint ? (
        <p className="mt-2 text-[13px] text-bone-faint">{hint}</p>
      ) : null}
    </div>
  )
}

function Group({ legend, optional, error, hint, children }) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div aria-hidden="true" className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-[14px] font-medium text-bone">{legend}</span>
        {optional ? <span className="text-[12px] text-bone-faint">Optional</span> : null}
      </div>
      {children}
      {error ? <ErrorText>{error}</ErrorText> : hint ? <p className="mt-2 text-[13px] text-bone-faint">{hint}</p> : null}
    </fieldset>
  )
}

function TextInput({ id, error, className = '', ...props }) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${control} ${tone(error)} h-12 px-4 ${className}`}
      {...props}
    />
  )
}

function Chip({ active, onClick, id, children }) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors duration-150 ${
        active
          ? 'border-bone bg-bone text-ink-900'
          : 'border-ink-600 bg-ink-950 text-bone-muted hover:border-ink-500 hover:text-bone'
      }`}
    >
      {active ? <Check size={14} strokeWidth={3} /> : null}
      {children}
    </button>
  )
}

function ServiceCard({ service, active, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`relative flex flex-col items-start justify-start rounded-xl border p-4 text-left transition-colors duration-150 ${
        active ? 'border-volt-500 bg-ink-800' : 'border-ink-600 bg-ink-950 hover:border-ink-500'
      }`}
    >
      <span className="block pr-7 text-[14px] font-semibold text-bone">{service.name}</span>
      <span className="mt-0.5 block text-[13px] text-bone-muted">{service.min}</span>
      <span
        className={`absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border ${
          active ? 'border-volt-500 bg-volt-500 text-ink-900' : 'border-ink-500'
        }`}
      >
        {active ? <Check size={12} strokeWidth={3} /> : null}
      </span>
    </button>
  )
}

function Dropzone({ files, setFiles }) {
  const [over, setOver] = useState(false)
  const [note, setNote] = useState('')
  const inputRef = useRef(null)

  function add(list) {
    const incoming = Array.from(list)
    const tooBig = incoming.filter((f) => f.size > MAX_BYTES)
    const next = [...files]
    for (const f of incoming) {
      if (f.size <= MAX_BYTES && !next.some((x) => x.name === f.name && x.size === f.size)) next.push(f)
    }
    setFiles(next.slice(0, MAX_FILES))
    if (tooBig.length) setNote(`Files over 25 MB were not added. Email them to ${shop.email}.`)
    else if (next.length > MAX_FILES) setNote(`You can attach up to ${MAX_FILES} files.`)
    else setNote('')
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          add(e.dataTransfer.files)
        }}
        className={`flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-8 text-center transition-colors duration-150 ${
          over ? 'border-volt-500 bg-ink-800' : 'border-ink-500 bg-ink-950'
        }`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-800 text-bone">
          <Upload size={20} />
        </span>
        <p className="mt-3 text-[15px] font-semibold text-bone">
          Drag files here or{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-volt-500 underline underline-offset-4 hover:text-volt-400"
          >
            browse
          </button>
        </p>
        <p className="mt-1 text-[13px] text-bone-faint">AI, EPS, PDF, SVG, PNG or JPG. Up to 5 files, 25 MB each.</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".ai,.eps,.pdf,.svg,.png,.jpg,.jpeg,.psd"
          onChange={(e) => {
            add(e.target.files)
            e.target.value = ''
          }}
          className="sr-only"
          tabIndex={-1}
        />
      </div>

      {note ? <ErrorText>{note}</ErrorText> : null}

      {files.length ? (
        <ul className="mt-3 space-y-2">
          {files.map((f) => (
            <li
              key={`${f.name}-${f.size}`}
              className="flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-950 px-3.5 py-2.5"
            >
              <FileText size={18} className="shrink-0 text-bone-muted" />
              <span className="min-w-0 flex-1 truncate text-[14px] text-bone">{f.name}</span>
              <span className="shrink-0 text-[12px] text-bone-faint">{formatSize(f.size)}</span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((x) => x !== f))}
                aria-label={`Remove ${f.name}`}
                className="shrink-0 rounded-md p-1 text-bone-faint hover:bg-ink-800 hover:text-bone"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Summary({ form, files, onEdit }) {
  const rows = [
    ['Service', form.service || 'Not sure yet', 0],
    ['Garments', form.garments.join(', '), 0],
    ['Quantity', `${Number(form.quantity).toLocaleString('en-CA')} pieces`, 0],
    ['Needed by', formatDate(form.deadline), 0],
    ['Print locations', form.locations.join(', ') || 'To be discussed', 1],
    ['Artwork', files.length ? `${files.length} ${files.length === 1 ? 'file' : 'files'} attached` : 'Sending later', 1],
  ]

  return (
    <dl className="divide-y divide-ink-700 rounded-xl border border-ink-700 bg-ink-950">
      {rows.map(([label, value, step]) => (
        <div key={label} className="flex items-start justify-between gap-4 px-4 py-3 text-[14px]">
          <dt className="shrink-0 text-bone-muted">{label}</dt>
          <dd className="flex min-w-0 items-start gap-3 text-right text-bone">
            <span className="min-w-0">{value}</span>
            {onEdit ? (
              <button
                type="button"
                onClick={() => onEdit(step)}
                className="shrink-0 text-[13px] font-semibold text-bone-muted underline underline-offset-4 hover:text-bone"
              >
                Edit
              </button>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function StepHeading({ title, body }) {
  return (
    <div>
      <h3 className="text-[22px] font-bold tracking-[-0.02em] text-bone">{title}</h3>
      {body ? <p className="mt-1 text-[15px] text-bone-muted">{body}</p> : null}
    </div>
  )
}

export default function InfoContact({ prefill }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(EMPTY)
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [reference, setReference] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!prefill) return
    setForm((f) => ({
      ...f,
      service: prefill.service ?? f.service,
      garments: prefill.garment ? [prefill.garment] : f.garments,
      quantity: prefill.quantity ? String(prefill.quantity) : f.quantity,
      locations: prefill.locations ? LOCATIONS.slice(0, prefill.locations) : f.locations,
    }))
    setErrors({})
    setStep(0)
    setReference(null)
  }, [prefill])

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }

  const toggle = (key, value) =>
    update(key, form[key].includes(value) ? form[key].filter((v) => v !== value) : [...form[key], value])

  function validate(s) {
    const e = {}
    if (s === 0) {
      if (!form.garments.length) e.garments = 'Choose at least one garment type.'
      const q = Number(form.quantity)
      if (!form.quantity || !Number.isInteger(q) || q < 1) e.quantity = 'Enter how many pieces you need.'
    }
    if (s === 1 && form.details.trim().length < 10) {
      e.details = 'Add a short description so we can price it accurately.'
    }
    if (s === 2) {
      if (!form.firstName.trim()) e.firstName = 'Enter your first name.'
      if (!form.lastName.trim()) e.lastName = 'Enter your last name.'
      if (!EMAIL.test(form.email.trim())) e.email = 'Enter a valid email address.'
      if (form.contactBy === 'Phone' && form.phone.replace(/\D/g, '').length < 10) {
        e.phone = 'Enter a phone number so we can call you.'
      }
    }
    return e
  }

  function goTo(next) {
    setStep(next)
    if ((cardRef.current?.getBoundingClientRect().top ?? 0) < 0) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function submit(event) {
    event.preventDefault()
    const found = validate(step)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`quote-${first}`)?.focus()
      return
    }
    if (step < STEPS.length - 1) {
      goTo(step + 1)
      return
    }
    setReference(`HC-${Math.floor(10000 + Math.random() * 90000)}`)
    goTo(step)
  }

  function reset() {
    setForm(EMPTY)
    setFiles([])
    setErrors({})
    setStep(0)
    setReference(null)
  }

  return (
    <section id="quote" className="border-y border-ink-700 bg-ink-950 py-14 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-volt-500">Free quote</p>
          <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-bone sm:text-[44px]">
            Tell us about your order. We will price it within one business day.
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-bone-muted">
            No obligation to order. A member of our production team reviews every request personally.
          </p>

          <ol className="mt-10">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
                {i < NEXT_STEPS.length - 1 ? (
                  <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-9 w-px bg-ink-700" />
                ) : null}
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-600 bg-ink-900 text-[13px] font-bold text-bone">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="text-[15px] font-semibold text-bone">{s.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-bone-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-ink-700 bg-ink-900 p-5">
            <p className="text-[15px] font-semibold text-bone">Prefer to talk it through?</p>
            <div className="mt-3 space-y-2.5 text-[14px]">
              <a href={shop.phoneHref} className="flex items-center gap-2.5 text-bone hover:underline">
                <Phone size={16} className="shrink-0 text-bone-faint" />
                {shop.phone}
              </a>
              <a href={`mailto:${shop.email}`} className="flex items-center gap-2.5 break-all text-bone hover:underline">
                <Mail size={16} className="shrink-0 text-bone-faint" />
                {shop.email}
              </a>
              <p className="flex items-center gap-2.5 text-bone-muted">
                <Clock size={16} className="shrink-0 text-bone-faint" />
                {shop.hoursShort}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={cardRef}
          className="scroll-mt-28 overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
        >
          {reference ? (
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-volt-500 text-ink-900">
                <Check size={28} strokeWidth={3} />
              </span>
              <h3 className="mt-6 text-[28px] font-extrabold tracking-[-0.025em] text-bone">Request received</h3>
              <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-bone-muted">
                Thanks, {form.firstName.trim()}. We will send your quote to{' '}
                <span className="font-medium text-bone">{form.email.trim()}</span> within one business day.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-ink-700 bg-ink-950 px-4 py-3">
                <span className="text-[13px] text-bone-muted">Reference number</span>
                <span className="text-[15px] font-bold tracking-wide text-bone">{reference}</span>
              </div>
              <div className="mt-8">
                <Summary form={form} files={files} />
              </div>
              <Button variant="outline" size="lg" className="mt-8" onClick={reset}>
                Start another request
              </Button>
              <p className="mt-6 text-[12px] text-bone-faint">Demo form. Nothing was sent.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="border-b border-ink-700 px-6 py-5 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[13px] font-medium text-bone-muted">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <p className="text-[13px] text-bone-faint">About 2 minutes</p>
                </div>
                <ol className="mt-3 grid grid-cols-3 gap-2">
                  {STEPS.map((label, i) => (
                    <li key={label}>
                      <div
                        className={`h-1 rounded-full transition-colors duration-300 ${
                          i <= step ? 'bg-volt-500' : 'bg-ink-700'
                        }`}
                      />
                      {i < step ? (
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          className="mt-2 text-[13px] font-semibold text-bone-muted underline-offset-4 hover:text-bone hover:underline"
                        >
                          {label}
                        </button>
                      ) : (
                        <p
                          aria-current={i === step ? 'step' : undefined}
                          className={`mt-2 text-[13px] font-semibold ${i === step ? 'text-bone' : 'text-bone-faint'}`}
                        >
                          {label}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-7 px-6 py-7 sm:px-8">
                {step === 0 ? (
                  <>
                    <StepHeading
                      title="What are you ordering?"
                      body="Pick a decoration method if you know it. Otherwise we will recommend one."
                    />
                    {prefill?.fromEstimate ? (
                      <div className="flex items-center gap-2.5 rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-[14px] text-bone-muted">
                        <Check size={16} className="shrink-0 text-volt-500" />
                        We filled this in from your estimate. Change anything that is not right.
                      </div>
                    ) : null}
                    <Group legend="Decoration method" optional>
                      <div role="radiogroup" aria-label="Decoration method" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {services.map((s) => (
                          <ServiceCard
                            key={s.id}
                            service={s}
                            active={form.service === s.name}
                            onClick={() => update('service', form.service === s.name ? '' : s.name)}
                          />
                        ))}
                      </div>
                    </Group>
                    <Group legend="Garment type" error={errors.garments}>
                      <div className="flex flex-wrap gap-2">
                        {GARMENTS.map((g, i) => (
                          <Chip
                            key={g}
                            id={i === 0 ? 'quote-garments' : undefined}
                            active={form.garments.includes(g)}
                            onClick={() => toggle('garments', g)}
                          >
                            {g}
                          </Chip>
                        ))}
                      </div>
                    </Group>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="quote-quantity"
                        label="Quantity"
                        error={errors.quantity}
                        hint="Mixed sizes count toward the total."
                      >
                        <div className="relative">
                          <TextInput
                            id="quote-quantity"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            placeholder="72"
                            value={form.quantity}
                            error={errors.quantity}
                            onChange={(e) => update('quantity', e.target.value)}
                            className="pr-20 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-bone-faint">
                            pieces
                          </span>
                        </div>
                      </Field>
                      <Field
                        id="quote-deadline"
                        label="Needed by"
                        optional
                        hint="Standard turnaround is 7 to 10 business days."
                      >
                        <TextInput
                          id="quote-deadline"
                          type="date"
                          min={localToday()}
                          value={form.deadline}
                          onChange={(e) => update('deadline', e.target.value)}
                          className="[color-scheme:dark]"
                        />
                      </Field>
                    </div>
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <StepHeading
                      title="Artwork and print details"
                      body="Send what you have. A rough sketch or a photo is fine."
                    />
                    <Group legend="Print locations" optional>
                      <div className="flex flex-wrap gap-2">
                        {LOCATIONS.map((l) => (
                          <Chip key={l} active={form.locations.includes(l)} onClick={() => toggle('locations', l)}>
                            {l}
                          </Chip>
                        ))}
                      </div>
                    </Group>
                    <Group legend="Artwork files" optional hint="No files yet? You can email them after you submit.">
                      <Dropzone files={files} setFiles={setFiles} />
                    </Group>
                    <Field id="quote-details" label="Project details" error={errors.details}>
                      <textarea
                        id="quote-details"
                        rows={5}
                        value={form.details}
                        onChange={(e) => update('details', e.target.value)}
                        aria-invalid={errors.details ? true : undefined}
                        aria-describedby={errors.details ? 'quote-details-error' : undefined}
                        placeholder="Garment colours, size breakdown, ink colours and anything else we should know. For example: 60 black hoodies, 20 each in M, L and XL, white logo on the left chest."
                        className={`${control} ${tone(errors.details)} min-h-[140px] resize-y px-4 py-3 leading-relaxed`}
                      />
                    </Field>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <StepHeading
                      title="How can we reach you?"
                      body="We send your quote by email within one business day."
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="quote-firstName" label="First name" error={errors.firstName}>
                        <TextInput
                          id="quote-firstName"
                          autoComplete="given-name"
                          value={form.firstName}
                          error={errors.firstName}
                          onChange={(e) => update('firstName', e.target.value)}
                        />
                      </Field>
                      <Field id="quote-lastName" label="Last name" error={errors.lastName}>
                        <TextInput
                          id="quote-lastName"
                          autoComplete="family-name"
                          value={form.lastName}
                          error={errors.lastName}
                          onChange={(e) => update('lastName', e.target.value)}
                        />
                      </Field>
                      <Field id="quote-email" label="Email" error={errors.email}>
                        <TextInput
                          id="quote-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          value={form.email}
                          error={errors.email}
                          onChange={(e) => update('email', e.target.value)}
                        />
                      </Field>
                      <Field
                        id="quote-phone"
                        label="Phone"
                        optional={form.contactBy !== 'Phone'}
                        error={errors.phone}
                      >
                        <TextInput
                          id="quote-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="(905) 555-0000"
                          value={form.phone}
                          error={errors.phone}
                          onChange={(e) => update('phone', e.target.value)}
                        />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field id="quote-company" label="Company, school or team" optional>
                          <TextInput
                            id="quote-company"
                            autoComplete="organization"
                            value={form.company}
                            onChange={(e) => update('company', e.target.value)}
                          />
                        </Field>
                      </div>
                    </div>

                    <Group legend="Preferred contact">
                      <div
                        role="radiogroup"
                        aria-label="Preferred contact"
                        className="grid max-w-xs grid-cols-2 rounded-lg border border-ink-600 bg-ink-950 p-1"
                      >
                        {[
                          { value: 'Email', icon: Mail },
                          { value: 'Phone', icon: Phone },
                        ].map(({ value, icon: Icon }) => {
                          const active = form.contactBy === value
                          return (
                            <button
                              key={value}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => update('contactBy', value)}
                              className={`flex h-10 items-center justify-center gap-2 rounded-md text-[14px] font-semibold transition-colors duration-150 ${
                                active ? 'bg-bone text-ink-900' : 'text-bone-muted hover:text-bone'
                              }`}
                            >
                              <Icon size={15} />
                              {value}
                            </button>
                          )
                        })}
                      </div>
                    </Group>

                    <div>
                      <p className="mb-3 text-[14px] font-medium text-bone">Review your request</p>
                      <Summary form={form} files={files} onEdit={goTo} />
                    </div>
                  </>
                ) : null}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-ink-700 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                {step > 0 ? (
                  <Button variant="ghost" size="lg" onClick={() => goTo(step - 1)}>
                    <ArrowLeft size={17} />
                    Back
                  </Button>
                ) : (
                  <p className="flex items-center justify-center gap-2 text-[13px] text-bone-faint sm:justify-start">
                    <ShieldCheck size={16} className="shrink-0" />
                    Used only to prepare your quote
                  </p>
                )}
                <Button type="submit" size="lg" className="sm:min-w-[190px]">
                  {step < STEPS.length - 1 ? (
                    <>
                      Continue
                      <ArrowRight size={17} />
                    </>
                  ) : (
                    'Submit request'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
