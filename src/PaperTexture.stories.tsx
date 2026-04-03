import type { Meta, StoryObj } from '@storybook/react'

import { CraftCard } from './components/CraftCard'
import { CraftProvider } from './components/CraftProvider'

const meta: Meta<typeof CraftCard> = {
  title: 'Paper / Texture Variants',
  component: CraftCard,
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: '#2b1f14',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          padding: '3rem 2rem',
        }}
      >
        <CraftProvider>
          <Story />
        </CraftProvider>
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof CraftCard>

export const Default: Story = {
  render: () => (
    <CraftCard style={{ width: 300 }}>
      <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        Handmade Cream
      </h2>
      <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7 }}>
        Warm, off-white handmade paper. The original craft-ui surface — upgraded with
        diffuse-lit grain for real fiber depth.
      </p>
    </CraftCard>
  ),
}

export const Kraft: Story = {
  render: () => (
    <CraftCard variant="kraft" style={{ width: 300 }}>
      <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        Kraft Paper
      </h2>
      <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7 }}>
        Unbleached brown packaging paper. Raw, earthy, honest. The grocery bag aesthetic.
      </p>
    </CraftCard>
  ),
}

export const Parchment: Story = {
  render: () => (
    <CraftCard variant="parchment" style={{ width: 300 }}>
      <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        Parchment
      </h2>
      <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7 }}>
        Aged golden document paper. Like a letter that survived a shipwreck.
      </p>
    </CraftCard>
  ),
}

export const DeckledEdges: Story = {
  render: () => (
    <>
      <CraftCard deckled={1} style={{ width: 280 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
          Torn Edge #1
        </h2>
        <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Hand-torn deckled edges via SVG clip-path. No images needed.
        </p>
      </CraftCard>
      <CraftCard variant="kraft" deckled={2} style={{ width: 280 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
          Torn Edge #2
        </h2>
        <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Kraft paper with a different tear profile — no two cards look identical.
        </p>
      </CraftCard>
      <CraftCard variant="parchment" deckled={3} style={{ width: 280 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
          Torn Edge #3
        </h2>
        <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Parchment with the third edge variant. Subtle but distinct.
        </p>
      </CraftCard>
    </>
  ),
}

export const AllVariantsShowcase: Story = {
  name: '✦ All Variants',
  render: () => (
    <>
      <CraftCard elevation="lg" style={{ width: 280 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.4rem', marginBottom: '0.4rem' }}>Cream (default)</h2>
        <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7, fontSize: '0.95rem' }}>elevation="lg"</p>
      </CraftCard>
      <CraftCard variant="kraft" lift="paste" style={{ width: 280 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.4rem', marginBottom: '0.4rem' }}>Kraft</h2>
        <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7, fontSize: '0.95rem' }}>lift="paste" — foam-dot depth</p>
      </CraftCard>
      <CraftCard variant="parchment" deckled={2} tint="yellow" style={{ width: 280 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '1.4rem', marginBottom: '0.4rem' }}>Parchment</h2>
        <p style={{ fontFamily: 'Caveat, cursive', lineHeight: 1.7, fontSize: '0.95rem' }}>deckled + tint="yellow"</p>
      </CraftCard>
    </>
  ),
}
