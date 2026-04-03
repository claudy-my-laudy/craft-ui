import { type RefObject, useEffect } from 'react'

export function useClickOutside<E extends HTMLElement = HTMLElement>(
  ref: RefObject<E | null>,
  onOutside: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return
    const onPointerDown = (e: PointerEvent) => {
      const el = ref.current
      if (!el || el.contains(e.target as Node)) return
      onOutside()
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [ref, onOutside, enabled])
}
