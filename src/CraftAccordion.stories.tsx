import type { Meta, StoryObj } from '@storybook/react'
import {
  CraftAccordion,
  CraftAccordionItem,
  CraftAccordionTrigger,
  CraftAccordionContent,
} from './components/CraftAccordion'
import { CraftProvider } from './components/CraftProvider'

const meta: Meta = {
  title: 'Components / CraftAccordion',
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: '#2a1d10',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4rem 2rem',
        }}
      >
        <CraftProvider>
          <div style={{ width: '100%', maxWidth: 520 }}>
            <Story />
          </div>
        </CraftProvider>
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <CraftAccordion defaultValue="item-1">
      <CraftAccordionItem value="item-1">
        <CraftAccordionTrigger>What is craft-ui?</CraftAccordionTrigger>
        <CraftAccordionContent>
          Craft UI is a handmade-aesthetic component library — paper textures, crayon
          accents, and scrapbook-inspired layouts for React. Every surface feels like
          it was cut from real paper and glued together.
        </CraftAccordionContent>
      </CraftAccordionItem>

      <CraftAccordionItem value="item-2">
        <CraftAccordionTrigger>How do I install it?</CraftAccordionTrigger>
        <CraftAccordionContent>
          Run <code>npm install craft-ui</code>, wrap your app in{' '}
          <code>&lt;CraftProvider&gt;</code>, and start using components. No extra
          config needed — Tailwind tokens are injected automatically.
        </CraftAccordionContent>
      </CraftAccordionItem>

      <CraftAccordionItem value="item-3">
        <CraftAccordionTrigger>Can I customise the paper variant?</CraftAccordionTrigger>
        <CraftAccordionContent>
          Yes! Pass <code>variant="kraft"</code> or <code>variant="parchment"</code>{' '}
          to the accordion root. All items inherit the surface automatically.
        </CraftAccordionContent>
      </CraftAccordionItem>
    </CraftAccordion>
  ),
}

// ── Kraft variant ─────────────────────────────────────────────────────────────
export const KraftVariant: Story = {
  name: 'Kraft Paper',
  render: () => (
    <CraftAccordion variant="kraft" crayon="red" defaultValue="k1">
      <CraftAccordionItem value="k1">
        <CraftAccordionTrigger>Packaging & shipping</CraftAccordionTrigger>
        <CraftAccordionContent>
          Orders are wrapped in recycled kraft paper and shipped within 2–3 business
          days. Tracking is included in your confirmation email.
        </CraftAccordionContent>
      </CraftAccordionItem>

      <CraftAccordionItem value="k2">
        <CraftAccordionTrigger>Returns policy</CraftAccordionTrigger>
        <CraftAccordionContent>
          We accept returns within 30 days for any reason. Just drop us a note and
          we'll sort it out — no awkward forms.
        </CraftAccordionContent>
      </CraftAccordionItem>

      <CraftAccordionItem value="k3">
        <CraftAccordionTrigger>Sustainability</CraftAccordionTrigger>
        <CraftAccordionContent>
          All packaging is plastic-free. Our kraft paper is sourced from FSC-certified
          mills, and we offset 2× our carbon footprint every quarter.
        </CraftAccordionContent>
      </CraftAccordionItem>
    </CraftAccordion>
  ),
}

// ── Parchment variant ─────────────────────────────────────────────────────────
export const ParchmentVariant: Story = {
  name: 'Parchment',
  render: () => (
    <CraftAccordion variant="parchment" crayon="blue" defaultValue="p1">
      <CraftAccordionItem value="p1">
        <CraftAccordionTrigger>Chapter I — The Beginning</CraftAccordionTrigger>
        <CraftAccordionContent>
          In the age before the great libraries, knowledge was passed by hand on sheets
          of stretched vellum. Each scroll was a treasure, guarded and copied with care.
        </CraftAccordionContent>
      </CraftAccordionItem>

      <CraftAccordionItem value="p2">
        <CraftAccordionTrigger>Chapter II — The Archive</CraftAccordionTrigger>
        <CraftAccordionContent>
          The great archive held ten thousand volumes. Scribes worked by candlelight,
          their quills scratching long into the night to preserve the old words.
        </CraftAccordionContent>
      </CraftAccordionItem>
    </CraftAccordion>
  ),
}

// ── All crayon colours ────────────────────────────────────────────────────────
export const CrayonColors: Story = {
  name: 'Crayon Colours',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {(['orange', 'red', 'blue', 'green', 'pink', 'yellow', 'lime'] as const).map(
        (crayon) => (
          <CraftAccordion key={crayon} crayon={crayon} defaultValue="open">
            <CraftAccordionItem value="open">
              <CraftAccordionTrigger>crayon="{crayon}"</CraftAccordionTrigger>
              <CraftAccordionContent>
                The trigger tab turns {crayon} when expanded. Content sits on the warm
                paper surface below the fold crease.
              </CraftAccordionContent>
            </CraftAccordionItem>
          </CraftAccordion>
        ),
      )}
    </div>
  ),
}
