# pnpm + emberquest-map-data Local Link Design

**Date:** 2026-06-26

## Goal

Get both repos onto pnpm, wire `emberquest-map-data` as a GitHub-sourced dependency for Netlify builds, and enable fast local development via `pnpm link`.

## Scope

- `emberquest` — main Ember app (already on pnpm 11.1.3, Ember 3.28)
- `emberquest-map-data` — plain package containing tile data JS files, consumed via dynamic `import('emberquest-map-data/tiledata/<name>')` through `ember-auto-import`

## emberquest-map-data Changes

1. Add `"packageManager": "pnpm@11.1.3"` to `package.json`
2. Remove `addon/` and `app/` directories — these re-export from a backup test map and are not used by the main app
3. Keep `tiledata/`, `index.js`, `package.json`
4. Run `pnpm install` to generate `pnpm-lock.yaml`

## emberquest Changes

1. Change the `emberquest-map-data` dependency from the npm version pin to the GitHub source:
   ```json
   "emberquest-map-data": "github:DanMonroe/emberquest-map-data"
   ```
2. Run `pnpm install` to update `pnpm-lock.yaml`
3. Add local dev instructions to `CLAUDE.md`

## Local Development Workflow

Use `pnpm link` to point the main app at the local map-data repo during development:

```bash
# From emberquest directory — use local map data
pnpm link ../emberquest-map-data

# Restore GitHub version
pnpm unlink emberquest-map-data && pnpm install
```

The link creates a symlink in `node_modules/emberquest-map-data` → `../emberquest-map-data`. Changes to local tiledata files are picked up immediately without any publish or push step.

## Netlify Build

Netlify has no access to the local filesystem, so `pnpm link` cannot be active during CI/deploy. With the GitHub reference, Netlify clones `emberquest-map-data` directly from `github:DanMonroe/emberquest-map-data` at build time.

**Deploy workflow:**
1. Edit map data → commit and push `emberquest-map-data` to GitHub
2. Push `emberquest` → Netlify build clones latest map-data from GitHub automatically

## What Is Not Changing

- `emberquest` Ember version — already at `~3.28.0`
- `ember-auto-import` dynamic import pattern in `app/services/map.js`
- Netlify config
- Any game logic
