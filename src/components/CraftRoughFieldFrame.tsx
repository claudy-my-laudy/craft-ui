import rough from 'roughjs'
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  useLayoutEffect,
  useRef,
} from 'react'

import { cn } from '../lib/cn'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

function roundedRectPath(x: number, y: number, w: number, h: number, r: number): string {
  const rad = Math.min(r, w / 2, h / 2)
  const x0 = x + rad
  const x1 = x + w - rad
  const y0 = y + rad
  const y1 = y + h - rad
  return [
    `M ${x0} ${y}`,
    `L ${x1} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y0}`,
    `L ${x + w} ${y1}`,
    `Q ${x + w} ${y + h} ${x1} ${y + h}`,
    `L ${x0} ${y + h}`,
    `Q ${x} ${y + h} ${x} ${y1}`,
    `L ${x} ${y0}`,
    `Q ${x} ${y} ${x0} ${y}`,
    'Z',
  ].join(' ')
}

export type CraftRoughFieldFrameProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  children: ReactNode
  /** Padding between sketch and control — keeps multi-stroke visible (default ~10px). */
  gutter?: number
  /** Corner radius in px (matches paper fields at ~12). */
  radius?: number
  /** Rough.js wobble (0 = smooth). */
  roughness?: number
  /** SVG stroke color. */
  stroke?: string
  /** Optional fill — e.g. pastel behind the control (Rough `fillStyle: solid`). */
  fill?: string
  /** Stable seed so the sketch doesn’t shuffle each paint. */
  seed?: number
}

/**
 * Sketchy hand-drawn frame around a text field (Rough.js).
 * Decorative only (`aria-hidden`); keep focus styles on the real `<input>` / `<textarea>`.
 * Falls back to a simple dashed border when `prefers-reduced-motion: reduce`.
 */
export const CraftRoughFieldFrame = forwardRef<HTMLDivElement, CraftRoughFieldFrameProps>(
  function CraftRoughFieldFrame(
    {
      className,
      children,
      gutter = 10,
      radius = 12,
      roughness = 1.15,
      stroke = '#1c1914',
      fill,
      seed = 7,
      ...props
    },
    ref,
  ) {
    const reduceMotion = usePrefersReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)

    useLayoutEffect(() => {
      if (reduceMotion) return
      const el = containerRef.current
      const svg = svgRef.current
      if (!el || !svg) return

      const paint = () => {
        const { width, height } = el.getBoundingClientRect()
        if (width < 8 || height < 8) return

        // Path sits just inside the outer box; children use `gutter` padding so strokes
        // aren’t covered by the opaque input (was the “nothing changed” bug with p-[2px]).
        const inset = 3
        const rw = width - inset * 2
        const rh = height - inset * 2
        if (rw < 4 || rh < 4) return

        svg.setAttribute('width', String(width))
        svg.setAttribute('height', String(height))
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
        svg.replaceChildren()

        const rc = rough.svg(svg)
        const d = roundedRectPath(inset, inset, rw, rh, radius)
        rc.path(d, {
          stroke,
          strokeWidth: 1.85,
          roughness,
          seed,
          fill: fill ?? undefined,
          fillStyle: fill ? 'solid' : undefined,
        })
      }

      paint()
      const id = requestAnimationFrame(() => paint())
      const ro = new ResizeObserver(() => paint())
      ro.observe(el)
      return () => {
        cancelAnimationFrame(id)
        ro.disconnect()
      }
    }, [reduceMotion, fill, radius, roughness, seed, stroke])

    const assignRef = (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    if (reduceMotion) {
      return (
        <div
          ref={assignRef}
          className={cn('rounded-xl border-2 border-dashed border-craft-ink/25 p-[3px]', className)}
          {...props}
        >
          {children}
        </div>
      )
    }

    const gutterPx = `${gutter}px`

    return (
      <div ref={assignRef} className={cn('relative w-full', className)} {...props}>
        <svg
          ref={svgRef}
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-craft-ink"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        />
        <div
          className="relative z-[1] box-border w-full"
          style={{ padding: gutterPx }}
        >
          {children}
        </div>
      </div>
    )
  },
)
