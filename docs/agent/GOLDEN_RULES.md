# Golden Rules

Project-specific rules that must not be violated.

## API and Architecture
- Keep endpoint shape consistent.
- Reuse central modules for cross-cutting concerns.

## Security
- Validate all user input at boundaries.
- No secrets in code or logs.
- No direct external calls from forbidden layers.

## Agent Constraints
- Read `docs/agent/CODEBASE_MAP.md` before edits.
- Follow `docs/agent/PATTERN_REGISTRY.md` for central-module rules.
- If unsure, add a TODO with exact file path and assumption.
