import type { Meta, StoryObj } from '@storybook/react'

import { CraftBadge } from './components/CraftBadge'
import { CraftCard, type CraftCrayon } from './components/CraftCard'
import { CraftLetterChip } from './components/CraftLetterChip'
import { CraftTwineGarland } from './components/CraftTwineGarland'

const meta = {
  title: 'Craft/Scrapbook birthday vibe',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const chipLine = (word: string, colors: CraftCrayon[]) =>
  word.split('').map((letter, i) => (
    <CraftLetterChip
      key={`${word}-${i}`}
      crayon={colors[i % colors.length]}
      rotate={i % 2 === 0 ? -2.5 : 2}
    >
      {letter}
    </CraftLetterChip>
  ))

export const HandmadeCard: Story = {
  render: () => (
    <div className="craft-paper-base mx-auto max-w-xl rounded-md p-8 shadow-craft-paper-lg ring-1 ring-black/10">
      <CraftTwineGarland className="w-full">
        {chipLine('HAPPY', ['pink', 'lime', 'yellow', 'orange', 'pink'])}
      </CraftTwineGarland>
      <CraftTwineGarland className="mt-2 w-full">
        {chipLine('BIRTHDAY', [
          'green',
          'pink',
          'yellow',
          'orange',
          'lime',
          'yellow',
          'pink',
          'blue',
        ])}
      </CraftTwineGarland>

      <div className="mt-10 flex flex-wrap items-start justify-between gap-4">
        <CraftCard lift="paste" className="max-w-[220px] border-white/80 bg-white/90 p-3">
          <p className="font-craftSans text-xs font-semibold uppercase tracking-wide text-craft-blue">
            Enjoy
          </p>
          <p className="font-craftSans text-xs font-semibold uppercase tracking-wide text-craft-red">
            your special day
          </p>
        </CraftCard>
        <span
          className="inline-block h-9 w-9 rotate-6 rounded-sm bg-craft-rope-dark shadow-craft-paper"
          aria-hidden
        />
      </div>

      <div className="mt-12 flex justify-center gap-6 opacity-90">
        <span className="font-craftMarker text-4xl text-craft-pink" aria-hidden>
          🎂
        </span>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <CraftBadge>made with glue &amp; chaos</CraftBadge>
      </div>
    </div>
  ),
}
