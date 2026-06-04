# Project Memory

Use this file for durable project context that should survive session resets.
Treat this as append-oriented working memory for the software factory.

## Identity
- Project:
- Repo path:
- Product surface:
- Source ticket / message:
- Delivery target:

## Tool Slots
- Source control:
- Deploy:
- Data:
- Observability:
- Identity and secrets:

## Decisions
- 

## Append-Only Log
- Timestamp: 2026-03-31T04:59:08Z
  - Agent: Codex
  - Change: Dependency hardening sweep pinned exact top-level versions in the root, `server`, and `daemon` packages, added `save-exact=true` in each package, and refreshed the npm lockfiles.
  - Evidence: Root/server exact versions came from `npm ls --depth=0 --json`; daemon exact versions came from the committed `package-lock.json`; `npm install --package-lock-only --ignore-scripts --no-audit --no-fund` completed for each package.

## Active Workstreams
- 

## Open Questions
- 

## Risks
- 

## References
- Related tickets:
- Related docs:
