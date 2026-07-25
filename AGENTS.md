# AGENTS

<!-- agent-guardrails:start -->
## Agent Guardrails (Required)
- Before specialist agents run, bootstrap the repo with `project-factory-init /absolute/path/to/repo`.
- Read `docs/agent/PIPELINE_INIT.md`, `docs/agent/CODEBASE_MAP.md`, and `docs/agent/GOLDEN_RULES.md` before implementation.
- Default to a split-thread model for medium and large work: main thread/session for intake, decomposition, and acceptance; separate builder threads/sessions for disjoint file scopes; separate verifier/reviewer threads/sessions for checks and evidence.
- Treat long Codex messages, voice-note transcripts, and PRD dumps as first-class intake. Save the raw context in `docs/agent/INTAKE_CONTEXT.md` before summarizing.
- Keep handoffs in repo docs instead of dragging one giant chat through the whole task.
- Keep `docs/agent/SPEC_SHEET.md` and `docs/agent/EVALS.md` aligned with the current scope and acceptance bar.
- Keep `docs/agent/SECURITY_GATES.md` current for app work. Every active app needs a Strix result or explicit preflight blocker before merge, release, or handoff.
- Treat `docs/agent/PATTERN_REGISTRY.md` as the source of truth for centralized patterns.
- Keep `docs/agent/AGENT_WORKSTREAMS.md` aligned with the current owner for each active work item.
- Keep `memory/project-memory.md` current when durable project facts or decisions change.
- Treat GitHub, Vercel, and Supabase as default tools for the source-control, deploy, and data slots, but preserve the slot contract if tools change.
- Do not bypass central modules for error handling, AI calls, or telemetry.
- Run `/Users/HP/bin/strix-security-gate` for active app security checks when Strix prerequisites are available; only scan owned or explicitly authorized targets.
- Run `lint:agent` (or equivalent ESLint run) before marking work complete.
- If architecture changes, update `docs/agent/CODEBASE_MAP.md` in the same change.
<!-- agent-guardrails:end -->
