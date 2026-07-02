# Codebase Map

Update this file when architecture changes.

## Core Paths
- `daemon/src/`: local daemon entrypoint and helpers for session/audit/config/database/sendblue work.
- `daemon/src/index.ts`: daemon runtime entrypoint.
- `daemon/src/claude-session.ts`: Claude session handling.
- `daemon/src/db.ts`: daemon database boundary.
- `daemon/src/sendblue.ts`: Sendblue integration boundary.
- `server/src/`: server runtime entrypoint and shared service code.
- `server/src/index.ts`: server entrypoint.
- `server/src/db.ts`: server database boundary.
- `server/src/sendblue.ts`: server-side Sendblue integration boundary.
- `commands/`, `resources/`, `skills/`, and `scripts/`: support assets and operator tooling.

## Critical Flows
- Request flow: server entrypoint in `server/src/index.ts`; daemon flow starts at `daemon/src/index.ts`.
- Auth flow: none documented in the local map; verify the entrypoint before changing auth behavior.
- Error flow: local daemon/server handling; no central error module found.
- AI flow: Claude session handling in `daemon/src/claude-session.ts`.

## Ownership
- Error system owner: daemon/server entrypoint owners.
- AI system owner: `daemon/src/claude-session.ts`.
- Auth owner: none documented.

## Notes
- Keep this file short and factual.
- Prefer file paths and call chains over prose.
