# Publishing the Craft UI agent skill (Cursor & Claude Code)

The **behavior** of the skill lives in one file: [`cursor-skills/craft-ui-library-usage/SKILL.md`](../cursor-skills/craft-ui-library-usage/SKILL.md). Everything else is packaging so users can install via npm, Cursor Marketplace, or Claude Code plugins.

## Cursor Marketplace

Cursor distributes **plugins** that can bundle [skills](https://cursor.com/docs/context/skills), rules, MCP servers, etc. There is no separate “skills-only store” — publishing means submitting a **plugin**.

This repo includes a plugin-shaped tree:

- [`../.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json) — marketplace manifest (multi-plugin layout).
- [`../plugins/kuboxx-craft-ui/`](../plugins/kuboxx-craft-ui/) — plugin with `skills/craft-ui-library-usage/SKILL.md` (symlink to the canonical skill).

**Reference:** [cursor/plugin-template](https://github.com/cursor/plugin-template) (validation script, checklist, layout).

**Submission:** [Publish a Cursor Marketplace plugin](https://cursor.com/marketplace/publish). The plugin-template README also mentions review via Slack / `kniparko@anysphere.com` — use whichever channel Cursor currently documents on the publish page.

**Checklist (typical):**

- Valid `plugins/kuboxx-craft-ui/.cursor-plugin/plugin.json` (`name`, `displayName`, `version`, `description`, `license`, `keywords`, `logo`).
- Skill folders under `plugins/kuboxx-craft-ui/skills/*/SKILL.md` with YAML `name` + `description`.
- `marketplace.json` `plugins[]` entries point at real `source` directories.
- Run the template’s `node scripts/validate-template.mjs` if you copy that script into this repo or validate in a fork of the template.

## Claude Code (official plugin marketplace)

Claude Code plugins use `.claude-plugin/plugin.json` and a `skills/` directory. Skills in a plugin are **namespaced**: `/plugin-name:skill-folder`.

This repo includes:

- [`../claude-plugin/kuboxx-craft-ui/`](../claude-plugin/kuboxx-craft-ui/)

**Docs:** [Create plugins](https://code.claude.com/docs/en/plugins), [Plugin marketplaces](https://code.claude.com/en/plugin-marketplaces), [Discover and install plugins](https://code.claude.com/en/discover-plugins).

**Submit to Anthropic’s marketplace (in-app forms):**

- [claude.ai/settings/plugins/submit](https://claude.ai/settings/plugins/submit)
- [platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit)

You’ll need a **git repository URL** (this repo or a fork) and a `.claude-plugin/plugin.json` that matches the **[plugin manifest schema](https://docs.claude.com/en/docs/claude-code/plugins-reference#plugin-manifest-schema)** (`name`, optional `version` / `description` / `author` / `homepage` / `repository` / `license` / `keywords`; default `skills/` is used—no custom path fields required).

**Local test:**

```bash
claude --plugin-dir ./claude-plugin/kuboxx-craft-ui
```

Then try: `/kuboxx-craft-ui:craft-ui-library-usage`

## Keeping packages in sync

| Channel | Artifact |
| --------|----------|
| npm `@kuboxx/craft-ui` | `cursor-skills/craft-ui-library-usage/` (in package `files`) |
| Cursor | `plugins/kuboxx-craft-ui/` |
| Claude Code | `claude-plugin/kuboxx-craft-ui/` |

Edit **`cursor-skills/craft-ui-library-usage/SKILL.md`** only; plugin copies are symlinks in git so marketplaces and npm stay aligned.

## npm vs marketplaces

- **npm** ships the skill for copy-into-`.cursor`/`.claude` workflows.
- **Marketplaces** ship one-click install for users who live in Cursor or Claude Code full-time.

All three can coexist; bump `version` in `package.json` and plugin manifests when you cut a release.
