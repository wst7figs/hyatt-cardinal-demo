import { ArrowRight, Star } from 'lucide-react'

const SIZES = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-12 px-6 text-[15px]',
}

const VARIANTS = {
  primary: 'bg-volt-500 text-ink-900 hover:bg-volt-400',
  light: 'bg-bone text-ink-900 hover:bg-bone-muted',
  outline: 'border border-ink-500 text-bone hover:border-bone-faint hover:bg-ink-800',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const typeProp = Tag === 'button' && !props.type ? { type: 'button' } : {}
  return (
    <Tag
      {...typeProp}
      {...props}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40 ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Tag>
  )
}

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>
}

export function SectionHeader({ title, description, action, className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-3 ${className}`}>
      <div className="max-w-2xl">
        <h2 className="text-[24px] text-bone sm:text-[28px]">{title}</h2>
        {description ? (
          <p className="mt-1.5 text-[15px] leading-relaxed text-bone-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

export function TextLink({ href, onClick, children, className = '' }) {
  const cls = `inline-flex items-center gap-1.5 text-[14px] font-semibold text-bone underline-offset-4 hover:underline ${className}`
  const content = (
    <>
      {children}
      <ArrowRight size={15} />
    </>
  )
  return href ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  )
}

export function Stars({ value = 5, size = 14, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i <= Math.round(value) ? 'fill-volt-500' : 'fill-ink-500'}
        />
      ))}
    </span>
  )
}

export function Field({ label, hint, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-1.5 text-[14px] font-medium text-bone">
        {label}
        {required ? <span className="text-volt-500">*</span> : null}
        {hint ? <span className="text-[13px] font-normal text-bone-faint">{hint}</span> : null}
      </span>
      {children}
    </label>
  )
}

/* No width, padding or radius, so callers can set those without class conflicts */
export const inputBase =
  'border border-ink-600 bg-ink-850 text-[14px] text-bone placeholder:text-bone-faint transition-colors duration-150 hover:border-ink-500 focus:border-volt-500 focus:outline-none'

export const inputClass = `${inputBase} w-full rounded-lg px-3.5 py-2.5`
