import { type ComponentPropsWithoutRef, forwardRef, useId } from 'react'
import { cn } from '../lib/cn'

export type RopeThickness = 'sm' | 'md' | 'lg'
export type RopeVariant = 'jute' | 'twine' | 'hemp'

const thicknessMap: Record<RopeThickness, number> = {
  sm: 12,
  md: 18,
  lg: 26,
}

// Colour palettes per variant
const palettes: Record<RopeVariant, { hi: string; mid: string; lo: string; fiber: string }> = {
  jute:  { hi: '#d2b48c', mid: '#a68b6d', lo: '#5d4037', fiber: '#c8a87a' },
  twine: { hi: '#c9a96e', mid: '#8b6914', lo: '#4a3208', fiber: '#b8932a' },
  hemp:  { hi: '#b8a898', mid: '#7a6858', lo: '#3d2e20', fiber: '#a89880' },
}

/**
 * Generates a single SVG rope tile that tiles seamlessly.
 * The rope is drawn as two interlaced twisted strands using sinusoidal
 * paths with staggered phase — giving a braided/twisted look.
 */
function ropeDataUrl(thickness: number, pal: typeof palettes.jute): string {
  const w = thickness * 3   // tile width = 3 rope diameters (one twist cycle)
  const h = thickness
  const r = thickness / 2   // strand radius
  const amp = r * 0.38       // wave amplitude

  // Strand centres oscillate sinusoidally across the tile width
  // Strand A: y = r + amp * sin(2π * x / w)
  // Strand B: y = r + amp * sin(2π * x / w + π)  ← offset by half phase

  const steps = 32
  const pts = (phase: number) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const x = (i / steps) * w
      const y = r + amp * Math.sin((2 * Math.PI * x) / w + phase)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    }).join(' ')

  const strokeW = r * 1.1

  // Shadow path (thicker, darker, offset slightly)
  const shadow = (phase: number) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const x = (i / steps) * w
      const y = r + amp * Math.sin((2 * Math.PI * x) / w + phase) + 1.5
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    }).join(' ')

  const id = Math.random().toString(36).slice(2, 7)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="sg${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${pal.hi}"/>
      <stop offset="45%" stop-color="${pal.mid}"/>
      <stop offset="100%" stop-color="${pal.lo}"/>
    </linearGradient>
    <filter id="fib${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.9 0.2" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grey"/>
      <feBlend in="SourceGraphic" in2="grey" mode="soft-light" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  <!-- Shadows -->
  <path d="${shadow(0)}" fill="none" stroke="${pal.lo}" stroke-width="${strokeW * 1.35}" stroke-linecap="round" opacity="0.45"/>
  <path d="${shadow(Math.PI)}" fill="none" stroke="${pal.lo}" stroke-width="${strokeW * 1.35}" stroke-linecap="round" opacity="0.45"/>
  <!-- Back strand (renders first = goes under) -->
  <path d="${pts(Math.PI)}" fill="none" stroke="url(#sg${id})" stroke-width="${strokeW}" stroke-linecap="round" filter="url(#fib${id})"/>
  <!-- Front strand (renders second = goes over) -->
  <path d="${pts(0)}" fill="none" stroke="url(#sg${id})" stroke-width="${strokeW}" stroke-linecap="round" filter="url(#fib${id})"/>
  <!-- Highlight sheen on front strand -->
  <path d="${pts(0)}" fill="none" stroke="${pal.hi}" stroke-width="${strokeW * 0.22}" stroke-linecap="round" opacity="0.55"/>
</svg>`

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export type CraftRopeBorderProps = ComponentPropsWithoutRef<'div'> & {
  /** Rope visual variant */
  variant?: RopeVariant
  /** Border thickness */
  thickness?: RopeThickness
  /** Inner content class */
  contentClassName?: string
  /** Corner radius of the outer border */
  radius?: number
}

export const CraftRopeBorder = forwardRef<HTMLDivElement, CraftRopeBorderProps>(
  function CraftRopeBorder(
    {
      className,
      contentClassName,
      variant = 'jute',
      thickness = 'md',
      radius = 16,
      children,
      style,
      ...props
    },
    ref,
  ) {
    const t = thicknessMap[thickness]
    const pal = palettes[variant]
    const ropeUrl = ropeDataUrl(t, pal)
    const innerRadius = Math.max(4, radius - t)

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={{
          padding: t,
          borderRadius: radius,
          backgroundImage: ropeUrl,
          backgroundRepeat: 'repeat',
          backgroundSize: `${t * 3}px ${t}px`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 3px 12px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.15)`,
          ...style,
        }}
        {...props}
      >
        <div
          className={cn('craft-paper-surface relative', contentClassName)}
          style={{ borderRadius: innerRadius }}
        >
          {children}
        </div>
      </div>
    )
  },
)
