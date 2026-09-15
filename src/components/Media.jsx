import Garment, { luminance } from './Garment.jsx'

const SHADOW = 'drop-shadow-[0_12px_14px_rgba(0,0,0,0.16)]'

/* Very light garments disappear against the studio backdrop, so tiles lead with a darker colourway */
export function pickColor(colors) {
  return colors.find((c) => luminance(c.hex) < 0.7) || colors[0]
}

export default function Media({
  src,
  alt = '',
  garment,
  color = '#1e1c1c',
  print,
  className = '',
  pad = 'p-[13%]',
  zoom = false,
}) {
  const inner = `absolute inset-0 h-full w-full ${zoom ? 'transition-transform duration-300 ease-out group-hover:scale-[1.03]' : ''}`

  return (
    <div className={`relative overflow-hidden bg-studio ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className={`${inner} object-cover`} />
      ) : garment ? (
        <div className={`${inner} ${pad}`}>
          <Garment type={garment} color={color} print={print} className={`h-full w-full ${SHADOW}`} />
        </div>
      ) : null}
    </div>
  )
}

const DEFAULT_TRIO = [
  { type: 'hoodie', color: '#2f4f43', cls: 'left-[8%] top-[24%] w-[44%]' },
  { type: 'tee', color: '#1e1c1c', print: 'HC', cls: 'left-[32%] top-[10%] w-[46%]' },
  { type: 'cap', color: '#8f2733', cls: 'bottom-[8%] right-[7%] w-[28%]' },
]

export function GarmentTrio({ src, alt, items = DEFAULT_TRIO, className = '' }) {
  if (src) return <Media src={src} alt={alt} className={className} />
  return (
    <div className={`relative overflow-hidden bg-studio ${className}`}>
      {items.map((g, i) => (
        <Garment
          key={i}
          type={g.type}
          color={g.color}
          print={g.print}
          className={`absolute ${g.cls} ${SHADOW}`}
        />
      ))}
    </div>
  )
}
