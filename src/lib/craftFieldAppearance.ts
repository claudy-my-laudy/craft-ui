export type CraftFieldAppearance = 'default' | 'paper'

export function craftFieldAppearanceClass(appearance: CraftFieldAppearance | undefined): string {
  return appearance === 'paper' ? 'craft-input-field-paper' : ''
}
