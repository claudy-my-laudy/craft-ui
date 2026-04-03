import { type SVGProps, forwardRef, useId } from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon } from './CraftCard'

/** Extra finish: neutral metal, not in CraftCrayon */
export type CraftPaperClipTone = CraftCrayon | 'silver'

const tints: Record<CraftPaperClipTone, { hi: string; mid: string; lo: string }> = {
  blue: { hi: '#93c5fd', mid: '#3b82f6', lo: '#1e3a8a' },
  yellow: { hi: '#fde68a', mid: '#f5c018', lo: '#a16207' },
  red: { hi: '#fca5a5', mid: '#d12a3a', lo: '#7f1d1d' },
  green: { hi: '#86efac', mid: '#2dd54a', lo: '#14532d' },
  orange: { hi: '#fdba74', mid: '#e85d2a', lo: '#9a3412' },
  pink: { hi: '#f9a8d4', mid: '#ff4fa8', lo: '#831843' },
  lime: { hi: '#d9f99d', mid: '#9ae06b', lo: '#3f6212' },
  silver: { hi: '#f1f5f9', mid: '#94a3b8', lo: '#334155' },
}

export type CraftPaperClipProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  /** Plastic / wire color — desk brights + silver */
  tone?: CraftPaperClipTone
  /** Height in px (width scales to gem proportions) */
  size?: number
}

/** Gem-style paper clip, vertical; 3D read from diagonal gradient (see Material Design paperclip path). */
export const CraftPaperClip = forwardRef<SVGSVGElement, CraftPaperClipProps>(function CraftPaperClip(
  { className, tone = 'blue', size = 28, ...props },
  ref,
) {
  const uid = useId().replace(/:/g, '')
  const g = tints[tone]
  const w = (size * 18) / 28

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient
          id={`craft-pc-${uid}`}
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={g.hi} />
          <stop offset="0.45" stopColor={g.mid} />
          <stop offset="1" stopColor={g.lo} />
        </linearGradient>
      </defs>
      <g transform="rotate(90 12 12)">
        <path
          fill="none"
          stroke={`url(#craft-pc-${uid})`}
          strokeWidth="2.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 6V17.5A4 4 0 0 1 12.5 21.5A4 4 0 0 1 8.5 17.5V5A2.5 2.5 0 0 1 11 2.5A2.5 2.5 0 0 1 13.5 5V15.5A1 1 0 0 1 12.5 16.5A1 1 0 0 1 11.5 15.5V7"
        />
      </g>
    </svg>
  )
})
