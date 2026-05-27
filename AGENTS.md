# AGENTS

## Repo shape
- This is a single-package Obsidian plugin (no monorepo): source in `src/`, bundle output is `main.js`, metadata in `manifest.json`.
- Real plugin entrypoint is `src/index.ts` (`ThingsLogbookPlugin`), wired into Obsidian via `manifest.json` + bundled `main.js`.
- Core flow is: query Things SQLite (`src/things.ts` + `src/sqlite.ts`) -> render markdown (`src/renderer.ts`) -> replace/append daily note section (`src/textUtils.ts`).

## Commands that matter
- Install deps: `npm install`.
- Lint: `npm run lint`.
- Build (what CI/release uses): `npm run build` (script runs lint first, then Rollup).
- Fast local build when lint noise is blocking: `npm run build:nolint`.

## Verified gotchas
- Plugin is intentionally desktop/mac focused: `manifest.json` has `isDesktopOnly: true` and runtime guard in `src/index.ts` skips load on non-Mac (`isMacOS()`).
- Things DB path is hardcoded for macOS group container in `src/constants.ts`; sync depends on `sqlite3` CLI availability (`spawn("sqlite3", ...)` in `src/sqlite.ts`).
- Sync is incremental via `latestSyncTime`; resetting it to `0` in settings triggers full backfill/rewrite behavior.
- Batch fetching relies on `TASK_FETCH_LIMIT = 1000` pagination loops in `src/things.ts`; be careful changing limit/loop stop logic.

## CI and release reality
- CI workflow (`.github/workflows/main.yml`) runs `npm install`, `npm run lint`, then `npm run test --if-present`.
- `package.json` currently has no `test` script; do not assume tests exist unless you add/fix that script.
- Release workflow (`.github/workflows/publish.yml`) builds and publishes `main.js`, `manifest.json`, and a zip folder named `things-logbook`.
- Keep versions aligned when releasing: `package.json` version, `manifest.json` version, and `versions.json` compatibility map.
