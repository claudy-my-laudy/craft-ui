import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { CraftButton } from './components/CraftButton'
import { CraftCard } from './components/CraftCard'
import { CraftCheckbox } from './components/CraftCheckbox'
import { CraftInput } from './components/CraftInput'
import { CraftLabel } from './components/CraftLabel'
import { CraftProvider } from './components/CraftProvider'
import { CraftRadio } from './components/CraftRadio'
import { CraftRadioGroup } from './components/CraftRadioGroup'
import { CraftRoughFieldFrame } from './components/CraftRoughFieldFrame'
import { CraftSelect } from './components/CraftSelect'
import { CraftSwitch } from './components/CraftSwitch'
import { CraftTextarea } from './components/CraftTextarea'
import { CrayonDivider } from './components/CrayonDivider'

const meta = {
  title: 'Craft/Phase 3 forms',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FieldShowcase: Story = {
  render: function Showcase() {
    const [sw, setSw] = useState(true)
    return (
      <CraftCard className="mx-auto max-w-md space-y-5">
        <div className="space-y-1.5">
          <CraftLabel htmlFor="craft-name" required>
            Your name
          </CraftLabel>
          <CraftInput id="craft-name" name="name" placeholder="Jamie" autoComplete="name" />
        </div>

        <div className="space-y-1.5">
          <CraftLabel htmlFor="craft-note" className="italic">
            Note
          </CraftLabel>
          <CraftTextarea
            id="craft-note"
            appearance="paper"
            placeholder="Ideas for the party…"
            rows={3}
          />
        </div>

        <CrayonDivider crayon="pink" />

        <CraftRadioGroup label="Pick a treat">
          <CraftRadio name="treat" value="cake" label="Cake" defaultChecked />
          <CraftRadio name="treat" value="pie" label="Pie" />
          <CraftRadio name="treat" value="both" label="Both" />
        </CraftRadioGroup>

        <div className="flex flex-wrap items-center gap-6">
          <CraftCheckbox defaultChecked label="RSVP yes" />
          <CraftLabel className="inline-flex cursor-pointer items-center gap-2 text-base">
            <span>Sparkles</span>
            <CraftSwitch checked={sw} onCheckedChange={setSw} aria-label="Sparkles" />
          </CraftLabel>
        </div>

        <div className="space-y-1.5">
          <CraftLabel htmlFor="craft-palette">Palette</CraftLabel>
          <CraftSelect id="craft-palette" name="palette" defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option value="sunset">Sunset crayons</option>
            <option value="ocean">Ocean crayons</option>
            <option value="forest">Forest crayons</option>
          </CraftSelect>
        </div>

        <CraftButton variant="eraser" crayon="green" className="w-full">
          Save doodle
        </CraftButton>
      </CraftCard>
    )
  },
}

/** Trial: debossed `appearance="paper"` + optional Rough.js frame — not in the default showcase above. */
export const PaperAndRoughFieldTrial: Story = {
  render: () => (
    <CraftProvider vibe="scrapbook">
      <div className="craft-paper-base mx-auto max-w-lg space-y-10 rounded-2xl p-8 shadow-craft-paper ring-1 ring-black/10">
        <div>
          <p className="font-craftSans text-sm font-semibold text-craft-muted">Paper appearance (CSS deboss)</p>
          <p className="mt-1 font-craftSans text-xs text-craft-muted">
            Cream field pressed into yellow paper — no Rough.js.
          </p>
          <div className="mt-4 space-y-1.5">
            <CraftLabel htmlFor="trial-note" className="italic">
              Note
            </CraftLabel>
            <CraftTextarea
              id="trial-note"
              appearance="paper"
              placeholder="Ideas for the party…"
              rows={4}
            />
          </div>
          <div className="mt-5 space-y-1.5">
            <CraftLabel htmlFor="trial-title">Title</CraftLabel>
            <CraftInput id="trial-title" appearance="paper" placeholder="Short line" />
          </div>
        </div>

        <div>
          <p className="font-craftSans text-sm font-semibold text-craft-muted">Rough.js sketch frame</p>
          <p className="mt-1 font-craftSans text-xs text-craft-muted">
            Multi-stroke border (and optional fill). Focus ring stays on the native control.
          </p>
          <div className="mt-4 space-y-1.5">
            <CraftLabel htmlFor="trial-rough-ta">Rough frame + paper field</CraftLabel>
            <CraftRoughFieldFrame fill="#f8dbe8" roughness={1.35} stroke="#1c1914" seed={11}>
              <CraftTextarea
                id="trial-rough-ta"
                appearance="paper"
                placeholder="Sketchy outline around this box…"
                rows={3}
              />
            </CraftRoughFieldFrame>
          </div>
          <div className="mt-5 space-y-1.5">
            <CraftLabel htmlFor="trial-rough-in">Stroke only (default field)</CraftLabel>
            <CraftRoughFieldFrame seed={19} roughness={1.35}>
              <CraftInput id="trial-rough-in" placeholder="Default appearance inside rough frame" />
            </CraftRoughFieldFrame>
          </div>
        </div>
      </div>
    </CraftProvider>
  ),
}
