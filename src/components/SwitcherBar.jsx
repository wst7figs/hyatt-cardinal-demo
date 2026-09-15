import { LayoutGrid } from 'lucide-react'

export default function SwitcherBar({ view, onChange }) {
  const tab = (id, label) => (
    <button
      type="button"
      onClick={() => onChange(id)}
      aria-pressed={view === id}
      className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-150 ${
        view === id ? 'bg-bone text-ink-900' : 'text-bone-muted hover:text-bone'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-ink-600 bg-ink-950 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <button
          type="button"
          onClick={() => onChange('cover')}
          aria-label="Back to overview"
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-bone-muted transition-colors duration-150 hover:text-bone"
        >
          <LayoutGrid size={14} />
          <span className="hidden sm:inline">Overview</span>
        </button>
        <span className="h-5 w-px bg-ink-600" />
        {tab('info', 'Informational')}
        {tab('shop', 'Store')}
      </div>
    </div>
  )
}
