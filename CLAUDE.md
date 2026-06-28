# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start                    # Serves at http://localhost:4400 (FastBoot disabled)
ember serve                  # Default serve at http://localhost:4200

# Testing
ember test                   # Run all tests
ember test --server          # Test server with live reload
ember test --filter "name"   # Run a single test by name

# Linting
npm run lint:hbs             # Lint Handlebars templates
npm run lint:js              # Lint JavaScript
npm run lint:js -- --fix     # Auto-fix lint issues

# Building
ember build                          # Development build
npm run build                        # Production build

# Asset generation
npm run audio                # Regenerate audio sprite from emberquest_work/sprites_audio/
npm run music                # Regenerate music sprite from emberquest_work/sprites_music/
```

## Local Map Data Development

`emberquest-map-data` is resolved from `github:DanMonroe/emberquest-map-data` for Netlify builds.
To work on map data locally without pushing to GitHub first:

```bash
# From the emberquest directory — use local map data
pnpm link ../emberquest-map-data

# Restore GitHub version when done
pnpm unlink emberquest-map-data && pnpm install
```

Map data edits in `../emberquest-map-data/tiledata/` are picked up immediately after linking.

## Architecture Overview

**EmberQuest** is a hex-tile RPG built with Ember Octane (v3.28) as the shell and Phaser 3 as the game engine. The two frameworks are deliberately bridged: Ember owns the UI layer (modals, dialogs, routing), while Phaser owns the canvas/game loop. They communicate through a shared `ember` reference injected onto the Phaser `game` instance (`scene.game.ember`).

### Routes

- `/` — index/landing
- `/play` — the game (accepts query params: `map`, `x`, `y`, `debug`, `level`, `gold`, `speed`, `selfhelp`, `resetcache`, `dan`)
- `/editor` — map editor
- `/cachepage` — geocache detail page

### Service Layer (Ember)

The core game logic lives in `app/services/`:

| Service | Responsibility |
|---|---|
| `game` | Central orchestrator — scene save/load, teleport, portal/chest/agent logic, player movement processing |
| `game-manager` | Player stats, sound, pause state, game clock, scene reference |
| `map` | Dynamic map loading (lazy imports keyed by map name), FOV/tile queries |
| `inventory` | Inventory item definitions and equipped-item stat calculations |
| `spawner` | Periodic agent/transport spawning using ember-concurrency tasks |
| `agent-pool` / `transport-pool` | Registries of available agent and transport types |
| `cache` | Geocache definitions and found-state tracking |
| `storage` | Encrypt/decrypt via `simple-crypto-js` (used for save data and "Fix It" commands) |
| `modals` | `ember-elsewhere`-based modal system |
| `messages` | Tracks which in-game messages the player has seen |
| `constants` | Frozen object of all game constants — tile layers (TILEZ_*), flags, states, special actions, inventory types |

### Phaser Layer (`app/phaser/`)

- **Scenes**: `BootScene` (asset loading) → `GameboardScene` (main game loop). Scenes access Ember services via `this.ember` (`scene.game.ember`).
- **Agent containers** (`phaser/agents/`): `BasePhaserAgentContainer` → `PlayerContainer`, `AgentContainer`, `TransportContainer`. These are Phaser `GameObjects.Container` subclasses placed on the board.
- **World objects**: `Chest`, `Door`, `SignPost`, `BaseImage` — Phaser display objects representing map interactables.
- **Groups**: `Projectiles` / `Projectile` for ranged combat.

### Data Models (`app/objects/models/`)

Plain JS classes (not Ember Data models) representing game entities: `Agent`, `Transport`, `InventoryItem`, `Stat`, `Resistance`, `Cache`. Static data lives in `app/models/data/inventory.js` and `app/models/data/caches.js`.

### Map Data

Maps are loaded on demand from the `emberquest-map-data` npm package (`app/services/map.js`). Each map key (e.g. `'m1'`, `'castle'`, `'cave1'`) maps to a dynamic import. Map data defines tile layout, spawn locations, portals, and special tile attributes.

### Save System

Game state is persisted to `localforage` (IndexedDB/localStorage). Keys: `playerAttrs`, `playerTile`, `previousTile`, `currentMap`, `sceneData`, `transports`, `caches`, `settings`, `gamestats`. Player stats (`xp`, `health`, `power`, `gold`) are encrypted before storage. The "Fix It" / "Self Help" feature in the config dialog accepts an encrypted JSON command string to teleport, grant items, or adjust player state.

### Ember–Phaser Bridge

The `gameboard` component (`app/components/gameboard.js`) instantiates the Phaser `Game` and assigns the Ember service context to `game.ember`. Phaser scenes then call back into Ember services (e.g. `scene.game.ember.foundChest(...)`, `scene.game.ember.gameManager.pauseGame(...)`). Glimmer `@tracked` properties on services drive reactive UI updates outside the canvas.
