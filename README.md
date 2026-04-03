# craft-ui

React UI primitives with a **craft-table** look: handmade **paper** surfaces, **rope-style** frames, and a saturated **crayon** palette.

## Install

```bash
npm install @kuboxx/craft-ui
```

Peer dependencies: `react` and `react-dom` (18+ or 19+).

## Storybook

Live preview: https://craft-ui.jheels.in/

## Agent skill (Cursor, Claude Code, …)

The npm tarball bundles the same **[Agent Skills](https://agentskills.io/)**-compatible folder so coding assistants get correct `@kuboxx/craft-ui` imports, the CSS entry, `CraftProvider`, and the component catalog. Format: `cursor-skills/craft-ui-library-usage/SKILL.md` (folder name is historical; the skill is not Cursor-only).

**After `npm install @kuboxx/craft-ui`**, copy `node_modules/@kuboxx/craft-ui/cursor-skills/craft-ui-library-usage` out of `node_modules` into the skills directory your tool uses (so it survives reinstalls and can be committed if you want).

### Cursor

```bash
mkdir -p .cursor/skills
cp -R node_modules/@kuboxx/craft-ui/cursor-skills/craft-ui-library-usage .cursor/skills/
```

Global: copy the same folder to `~/.cursor/skills/`. See [Cursor docs: Agent Skills](https://cursor.com/docs/context/skills).

### Claude Code

```bash
mkdir -p .claude/skills
cp -R node_modules/@kuboxx/craft-ui/cursor-skills/craft-ui-library-usage .claude/skills/
```

Global: copy to `~/.claude/skills/`. See [Claude Code docs: Skills](https://code.claude.com/docs/en/skills). Invoke with `/craft-ui-library-usage` or let Claude load it when the task matches the skill description.

### Other agents

If your tool supports Agent Skills, copy the `craft-ui-library-usage` directory into that product’s skills path (same layout: one folder containing `SKILL.md`).

### Cursor & Claude Code marketplaces

Both products list **plugins** (Cursor) or **plugins** with namespaced skills (Claude Code), not raw `SKILL.md` uploads. This repo ships ready-to-submit trees:

- **Cursor:** `plugins/kuboxx-craft-ui/` + root `.cursor-plugin/marketplace.json`
- **Claude Code:** `claude-plugin/kuboxx-craft-ui/`

Maintainer checklist, official submit URLs, and local tryout commands: **[docs/marketplace-publish.md](docs/marketplace-publish.md)**.

Contributors: canonical source in git is [`cursor-skills/craft-ui-library-usage/SKILL.md`](cursor-skills/craft-ui-library-usage/SKILL.md). This repo’s `.cursor/skills/craft-ui-library-usage/SKILL.md` is a symlink to that file for local Cursor development.

## Usage

Import the bundle (includes styles) and wrap your tree if you want the default theme hook:

```tsx
import { CraftProvider, CraftCard, CraftButton, RopeFrame } from '@kuboxx/craft-ui'
import '@kuboxx/craft-ui/styles.css'

export function App() {
  return (
    <CraftProvider>
      <RopeFrame>
        <CraftCard tint="yellow" elevation="lg">
          <CraftButton variant="clay" crayon="pink">
            Hello
          </CraftButton>
        </CraftCard>
      </RopeFrame>
    </CraftProvider>
  )
}
```

Load **Caveat** and **Kalam** (or set `--craft-font-display` / `--craft-font-marker`) for script + marker lettering. See Storybook’s [`.storybook/preview-head.html`](.storybook/preview-head.html).

### Scrapbook / handmade-card vibe

Use **`CraftProvider vibe="scrapbook"`** for sunnier yellow paper, stronger fiber grain, and twine-forward browns. Build garlands with **`CraftTwineGarland`** + **`CraftLetterChip`**, and **`CraftCard lift="paste"`** for the “square glued on the big sheet” depth. Utility **`.craft-paper-base`** is plain handmade paper without the default card shadow—good for full-bleed card backgrounds.

See the **Scrapbook birthday vibe** story in Storybook.

### Phase 2 — surfaces & layout

| Export | Purpose |
|--------|---------|
| `StickyNote` | Neon square note, peel-style shadow, `rotate` + `color` |
| `WashiStrip` | Torn-edge tape strip; `pattern`, `tint` |
| `CraftTag` | Teal–peach gradient label (`--craft-tag-gradient`) or `paper` variant |
| `CrayonDivider` | Wavy horizontal rule |
| `CraftSketchUnderline` | Marker underline under inline text (straight line if `prefers-reduced-motion`) |
| `WatercolorPanel` | Soft wash backgrounds (`wash`: sunset / candy / sea) |
| `GlitterAccent` | Sparkle badge chip |
| `TissuePanel` | Frosted crinkled overlay |

Storybook: **Craft → Phase 2 surfaces** (`Catalog`, `InRopeFrame`).

### Phase 3 — forms

| Export | Purpose |
|--------|---------|
| `CraftLabel` | Marker-style label; optional `required` star |
| `CraftInput` / `CraftTextarea` | Paper inset fields; crayon focus ring (`.craft-input-field`) |
| `CraftCheckbox` | Chunky eraser-style box + check |
| `CraftRadio` | Hatched square + centered circle; orange fill when selected; shared `name` |
| `CraftRadioGroup` | `role="radiogroup"` + optional `label` |
| `CraftSwitch` | Clay thumb; controlled or `defaultChecked` |
| `CraftSelect` | Native `<select>` + chevron |

Storybook: **Craft → Phase 3 forms** (`FieldShowcase`).

### Phase 4 — navigation

| Export | Purpose |
|--------|---------|
| `CraftTabs` | `items[]` with `value` / `label` / `content` / optional `disabled`; sticky-lift active tab; arrows, Home, End |
| `CraftBreadcrumb` | `nav[aria-label]` wrapper |
| `CraftBreadcrumbList` | `<ol>` |
| `CraftBreadcrumbItem` | `<li>` |
| `CraftBreadcrumbLink` | crumb link |
| `CraftBreadcrumbPage` | current page (`aria-current="page"`) |
| `CraftBreadcrumbSeparator` / `CraftBreadcrumbSepLi` | dot separator (use `SepLi` between items) |

Storybook: **Craft → Phase 4 navigation**.

### Phase 5 — overlays & feedback

| Export | Purpose |
|--------|---------|
| `CraftTooltip` | Hover / focus-within tag above or below trigger |
| `CraftPopover` | Click toggle anchored panel; outside click + Escape |
| `CraftDialog` | Native `<dialog showModal>` paper sheet; scrim + footer slot |
| `CraftAlert` | Banner; `tone`, optional `live` → `role="alert"` |
| `CraftToast` | Portal’d sticky-note toast; `duration`, dismiss |
| `CraftProgress` | Determinate bar; `value` / `max`, `crayon` fill |
| `CraftSpinner` | Indeterminate arc; `prefers-reduced-motion` safe |
| `CraftSkeleton` | Paper + noise pulse placeholder |

Storybook: **Craft → Phase 5 overlays**.

### Phase 6 — data display

| Export | Purpose |
|--------|---------|
| `CraftList` / `CraftListItem` | `marker`: pushpin, dot, numbered, or `none` (for custom leading art); optional `ordered` → `<ol>` |
| `CraftPaperClip` | Gem-style vertical clip SVG; `tone` (crayons + `silver`), `size`; 3D gradient wire |
| `CraftAvatar` | `src` or `fallback` initials; `size`, `shape`, `crayon` wash; paper ring |
| `CraftTable` + `CraftTableHeader` / `Body` / `Footer` / `Row` / `CraftTableHeadCell` / `CraftTableCell` / `CraftTableCaption` | Paper-wrapped table, striped body rows |

Storybook: **Craft → Phase 6 data display**.

### Tailwind in your app

This library ships **CSS** (`@kuboxx/craft-ui/styles.css`) built with Tailwind utility classes. If your app uses Tailwind too, either:

- Rely on the prebuilt CSS only (no extra config), or
- A separate `@import` of `dist/craft-ui.css` is not needed—the `styles.css` export points at the same file. Extend your `tailwind.config` `content` to include `./node_modules/@kuboxx/craft-ui/dist/**/*.js` only if you need to safelist or purge alongside custom builds (advanced).

Design tokens live under `:root` in the stylesheet (`--craft-paper`, `--craft-orange`, etc.).

## Development

Phase **3 (forms)** is queued for a **revisit** (craft styling, accessibility, API) — tracked in the workspace todo list.

```bash
npm install
npm run storybook
npm run build
```

## License

MIT
