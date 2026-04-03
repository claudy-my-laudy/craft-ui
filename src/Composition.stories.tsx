import type { Meta, StoryObj } from '@storybook/react'

import { CraftBadge } from './components/CraftBadge'
import { CraftButton } from './components/CraftButton'
import { CraftCard } from './components/CraftCard'
import { RopeFrame } from './components/RopeFrame'

const meta = {
  title: 'Craft/Composition',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CardInRope: Story = {
  render: () => (
    <RopeFrame className="max-w-md">
      <CraftCard elevation="lg" tint="yellow" className="border-none shadow-none">
        <h2 className="font-craft text-3xl text-craft-ink">Studio hours</h2>
        <p className="font-craftSans mt-2 text-sm text-craft-muted">
          Tuesday–Thursday, messy tables welcome.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <CraftBadge>open</CraftBadge>
          <CraftButton variant="eraser" crayon="red">
            RSVP
          </CraftButton>
        </div>
      </CraftCard>
    </RopeFrame>
  ),
}
