import clsx, { type ClassValue } from 'clsx'

/** Merge class names — thin `clsx` re-export for components. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
