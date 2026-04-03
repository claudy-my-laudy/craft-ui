import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useId,
  useMemo,
  useRef,
} from 'react'

import { cn } from '../lib/cn'
import { useControllableState } from '../lib/useControllableState'

export type CraftTabItem = {
  value: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export type CraftTabsProps = {
  items: CraftTabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  /** Tab strip row */
  listClassName?: string
  /** Panel area */
  panelClassName?: string
}

function nextEnabledIndex(items: CraftTabItem[], from: number, dir: 1 | -1): number {
  const n = items.length
  if (n === 0) return 0
  let i = from
  for (let s = 0; s < n; s += 1) {
    i = (i + dir + n) % n
    if (!items[i]?.disabled) return i
  }
  return from
}

/**
 * Sticky-note style tabs: active tab lifts slightly; arrow keys move focus + selection.
 */
export function CraftTabs({
  items,
  defaultValue,
  value: valueProp,
  onValueChange,
  className,
  listClassName,
  panelClassName,
}: CraftTabsProps) {
  const firstEnabled = items.find((t) => !t.disabled)?.value ?? items[0]?.value ?? ''
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? firstEnabled,
    onChange: onValueChange,
  })

  const uid = useId().replace(/:/g, '')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selectedIndex = useMemo(() => {
    const i = items.findIndex((t) => t.value === value)
    return i >= 0 ? i : 0
  }, [items, value])

  const focusIndex = useCallback(
    (index: number) => {
      const t = items[index]
      if (!t || t.disabled) return
      setValue(t.value)
      tabRefs.current[index]?.focus()
    },
    [items, setValue],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const i = selectedIndex
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        focusIndex(nextEnabledIndex(items, i, 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        focusIndex(nextEnabledIndex(items, i, -1))
      } else if (e.key === 'Home') {
        e.preventDefault()
        const fi = items.findIndex((t) => !t.disabled)
        if (fi >= 0) focusIndex(fi)
      } else if (e.key === 'End') {
        e.preventDefault()
        let li = items.length - 1
        while (li >= 0 && items[li]?.disabled) li -= 1
        if (li >= 0) focusIndex(li)
      }
    },
    [focusIndex, items, selectedIndex],
  )

  const active = items[selectedIndex]

  if (items.length === 0) {
    return null
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn('flex flex-wrap items-end gap-1 border-b-2 border-black/10 pb-0.5', listClassName)}
        onKeyDown={onKeyDown}
      >
        {items.map((tab, index) => {
          const selected = tab.value === value
          const tabId = `craft-tab-${uid}-${tab.value}`
          const panelId = `craft-panel-${uid}-${tab.value}`

          return (
            <button
              key={tab.value}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && setValue(tab.value)}
              className={cn(
                'relative z-0 -mb-0.5 min-w-[5rem] rounded-t-md border-2 border-b-0 px-4 py-2',
                'font-craft text-xl font-semibold transition-[transform,box-shadow,opacity]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-craft-orange/60',
                tab.disabled && 'cursor-not-allowed opacity-40',
                selected
                  ? cn(
                      'z-[1] border-black/20 bg-craft-yellow text-craft-ink',
                      'shadow-[0_-2px_0_rgb(255_255_255_/_0.5)_inset,0_-4px_12px_rgb(0_0_0_/_0.08)]',
                      '-translate-y-0.5 rotate-[-0.5deg]',
                    )
                  : cn(
                      'border-transparent bg-craft-paper/80 text-craft-muted',
                      'opacity-90 hover:border-black/10 hover:bg-white/70 hover:text-craft-ink',
                    ),
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={active ? `craft-panel-${uid}-${active.value}` : undefined}
        aria-labelledby={active ? `craft-tab-${uid}-${active.value}` : undefined}
        className={cn(
          'mt-4 rounded-lg border-2 border-black/10 bg-white/70 p-4 shadow-craft-paper',
          'ring-1 ring-black/5',
          panelClassName,
        )}
        hidden={!active}
      >
        {active?.content}
      </div>
    </div>
  )
}
