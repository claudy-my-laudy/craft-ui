# Kuboxx Craft UI (Claude Code plugin)

[Claude Code plugin](https://code.claude.com/docs/en/plugins) wrapping the same Agent Skill as the npm package and Cursor plugin.

- Manifest: `.claude-plugin/plugin.json`
- Skill: `skills/craft-ui-library-usage/SKILL.md` → symlink to `../../../cursor-skills/craft-ui-library-usage/SKILL.md`

After installation, the skill is invoked as **`/kuboxx-craft-ui:craft-ui-library-usage`** (plugin namespace + skill folder name).

## Local tryout

```bash
claude --plugin-dir ./claude-plugin/kuboxx-craft-ui
```

## Publish

See [docs/marketplace-publish.md](../../docs/marketplace-publish.md).
