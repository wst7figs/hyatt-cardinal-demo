import { useId } from 'react'

/*
 * Garment illustrations used in place of product photography.
 *
 * Each shape is drawn as a product shot: a lit body with directional shading,
 * fabric folds, ribbing, stitch lines and a contact shadow. Gradients are used
 * only inside these illustrations, never in the surrounding interface.
 */

function parse(hex) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

const toHex = (rgb) =>
  '#' + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')

const mix = (hex, target, t) => toHex(parse(hex).map((v, i) => v + (target[i] - v) * t))
const lighten = (hex, t) => mix(hex, [255, 255, 255], t)
const darken = (hex, t) => mix(hex, [14, 12, 12], t)

export function luminance(hex) {
  const [r, g, b] = parse(hex).map((v) => v / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function Fold({ d, color, width = 2.2, opacity = 0.16 }) {
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" opacity={opacity} />
  )
}

function Stitch({ d, color }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeDasharray="3.5 3.5"
      strokeLinecap="round"
      opacity="0.45"
    />
  )
}

/* Evenly spaced vertical lines, used for knit ribbing on cuffs and hems */
function Ribbing({ x, y, width, height, step = 7, color, opacity = 0.28 }) {
  const lines = []
  for (let i = x + step; i < x + width; i += step) {
    lines.push(<line key={i} x1={i} y1={y + 1.5} x2={i} y2={y + height - 1.5} />)
  }
  return (
    <g stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity={opacity}>
      {lines}
    </g>
  )
}

