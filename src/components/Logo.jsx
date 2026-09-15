import { useEffect, useState } from 'react'

/*
 * The supplied logo is a JPG: white artwork sitting on a solid black plate.
 * Dropped straight onto the page it reads as a black rectangle, and a CSS
 * screen blend breaks as soon as any ancestor creates a stacking context
 * (an animation, a transform, an opacity).
 *
 * So we key the black out once, on a canvas, and hand back a real PNG with an
 * alpha channel. Alpha comes from the brightest channel, which keeps the red
 * detail in the mascots instead of flattening everything to white. FLOOR
 * discards the JPEG noise floor in the black areas so no grey haze survives.
 *
 * Raw JPEG compression leaves faint ringing around every hard white/black
 * edge, worst near the fine text strokes. Keying straight off the per-pixel
 * max and rescaling to full brightness (k = 255 / m) blows that ringing up
 * into visible static once the logo is shown larger than a few dozen px. To
 * stop that, alpha is gated off a blurred copy of the max channel: an
 * isolated noise pixel has near-zero neighbours so its blurred value stays
 * under FLOOR and gets keyed out, while real strokes are many pixels wide
 * and survive the blur.
 */

const FLOOR = 34
let cached = null

function blurChannel(values, width, height) {
  const out = new Float32Array(values.length)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0
      let count = 0
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy
        if (ny < 0 || ny >= height) continue
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx
          if (nx < 0 || nx >= width) continue
          sum += values[ny * width + nx]
          count++
        }
      }
      out[y * width + x] = sum / count
    }
  }
  return out
}

function keyOutBlack() {
  if (cached) return cached

  cached = new Promise((resolve) => {
    const img = new Image()

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const w = img.naturalWidth
        const h = img.naturalHeight
        canvas.width = w
        canvas.height = h

        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0)

        const frame = ctx.getImageData(0, 0, w, h)
        const px = frame.data

        const maxChannel = new Float32Array(w * h)
        for (let i = 0, p = 0; i < px.length; i += 4, p++) {
          maxChannel[p] = Math.max(px[i], px[i + 1], px[i + 2])
        }
        const maxBlurred = blurChannel(maxChannel, w, h)

        for (let i = 0, p = 0; i < px.length; i += 4, p++) {
          const gate = maxBlurred[p]

          if (gate <= FLOOR) {
            px[i + 3] = 0
            continue
          }

          const m = Math.max(px[i], px[i + 1], px[i + 2])
          const k = 255 / Math.max(m, gate)
          px[i] = Math.min(255, px[i] * k)
          px[i + 1] = Math.min(255, px[i + 1] * k)
          px[i + 2] = Math.min(255, px[i + 2] * k)
          px[i + 3] = Math.min(255, ((gate - FLOOR) / (255 - FLOOR)) * 255)
        }

        ctx.putImageData(frame, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      } catch {
        resolve('/logo.jpg')
      }
    }

    img.onerror = () => resolve('/logo.jpg')
    img.src = '/logo.jpg'
  })

  return cached
}

export default function Logo({ className = 'h-12', alt = 'Hyatt Cardinal Print & Press' }) {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    let live = true
    keyOutBlack().then((url) => live && setSrc(url))
    return () => {
      live = false
    }
  }, [])

  return (
    <img
      src={src || '/logo.jpg'}
      alt={alt}
      className={`${className} w-auto transition-opacity duration-300 ease-out ${
        src ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
