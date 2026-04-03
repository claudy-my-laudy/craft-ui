import type { Meta, StoryObj } from '@storybook/react'

import { CraftButton } from './components/CraftButton'

const meta = {
  title: 'Craft/CraftButton',
  component: CraftButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CraftButton>

export default meta
type Story = StoryObj<typeof meta>

export const Clay: Story = {
  args: {
    variant: 'clay',
    crayon: 'pink',
    children: 'squishy clay',
  },
}

export const Eraser: Story = {
  args: {
    variant: 'eraser',
    crayon: 'yellow',
    children: 'blocky eraser',
  },
}

export const Crayons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['orange', 'green', 'pink', 'yellow', 'red', 'blue', 'lime'] as const).map((c) => (
        <CraftButton key={c} variant="clay" crayon={c} className="capitalize">
          {c}
        </CraftButton>
      ))}
    </div>
  ),
}