export default function Garment({ type = 'tee', color = '#e8e4dc', print = null, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const lum = luminance(color)
  const pale = lum > 0.72

  const hi = lighten(color, pale ? 0.5 : 0.17)
  const lo = darken(color, pale ? 0.12 : 0.22)
  const deep = darken(color, pale ? 0.3 : 0.44)
  const line = darken(color, pale ? 0.26 : 0.4)
  const rib = darken(color, pale ? 0.16 : 0.3)
  const ink = lum > 0.55 ? '#1e1c1c' : '#f2d03f'

  const body = `url(#body${uid})`
  const sheen = `url(#sheen${uid})`
  /* Keeps a dark garment from dissolving into the backdrop */
  const edge = pale ? darken(color, 0.16) : lighten(color, 0.16)

  /* Long-sleeve fleece body, shared by the crew, hoodie, zip hoodie and jacket */
  const FLEECE =
    'M98 48 L78 56 C60 62 48 72 42 86 L30 166 L66 166 L75 108 C72 138 71 166 72 190 L168 190 C169 166 168 138 165 108 L174 166 L210 166 L198 86 C192 72 180 62 162 56 L142 48 C140 66 131 74 120 74 C109 74 100 66 98 48 Z'

  const Fleece = () => (
    <>
      <path d={FLEECE} fill={body} stroke={edge} strokeWidth="1.2" strokeOpacity="0.5" />
      <path d={FLEECE} fill={sheen} />
    </>
  )

  const FleeceTrim = () => (
    <>
      <rect x="29" y="152" width="38" height="16" rx="3" fill={rib} />
      <rect x="173" y="152" width="38" height="16" rx="3" fill={rib} />
      <Ribbing x={29} y={152} width={38} height={16} step={6} color={deep} />
      <Ribbing x={173} y={152} width={38} height={16} step={6} color={deep} />
      <rect x="72" y="190" width="96" height="18" rx="3" fill={rib} />
      <Ribbing x={72} y={190} width={96} height={18} color={deep} />
      <Fold d="M86 116 C92 140 88 162 92 186" color={line} />
      <Fold d="M154 116 C148 140 152 162 148 186" color={line} />
      <Fold d="M48 100 C42 124 38 142 34 160" color={line} opacity={0.12} />
      <Fold d="M192 100 C198 124 202 142 206 160" color={line} opacity={0.12} />
    </>
  )

  const defs = (
    <defs>
      <linearGradient id={`body${uid}`} x1="0.15" y1="0" x2="0.9" y2="1">
        <stop offset="0" stopColor={hi} />
        <stop offset="0.42" stopColor={color} />
        <stop offset="1" stopColor={lo} />
      </linearGradient>
      <radialGradient id={`sheen${uid}`} cx="0.4" cy="0.28" r="0.72">
        <stop offset="0" stopColor={lighten(color, pale ? 0.75 : 0.42)} stopOpacity={pale ? 0.5 : 0.36} />
        <stop offset="1" stopColor={lighten(color, 0.4)} stopOpacity="0" />
      </radialGradient>
      <filter id={`blur${uid}`} x="-30%" y="-60%" width="160%" height="260%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
  )

  const shapes = {
    tee: (
      <>
        <ellipse cx="120" cy="210" rx="72" ry="8" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        <ellipse cx="120" cy="56" rx="23" ry="10" fill={deep} />
        <path
          d="M100 50 L84 56 C70 62 58 70 50 78 L42 108 C41 112 43 115 47 116 L70 121 C74 122 77 119 77 115 L78 102 C75 133 74 166 75 197 C75 200 77 202 80 202 L160 202 C163 202 165 200 165 197 C166 166 165 133 162 102 L163 115 C163 119 166 122 170 121 L193 116 C197 115 199 112 198 108 L190 78 C182 70 170 62 156 56 L140 50 C138 67 130 75 120 75 C110 75 102 67 100 50 Z"
          fill={body} stroke={edge} strokeWidth="1.2" strokeOpacity="0.5"
        />
        <path
          d="M100 50 L84 56 C70 62 58 70 50 78 L42 108 C41 112 43 115 47 116 L70 121 C74 122 77 119 77 115 L78 102 C75 133 74 166 75 197 C75 200 77 202 80 202 L160 202 C163 202 165 200 165 197 C166 166 165 133 162 102 L163 115 C163 119 166 122 170 121 L193 116 C197 115 199 112 198 108 L190 78 C182 70 170 62 156 56 L140 50 C138 67 130 75 120 75 C110 75 102 67 100 50 Z"
          fill={sheen}
        />
        <path
          d="M101 52 C103 68 110 76 120 76 C130 76 137 68 139 52"
          fill="none"
          stroke={rib}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <Fold d="M86 110 C92 132 88 156 92 182" color={line} />
        <Fold d="M154 110 C148 132 152 156 148 182" color={line} />
        <Fold d="M120 92 C118 122 122 152 120 186" color={line} opacity={0.09} />
        <Fold d="M80 103 C88 108 94 115 96 124" color={line} opacity={0.2} width={1.8} />
        <Fold d="M160 103 C152 108 146 115 144 124" color={line} opacity={0.2} width={1.8} />
        <Stitch d="M48 111 L72 117" color={line} />
        <Stitch d="M192 111 L168 117" color={line} />
        <Stitch d="M80 194 L160 194" color={line} />
      </>
    ),

    longsleeve: (
      <>
        <ellipse cx="120" cy="210" rx="70" ry="8" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        <ellipse cx="120" cy="56" rx="23" ry="10" fill={deep} />
        <path
          d="M100 50 L84 56 C68 62 56 70 48 80 L24 168 C23 172 25 175 29 176 L52 183 C56 184 59 182 60 178 L78 108 C75 138 74 168 75 197 C75 200 77 202 80 202 L160 202 C163 202 165 200 165 197 C166 168 165 138 162 108 L180 178 C181 182 184 184 188 183 L211 176 C215 175 217 172 216 168 L192 80 C184 70 172 62 156 56 L140 50 C138 67 130 75 120 75 C110 75 102 67 100 50 Z"
          fill={body} stroke={edge} strokeWidth="1.2" strokeOpacity="0.5"
        />
        <path
          d="M100 50 L84 56 C68 62 56 70 48 80 L24 168 C23 172 25 175 29 176 L52 183 C56 184 59 182 60 178 L78 108 C75 138 74 168 75 197 C75 200 77 202 80 202 L160 202 C163 202 165 200 165 197 C166 168 165 138 162 108 L180 178 C181 182 184 184 188 183 L211 176 C215 175 217 172 216 168 L192 80 C184 70 172 62 156 56 L140 50 C138 67 130 75 120 75 C110 75 102 67 100 50 Z"
          fill={sheen}
        />
        <path
          d="M101 52 C103 68 110 76 120 76 C130 76 137 68 139 52"
          fill="none"
          stroke={rib}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path d="M26 170 L57 179 L53 192 L22 183 Z" fill={rib} />
        <path d="M214 170 L183 179 L187 192 L218 183 Z" fill={rib} />
        <Ribbing x={24} y={172} width={32} height={18} step={6} color={deep} />
        <Ribbing x={184} y={172} width={32} height={18} step={6} color={deep} />
        <Fold d="M86 112 C92 134 88 158 92 184" color={line} />
        <Fold d="M154 112 C148 134 152 158 148 184" color={line} />
        <Fold d="M62 106 C54 130 44 150 36 168" color={line} opacity={0.14} />
        <Fold d="M178 106 C186 130 196 150 204 168" color={line} opacity={0.14} />
        <Stitch d="M80 194 L160 194" color={line} />
      </>
    ),

    polo: (
      <>
        <ellipse cx="120" cy="210" rx="72" ry="8" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        <path
          d="M100 50 L84 56 C70 62 58 70 50 78 L42 108 C41 112 43 115 47 116 L70 121 C74 122 77 119 77 115 L78 102 C75 133 74 166 75 197 C75 200 77 202 80 202 L160 202 C163 202 165 200 165 197 C166 166 165 133 162 102 L163 115 C163 119 166 122 170 121 L193 116 C197 115 199 112 198 108 L190 78 C182 70 170 62 156 56 L140 50 C138 67 130 75 120 75 C110 75 102 67 100 50 Z"
          fill={body} stroke={edge} strokeWidth="1.2" strokeOpacity="0.5"
        />
        <path
          d="M100 50 L84 56 C70 62 58 70 50 78 L42 108 C41 112 43 115 47 116 L70 121 C74 122 77 119 77 115 L78 102 C75 133 74 166 75 197 C75 200 77 202 80 202 L160 202 C163 202 165 200 165 197 C166 166 165 133 162 102 L163 115 C163 119 166 122 170 121 L193 116 C197 115 199 112 198 108 L190 78 C182 70 170 62 156 56 L140 50 C138 67 130 75 120 75 C110 75 102 67 100 50 Z"
          fill={sheen}
        />
        {/* Placket with buttons, then a flat two-point collar over the top */}
        <path d="M110 66 L130 66 L128 112 L112 112 Z" fill={lo} />
        <line x1="120" y1="70" x2="120" y2="110" stroke={deep} strokeWidth="1.4" opacity="0.6" />
        <circle cx="120" cy="82" r="2.8" fill={hi} stroke={deep} strokeWidth="0.8" />
        <circle cx="120" cy="100" r="2.8" fill={hi} stroke={deep} strokeWidth="0.8" />
        <path d="M100 50 L120 76 L140 50 L154 57 L120 92 L86 57 Z" fill={rib} />
        <path d="M100 50 L120 76 L140 50" fill="none" stroke={deep} strokeWidth="1.4" opacity="0.55" />
        <Fold d="M86 112 C92 134 88 158 92 182" color={line} />
        <Fold d="M154 112 C148 134 152 158 148 182" color={line} />
        <Stitch d="M48 111 L72 117" color={line} />
        <Stitch d="M192 111 L168 117" color={line} />
        <Stitch d="M80 194 L160 194" color={line} />
      </>
    ),

    crew: (
      <>
        <ellipse cx="120" cy="212" rx="74" ry="9" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        <ellipse cx="120" cy="54" rx="25" ry="11" fill={deep} />
        <Fleece />
        <path
          d="M99 50 C101 66 109 74 120 74 C131 74 139 66 141 50"
          fill="none"
          stroke={rib}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <FleeceTrim />
        <Fold d="M120 92 C118 120 122 150 120 180" color={line} opacity={0.09} />
      </>
    ),

    hoodie: (
      <>
        <ellipse cx="120" cy="212" rx="76" ry="9" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        {/* Hood sits behind the shoulders, with its lining showing at the neck */}
        <path
          d="M82 62 C82 26 158 26 158 62 C158 82 142 94 120 94 C98 94 82 82 82 62 Z"
          fill={lo}
          stroke={edge}
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        <path d="M94 60 C94 34 146 34 146 60 C146 76 135 86 120 86 C105 86 94 76 94 60 Z" fill={deep} />
        <Fleece />
        {/* Kangaroo pocket */}
        <path d="M88 146 L152 146 L156 178 L84 178 Z" fill={lo} opacity="0.5" />
        <Stitch d="M88 150 L152 150" color={line} />
        <Stitch d="M86 174 L154 174" color={line} />
        {/* Drawstrings */}
        <path d="M108 80 C107 96 106 108 106 120" fill="none" stroke={hi} strokeWidth="3" strokeLinecap="round" />
        <path d="M132 80 C133 96 134 108 134 120" fill="none" stroke={hi} strokeWidth="3" strokeLinecap="round" />
        <rect x="103.5" y="119" width="5" height="9" rx="1.5" fill={deep} />
        <rect x="131.5" y="119" width="5" height="9" rx="1.5" fill={deep} />
        <FleeceTrim />
      </>
    ),

    zip: (
      <>
        <ellipse cx="120" cy="212" rx="76" ry="9" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        <path
          d="M82 62 C82 26 158 26 158 62 C158 82 142 94 120 94 C98 94 82 82 82 62 Z"
          fill={lo}
          stroke={edge}
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        <path d="M94 60 C94 34 146 34 146 60 C146 76 135 86 120 86 C105 86 94 76 94 60 Z" fill={deep} />
        <Fleece />
        {/* Centre zip with teeth and a pull */}
        <line x1="120" y1="80" x2="120" y2="192" stroke={deep} strokeWidth="5" />
        <line
          x1="120"
          y1="80"
          x2="120"
          y2="192"
          stroke={hi}
          strokeWidth="2.4"
          strokeDasharray="2 3"
          opacity="0.75"
        />
        <rect x="116.5" y="130" width="7" height="13" rx="2" fill={hi} stroke={deep} strokeWidth="0.8" />
        {/* Split hand pockets */}
        <Stitch d="M92 150 L108 156 L104 176" color={line} />
        <Stitch d="M148 150 L132 156 L136 176" color={line} />
        <FleeceTrim />
      </>
    ),

    jacket: (
      <>
        <ellipse cx="120" cy="212" rx="74" ry="9" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        <Fleece />
        {/* Snap placket and lined collar */}
        <line x1="120" y1="72" x2="120" y2="190" stroke={deep} strokeWidth="1.6" opacity="0.7" />
        <path d="M95 46 C105 39 135 39 145 46 L149 64 C138 57 102 57 91 64 Z" fill={lo} />
        <path d="M95 52 C105 46 135 46 145 52" fill="none" stroke={deep} strokeWidth="1.4" opacity="0.55" />
        {[86, 112, 138, 164].map((y) => (
          <circle key={y} cx="120" cy={y} r="3.4" fill={hi} stroke={deep} strokeWidth="0.9" />
        ))}
        <Stitch d="M86 156 L106 156" color={line} />
        <Stitch d="M154 156 L134 156" color={line} />
        <FleeceTrim />
      </>
    ),

    cap: (
      <>
        <ellipse cx="128" cy="168" rx="72" ry="8" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        {/* Curved brim, drawn first so the crown overlaps it */}
        <path
          d="M150 128 C186 120 214 128 218 142 C221 153 196 162 158 158 C142 156 140 140 150 128 Z"
          fill={lo}
        />
        <path
          d="M150 130 C184 123 210 130 214 142"
          fill="none"
          stroke={deep}
          strokeWidth="1.4"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <path d="M46 140 C46 86 76 56 112 56 C150 56 166 90 166 140 Z" fill={body} stroke={edge} strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M46 140 C46 86 76 56 112 56 C150 56 166 90 166 140 Z" fill={sheen} />
        {/* Panel seams */}
        <path d="M112 56 C104 84 100 112 100 140" fill="none" stroke={line} strokeWidth="1.6" opacity="0.4" />
        <path d="M136 62 C146 88 150 114 150 140" fill="none" stroke={line} strokeWidth="1.6" opacity="0.4" />
        <path d="M78 66 C68 92 64 116 64 140" fill="none" stroke={line} strokeWidth="1.6" opacity="0.28" />
        {/* Sweatband edge and eyelets */}
        <path d="M46 138 L166 138 L166 144 C166 146 164 148 162 148 L50 148 C48 148 46 146 46 144 Z" fill={rib} />
        <circle cx="92" cy="104" r="2.4" fill={deep} opacity="0.55" />
        <circle cx="132" cy="104" r="2.4" fill={deep} opacity="0.55" />
        <circle cx="112" cy="58" r="5" fill={rib} stroke={deep} strokeWidth="0.8" />
      </>
    ),

    beanie: (
      <>
        <ellipse cx="120" cy="184" rx="62" ry="8" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        <path d="M62 132 C62 78 88 52 120 52 C152 52 178 78 178 132 Z" fill={body} stroke={edge} strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M62 132 C62 78 88 52 120 52 C152 52 178 78 178 132 Z" fill={sheen} />
        {/* Knit direction lines on the crown */}
        <g stroke={line} strokeWidth="1.4" fill="none" opacity="0.26">
          <path d="M92 58 C84 84 80 108 80 130" />
          <path d="M120 52 C118 82 118 106 118 130" />
          <path d="M148 58 C156 84 160 108 160 130" />
        </g>
        <rect x="56" y="128" width="128" height="42" rx="7" fill={rib} />
        <Ribbing x={56} y={128} width={128} height={42} step={9} color={deep} opacity={0.34} />
        <path d="M56 132 L184 132" stroke={deep} strokeWidth="1.4" opacity="0.4" />
      </>
    ),

    tote: (
      <>
        <ellipse cx="120" cy="212" rx="70" ry="8" fill="rgba(0,0,0,0.22)" filter={`url(#blur${uid})`} />
        {/* Handles pass behind the bag body */}
        <path
          d="M80 84 C80 46 100 34 110 34"
          fill="none"
          stroke={lo}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M160 84 C160 46 140 34 130 34"
          fill="none"
          stroke={lo}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path d="M110 34 L130 34" stroke={lo} strokeWidth="8" strokeLinecap="round" />
        <path
          d="M56 78 L184 78 L192 202 C192 206 189 208 186 208 L54 208 C51 208 48 206 48 202 Z"
          fill={body} stroke={edge} strokeWidth="1.2" strokeOpacity="0.5"
        />
        <path
          d="M56 78 L184 78 L192 202 C192 206 189 208 186 208 L54 208 C51 208 48 206 48 202 Z"
          fill={sheen}
        />
        <Stitch d="M56 88 L184 88" color={line} />
        <Stitch d="M52 198 L188 198" color={line} />
        {/* Handle anchor stitching */}
        <rect x="74" y="80" width="12" height="16" rx="2" fill={lo} opacity="0.7" />
        <rect x="154" y="80" width="12" height="16" rx="2" fill={lo} opacity="0.7" />
        <Fold d="M72 96 C70 130 72 164 70 194" color={line} opacity={0.12} />
        <Fold d="M168 96 C170 130 168 164 170 194" color={line} opacity={0.12} />
      </>
    ),
  }

  const printAt = {
    cap: { x: 112, y: 112, size: 22 },
    beanie: { x: 120, y: 158, size: 20 },
    tote: { x: 120, y: 150, size: 30 },
    hoodie: { x: 120, y: 124, size: 28 },
    zip: { x: 148, y: 120, size: 20 },
    jacket: { x: 150, y: 120, size: 22 },
  }
  const p = printAt[type] || { x: 120, y: 140, size: 30 }

  return (
    <svg viewBox="0 0 240 240" className={className} role="img" aria-label={`${type} illustration`}>
      {defs}
      {shapes[type] || shapes.tee}
      {print ? (
        <text
          x={p.x}
          y={p.y}
          textAnchor="middle"
          fontFamily="Inter, Arial, sans-serif"
          fontWeight="800"
          fontSize={p.size}
          letterSpacing="1"
          fill={ink}
          opacity="0.93"
        >
          {print}
        </text>
      ) : null}
    </svg>
  )
}
