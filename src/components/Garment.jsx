/*
 * Flat vector garments used in place of product photography.
 * Every shape draws in whatever colour it is handed, so the same component
 * covers the catalogue, the category tiles and the work gallery.
 */

export function luminance(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export default function Garment({
  type = 'tee',
  color = '#e8e4dc',
  print = null,
  className = '',
}) {
  const light = luminance(color) > 0.5
  const seam = light ? 'rgba(0,0,0,0.20)' : 'rgba(255,255,255,0.18)'
  const edge = light ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.13)'
  const shade = light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.09)'
  const printInk = light ? '#1e1c1c' : '#f2d03f'

  const common = {
    fill: color,
    stroke: edge,
    strokeWidth: 2,
    strokeLinejoin: 'round',
  }
  const line = {
    fill: 'none',
    stroke: seam,
    strokeWidth: 2,
    strokeLinecap: 'round',
  }

  const shapes = {
    tee: (
      <>
        <path
          d="M62 36 L42 44 L26 76 L48 88 L58 70 L58 168 L142 168 L142 70 L152 88 L174 76 L158 44 L138 36 C132 51 118 58 100 58 C82 58 68 51 62 36 Z"
          {...common}
        />
        <path d="M64 38 C70 52 83 60 100 60 C117 60 130 52 136 38" {...line} />
        <path d="M58 158 L142 158" {...line} />
      </>
    ),
    longsleeve: (
      <>
        <path
          d="M62 36 L40 44 L16 122 L42 134 L60 82 L58 168 L142 168 L140 82 L158 134 L184 122 L160 44 L138 36 C132 51 118 58 100 58 C82 58 68 51 62 36 Z"
          {...common}
        />
        <path d="M64 38 C70 52 83 60 100 60 C117 60 130 52 136 38" {...line} />
        <path d="M20 120 L44 128" {...line} />
        <path d="M180 120 L156 128" {...line} />
      </>
    ),
    polo: (
      <>
        <path
          d="M62 36 L42 44 L26 76 L48 88 L58 70 L58 168 L142 168 L142 70 L152 88 L174 76 L158 44 L138 36 C132 51 118 58 100 58 C82 58 68 51 62 36 Z"
          {...common}
        />
        <path d="M78 34 L100 58 L122 34 L138 40 L122 52 L100 74 L78 52 L62 40 Z" fill={seam} opacity="0.5" />
        <path d="M92 60 L92 104 M108 60 L108 104" {...line} />
        <circle cx="100" cy="74" r="2.6" fill={seam} />
        <circle cx="100" cy="92" r="2.6" fill={seam} />
      </>
    ),
    crew: (
      <>
        <path
          d="M60 38 L38 48 L20 84 L46 96 L56 76 L56 156 L144 156 L144 76 L154 96 L180 84 L162 48 L140 38 C133 53 118 60 100 60 C82 60 67 53 60 38 Z"
          {...common}
        />
        <path d="M56 156 L56 170 L144 170 L144 156" fill={seam} opacity="0.45" />
        <path d="M62 40 C69 54 83 62 100 62 C117 62 131 54 138 40" {...line} />
        <path d="M46 96 L44 106 M154 96 L156 106" {...line} />
      </>
    ),
    hoodie: (
      <>
        {/* Hood sits behind and rises above the shoulder line */}
        <path d="M60 50 C60 14 140 14 140 50 C140 68 124 80 100 80 C76 80 60 68 60 50 Z" fill={color} stroke={edge} strokeWidth="2" strokeLinejoin="round" />
        <path d="M72 48 C72 26 128 26 128 48 C128 63 116 71 100 71 C84 71 72 63 72 48 Z" fill={shade} stroke="none" />
        <path
          d="M62 50 L38 60 L20 96 L46 108 L56 88 L56 162 L144 162 L144 88 L154 108 L180 96 L162 60 L138 50 C132 72 116 82 100 82 C84 82 68 72 62 50 Z"
          {...common}
        />
        <path d="M64 52 C70 74 84 84 100 84 C116 84 130 74 136 52" {...line} />
        <path d="M74 118 L126 118 L132 146 L68 146 Z" fill="none" stroke={seam} strokeWidth="2" strokeLinejoin="round" />
        <path d="M90 84 L88 108 M110 84 L112 108" {...line} />
        <circle cx="88" cy="110" r="2.6" fill={seam} />
        <circle cx="112" cy="110" r="2.6" fill={seam} />
        <path d="M56 162 L56 174 L144 174 L144 162" fill={seam} opacity="0.45" />
      </>
    ),
    zip: (
      <>
        <path d="M60 50 C60 14 140 14 140 50 C140 68 124 80 100 80 C76 80 60 68 60 50 Z" fill={color} stroke={edge} strokeWidth="2" strokeLinejoin="round" />
        <path d="M72 48 C72 26 128 26 128 48 C128 63 116 71 100 71 C84 71 72 63 72 48 Z" fill={shade} stroke="none" />
        <path
          d="M62 50 L38 60 L20 96 L46 108 L56 88 L56 162 L144 162 L144 88 L154 108 L180 96 L162 60 L138 50 C132 72 116 82 100 82 C84 82 68 72 62 50 Z"
          {...common}
        />
        <path d="M100 80 L100 162" stroke={seam} strokeWidth="3" fill="none" />
        <path d="M64 52 C70 74 84 84 100 84 C116 84 130 74 136 52" {...line} />
        <path d="M70 122 L88 122 M112 122 L130 122" {...line} />
        <path d="M56 162 L56 174 L144 174 L144 162" fill={seam} opacity="0.45" />
      </>
    ),
    jacket: (
      <>
        <path
          d="M64 38 L40 48 L22 86 L48 98 L58 78 L58 168 L142 168 L142 78 L152 98 L178 86 L160 48 L136 38 L100 62 Z"
          {...common}
        />
        <path d="M64 38 L100 62 L136 38" {...line} />
        <path d="M100 62 L100 168" stroke={seam} strokeWidth="2" fill="none" />
        <circle cx="100" cy="86" r="3" fill={seam} />
        <circle cx="100" cy="108" r="3" fill={seam} />
        <circle cx="100" cy="130" r="3" fill={seam} />
        <path d="M66 138 L88 138 M112 138 L134 138" {...line} />
      </>
    ),
    cap: (
      <>
        {/* Brim curves toward the viewer beneath the crown */}
        <path d="M138 114 C168 110 191 121 193 133 C194 143 171 148 147 144 C135 142 131 130 133 120 Z" fill={color} stroke={edge} strokeWidth="2" strokeLinejoin="round" />
        <path d="M138 114 C168 110 191 121 193 133 C194 143 171 148 147 144 C135 142 131 130 133 120 Z" fill={shade} stroke="none" />
        <path d="M46 128 C46 72 70 46 101 46 C133 46 152 74 152 128 Z" {...common} />
        <path d="M46 120 L152 120" {...line} />
        <path d="M101 46 C95 72 93 98 93 128" {...line} />
        <path d="M124 52 C133 76 137 100 137 128" {...line} />
        <circle cx="101" cy="49" r="4.5" fill={seam} />
      </>
    ),
    beanie: (
      <>
        <path d="M50 122 C50 64 72 42 100 42 C128 42 150 64 150 122 Z" {...common} />
        <rect x="44" y="118" width="112" height="36" rx="4" fill={color} stroke={edge} strokeWidth="2" />
        <path d="M56 122 L56 150 M72 122 L72 150 M88 122 L88 150 M104 122 L104 150 M120 122 L120 150 M136 122 L136 150" {...line} />
        <path d="M78 50 C74 76 72 100 72 118 M122 50 C126 76 128 100 128 118" {...line} />
      </>
    ),
    tote: (
      <>
        <path d="M68 78 C68 36 132 36 132 78 L120 78 C120 52 80 52 80 78 Z" fill={color} stroke={edge} strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 72 L150 72 L158 174 L42 174 Z" {...common} />
        <path d="M50 88 L150 88" {...line} />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={`${type} illustration`}
    >
      {shapes[type] || shapes.tee}
      {print ? (
        <text
          x="100"
          y={type === 'cap' || type === 'beanie' ? 96 : 116}
          textAnchor="middle"
          fontFamily="Inter, Arial, sans-serif"
          fontWeight="800"
          fontSize={type === 'cap' || type === 'beanie' ? 20 : 26}
          fill={printInk}
          letterSpacing="1"
        >
          {print}
        </text>
      ) : null}
    </svg>
  )
}
