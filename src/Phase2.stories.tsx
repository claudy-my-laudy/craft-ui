import type { Meta, StoryObj } from '@storybook/react'

import { CraftSketchUnderline } from './components/CraftSketchUnderline'
import { CraftTag } from './components/CraftTag'
import { CrayonDivider } from './components/CrayonDivider'
import { GlitterAccent } from './components/GlitterAccent'
import { RopeFrame } from './components/RopeFrame'
import { StickyNote } from './components/StickyNote'
import { TissuePanel } from './components/TissuePanel'
import { WashiStrip } from './components/WashiStrip'
import { WatercolorPanel } from './components/WatercolorPanel'

const meta = {
  title: 'Craft/Phase 2 surfaces',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Catalog: Story = {
  render: () => (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 font-craftSans">
      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-craft-muted">Sticky notes</h3>
        <div className="flex flex-wrap gap-4">
          <StickyNote color="pink" rotate={-3}>
            Call the bakery before 4&nbsp;pm
          </StickyNote>
          <StickyNote color="lime" rotate={2}>
            Buy washi + twine
          </StickyNote>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-craft-muted">Washi strips</h3>
        <div className="flex flex-col gap-3">
          <WashiStrip pattern="stripes" tint="mint">
            Section title — stripes
          </WashiStrip>
          <WashiStrip pattern="dots" tint="pink">
            Dotted tape accent
          </WashiStrip>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-craft-muted">Tag + underline</h3>
        <CraftTag>
          <span className="font-craft text-2xl">L × W</span>
          <span className="font-craftSans text-sm font-normal opacity-90">78cm × 56.5cm</span>
        </CraftTag>
        <p className="font-craft text-3xl">
          <CraftSketchUnderline variant="accent">Party time</CraftSketchUnderline>
        </p>
      </section>

      <CrayonDivider />

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-craft-muted">Watercolor panel</h3>
        <WatercolorPanel wash="candy" className="max-w-lg">
          <p className="font-craft text-3xl text-craft-ink">Soft bleed background</p>
          <p className="font-craftSans mt-2 text-sm text-craft-muted">
            For section wrappers or playful hero shells.
          </p>
        </WatercolorPanel>
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <GlitterAccent crayon="pink">VIP</GlitterAccent>
        <GlitterAccent crayon="yellow">New</GlitterAccent>
        <GlitterAccent crayon="blue">Sale</GlitterAccent>
      </section>

      <TissuePanel className="max-w-md">
        <p className="font-craftSans text-sm text-craft-muted">
          Crinkled translucent panel — stack over busy paper for breathable UI chrome.
        </p>
      </TissuePanel>
    </div>
  ),
}

export const InRopeFrame: Story = {
  render: () => (
    <RopeFrame className="max-w-lg">
      <div className="space-y-4">
        <WashiStrip tint="yellow" pattern="plain" className="w-full justify-center">
          Today’s desk
        </WashiStrip>
        <StickyNote color="yellow" rotate={1.5}>
          Phase 2 surfaces play nicely inside a rope frame.
        </StickyNote>
        <CrayonDivider crayon="orange" />
        <GlitterAccent crayon="green">done</GlitterAccent>
      </div>
    </RopeFrame>
  ),
}
