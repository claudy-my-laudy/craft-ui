import { useCallback, useState } from 'react'

/** Controlled or uncontrolled state (single value). */
export function useControllableState<T>(options: {
  value?: T
  defaultValue: T
  onChange?: (next: T) => void
}): [T, (next: T) => void] {
  const { value, defaultValue, onChange } = options
  const [inner, setInner] = useState<T>(defaultValue)
  const isControlled = value !== undefined
  const state = (isControlled ? value : inner) as T

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) setInner(next)
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [state, setState]
}
