import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import { cn } from '../lib/cn'
import type { CraftCrayon, CraftPaperVariant } from './CraftCard'

// ─── Context ─────────────────────────────────────────────────────────────────

type AccordionCtx = {
  value: string | null
  toggle: (id: string) => void
  variant: CraftPaperVariant
  crayon: CraftCrayon
}

const AccordionContext = createContext<AccordionCtx>({
  value: null,
  toggle: () => {},
  variant: 'default',
  crayon: 'orange',
})

// ─── CraftAccordion (root) ────────────────────────────────────────────────────

export type CraftAccordionProps = ComponentPropsWithoutRef<'div'> & {
  variant?: CraftPaperVariant
  crayon?: CraftCrayon
  defaultValue?: string
}

export const CraftAccordion = forwardRef<HTMLDivElement, CraftAccordionProps>(
  function CraftAccordion(
    { className, variant = 'default', crayon = 'orange', defaultValue, children, ...props },
    ref,
  ) {
    const [value, setValue] = useState<string | null>(defaultValue ?? null)
    const toggle = (id: string) => setValue((cur) => (cur === id ? null : id))

    return (
      <AccordionContext.Provider value={{ value, toggle, variant, crayon }}>
        <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)

// ─── CraftAccordionItem ───────────────────────────────────────────────────────

export type CraftAccordionItemProps = ComponentPropsWithoutRef<'div'> & {
  value: string
}

type ItemCtx = { itemId: string; isOpen: boolean; headingId: string; panelId: string }
const ItemContext = createContext<ItemCtx>({
  itemId: '',
  isOpen: false,
  headingId: '',
  panelId: '',
})

export const CraftAccordionItem = forwardRef<HTMLDivElement, CraftAccordionItemProps>(
  function CraftAccordionItem({ className, value: itemId, children, ...props }, ref) {
    const { value } = useContext(AccordionContext)
    const uid = useId().replace(/:/g, '')
    const isOpen = value === itemId

    return (
      <ItemContext.Provider
        value={{ itemId, isOpen, headingId: `ch-${uid}`, panelId: `cp-${uid}` }}
      >
        <div
          ref={ref}
          className={cn(
            'relative rounded-xl border border-black/[0.08] overflow-hidden',
            '[perspective:700px] [perspective-origin:top_center]',
            'transition-shadow duration-250',
            isOpen
              ? 'shadow-[0_2px_4px_rgba(0,0,0,0.2),0_10px_24px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.18)]'
              : 'shadow-[0_1px_3px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.1)]',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </ItemContext.Provider>
    )
  },
)

// ─── CraftAccordionTrigger ────────────────────────────────────────────────────

const crayonOpen: Record<CraftCrayon, string> = {
  orange: 'bg-craft-orange text-white',
  green:  'bg-craft-green  text-craft-ink',
  pink:   'bg-craft-pink   text-white',
  yellow: 'bg-craft-yellow text-craft-ink',
  red:    'bg-craft-red    text-white',
  blue:   'bg-craft-blue   text-white',
  lime:   'bg-craft-lime   text-craft-ink',
}

const paperClosed: Record<CraftPaperVariant, string> = {
  default:   'bg-[radial-gradient(ellipse_at_42%_35%,#f7f2e8,#ede8da_55%,#e0d9c6)] text-[#2e2418]',
  kraft:     'bg-[radial-gradient(ellipse_at_38%_38%,#d9b96a,#c8a040_55%,#b08828)] text-[#2e1a00]',
  parchment: 'bg-[radial-gradient(ellipse_at_45%_40%,#f5edbb,#ede4a0_50%,#dfd48a)] text-[#3a2c00]',
}

export type CraftAccordionTriggerProps = ComponentPropsWithoutRef<'button'>

export const CraftAccordionTrigger = forwardRef<HTMLButtonElement, CraftAccordionTriggerProps>(
  function CraftAccordionTrigger({ className, children, ...props }, ref) {
    const { toggle, crayon, variant } = useContext(AccordionContext)
    const { itemId, isOpen, headingId, panelId } = useContext(ItemContext)

    return (
      <h3 id={headingId} className="m-0">
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(itemId)}
          className={cn(
            'w-full flex items-center justify-between gap-3 px-5 py-4 relative z-[1]',
            'font-craft text-lg font-semibold leading-snug text-left',
            'transition-[background,color] duration-200',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-craft-ink/40',
            isOpen ? crayonOpen[crayon] : paperClosed[variant],
            className,
          )}
          {...props}
        >
          <span>{children}</span>
          {/* Hand-drawn chevron rotates when open */}
          <span
            aria-hidden
            className={cn(
              'shrink-0 transition-transform duration-350',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4.5 7.5 C6 9.2 8.2 11.8 9.9 12.8 C11.7 11.7 13.9 9.1 15.5 7.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </button>
      </h3>
    )
  },
)

// ─── CraftAccordionContent ────────────────────────────────────────────────────
// Paper-unfold animation:
//   - wrapper animates height (0 → natural height) for layout flow
//   - inner panel rotates from rotateX(-90deg) → rotateX(0deg)
//     hinging from the fold crease at the top edge
//   - opacity fades in during the second half of the unfold

const paperPanel: Record<CraftPaperVariant, string> = {
  default:   'bg-[#f2ede0] text-[#2e2418]',
  kraft:     'bg-[#d4aa52] text-[#2e1a00]',
  parchment: 'bg-[#f0e8aa] text-[#3a2c00]',
}

export type CraftAccordionContentProps = ComponentPropsWithoutRef<'div'>

export const CraftAccordionContent = forwardRef<HTMLDivElement, CraftAccordionContentProps>(
  function CraftAccordionContent({ className, children, ...props }, ref) {
    const { variant } = useContext(AccordionContext)
    const { isOpen, panelId, headingId } = useContext(ItemContext)

    const wrapRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)

    // Animate the wrapper height
    useEffect(() => {
      const wrap = wrapRef.current
      const panel = panelRef.current
      if (!wrap || !panel) return

      if (isOpen) {
        wrap.style.transition = 'height 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)'
        wrap.style.height = panel.offsetHeight + 'px'
      } else {
        wrap.style.transition = 'height 0.38s cubic-bezier(0.4, 0, 0.6, 0)'
        wrap.style.height = '0px'
      }
    }, [isOpen])

    return (
      /* Height-animated outer wrapper */
      <div
        ref={wrapRef}
        style={{ height: 0, overflow: 'hidden', transformStyle: 'preserve-3d' }}
      >
        {/* The actual paper panel — rotateX unfold */}
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          className={cn(
            paperPanel[variant],
            'px-5 py-4',
            'font-craft text-base leading-relaxed',
            // Fold crease shadow at top
            'border-t border-black/[0.08]',
            'shadow-[inset_0_4px_10px_rgba(0,0,0,0.07)]',
            // Paper grain
            'relative',
            // Unfold transform
            'transition-[transform,opacity]',
            '[transition-duration:0.45s,0.3s]',
            '[transition-timing-function:cubic-bezier(0.25,0.8,0.25,1),ease]',
            '[transform-origin:top_center]',
            isOpen
              ? '[transform:rotateX(0deg)] opacity-100'
              : '[transform:rotateX(-88deg)] opacity-0',
            className,
          )}
          {...props}
        >
          {/* Grain overlay */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-luminosity"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          {children}
        </div>
      </div>
    )
  },
)


import { cn } from '../lib/cn'
import type { CraftCrayon, CraftPaperVariant } from './CraftCard'

// ─── Context ─────────────────────────────────────────────────────────────────

type AccordionCtx = {
  value: string | null
  toggle: (id: string) => void
  variant: CraftPaperVariant
  crayon: CraftCrayon
}

const AccordionContext = createContext<AccordionCtx>({
  value: null,
  toggle: () => {},
  variant: 'default',
  crayon: 'orange',
})

// ─── CraftAccordion (root) ────────────────────────────────────────────────────

export type CraftAccordionProps = ComponentPropsWithoutRef<'div'> & {
  /** Paper surface variant applied to all items */
  variant?: CraftPaperVariant
  /** Crayon accent colour for the active trigger tab */
  crayon?: CraftCrayon
  /** Default open item id */
  defaultValue?: string
}

export const CraftAccordion = forwardRef<HTMLDivElement, CraftAccordionProps>(
  function CraftAccordion(
    { className, variant = 'default', crayon = 'orange', defaultValue, children, ...props },
    ref,
  ) {
    const [value, setValue] = useState<string | null>(defaultValue ?? null)

    const toggle = (id: string) => setValue((cur) => (cur === id ? null : id))

    return (
      <AccordionContext.Provider value={{ value, toggle, variant, crayon }}>
        <div
          ref={ref}
          className={cn('flex flex-col gap-2', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)

// ─── CraftAccordionItem ───────────────────────────────────────────────────────

export type CraftAccordionItemProps = ComponentPropsWithoutRef<'div'> & {
  /** Must match the value passed to CraftAccordionTrigger */
  value: string
}

type ItemCtx = { itemId: string; isOpen: boolean; headingId: string; panelId: string }
const ItemContext = createContext<ItemCtx>({
  itemId: '',
  isOpen: false,
  headingId: '',
  panelId: '',
})

export const CraftAccordionItem = forwardRef<HTMLDivElement, CraftAccordionItemProps>(
  function CraftAccordionItem({ className, value: itemId, children, ...props }, ref) {
    const { value } = useContext(AccordionContext)
    const uid = useId().replace(/:/g, '')
    const isOpen = value === itemId

    return (
      <ItemContext.Provider
        value={{ itemId, isOpen, headingId: `ch-${uid}`, panelId: `cp-${uid}` }}
      >
        <div
          ref={ref}
          className={cn(
            'relative rounded-xl border border-black/[0.07] overflow-hidden',
            'transition-shadow duration-200',
            isOpen
              ? 'shadow-[0_2px_4px_rgba(0,0,0,0.18),0_8px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]'
              : 'shadow-[0_1px_3px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.1)]',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </ItemContext.Provider>
    )
  },
)

// ─── CraftAccordionTrigger ────────────────────────────────────────────────────

const crayonAccent: Record<CraftCrayon, string> = {
  orange: 'bg-craft-orange text-white',
  green:  'bg-craft-green  text-craft-ink',
  pink:   'bg-craft-pink   text-white',
  yellow: 'bg-craft-yellow text-craft-ink',
  red:    'bg-craft-red    text-white',
  blue:   'bg-craft-blue   text-white',
  lime:   'bg-craft-lime   text-craft-ink',
}

const paperBase: Record<CraftPaperVariant, string> = {
  default:  'bg-[#ede8da]',
  kraft:    'bg-[#c8a040]',
  parchment:'bg-[#ede4a0]',
}

export type CraftAccordionTriggerProps = ComponentPropsWithoutRef<'button'>

export const CraftAccordionTrigger = forwardRef<HTMLButtonElement, CraftAccordionTriggerProps>(
  function CraftAccordionTrigger({ className, children, ...props }, ref) {
    const { toggle, crayon, variant } = useContext(AccordionContext)
    const { itemId, isOpen, headingId, panelId } = useContext(ItemContext)

    return (
      <h3 id={headingId} className="m-0">
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(itemId)}
          className={cn(
            'w-full flex items-center justify-between gap-3',
            'px-5 py-4',
            'font-craft text-lg font-semibold leading-snug text-left',
            'transition-colors duration-150',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-craft-ink/40',
            // When open: crayon colour tab; when closed: paper surface
            isOpen ? crayonAccent[crayon] : paperBase[variant],
            className,
          )}
          {...props}
        >
          <span>{children}</span>
          {/* Marker-drawn chevron — rotates 180° when open */}
          <span
            aria-hidden
            className={cn(
              'shrink-0 transition-transform duration-300',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="block"
            >
              {/* Slightly wobbly hand-drawn chevron */}
              <path
                d="M4.5 7.5 C6 9.2 8.2 11.8 9.9 12.8 C11.7 11.7 13.9 9.1 15.5 7.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </button>
      </h3>
    )
  },
)

// ─── CraftAccordionContent ────────────────────────────────────────────────────

const paperContent: Record<CraftPaperVariant, string> = {
  default:  'bg-[#f2ede0]',
  kraft:    'bg-[#d4aa52]',
  parchment:'bg-[#f0e8aa]',
}

export type CraftAccordionContentProps = ComponentPropsWithoutRef<'div'>

export const CraftAccordionContent = forwardRef<HTMLDivElement, CraftAccordionContentProps>(
  function CraftAccordionContent({ className, children, ...props }, ref) {
    const { variant } = useContext(AccordionContext)
    const { isOpen, panelId, headingId } = useContext(ItemContext)

    return (
      <div
        ref={ref}
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
        className={cn(
          paperContent[variant],
          // Crease line at the top — like unfolding paper
          'border-t border-black/[0.08]',
          'px-5 py-4',
          'font-craft text-base leading-relaxed text-craft-ink',
          // Subtle inner shadow simulating the fold crease
          'shadow-[inset_0_3px_8px_rgba(0,0,0,0.06)]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
