# Pipeline Init

This file records the factory setup that should exist before specialized agents run.
GitHub, Vercel, and Supabase are current defaults for the source-control, deploy,
and data slots, but the framework matters more than the vendor.

## Factory Goal
- Ticket in, deployed app out.
- Default intake is a long Codex context file, a Linear ticket, or an inbound message delivered by webhook.
- Pipeline init happens before specialist agents do deeper work.

## Slot Contract
- Source control slot: versioned repo home and collaboration surface.
- Deploy slot: runtime or hosting project for previews and production.
- Data slot: primary database or backend service.
- Memory slot: durable context in `memory/project-memory.md`.
- Agent workstreams slot: one active owner per work item in `docs/agent/AGENT_WORKSTREAMS.md`.
- Security gate slot: Strix evidence or explicit preflight blocker in `docs/agent/SECURITY_GATES.md`.

## Default Pipeline Init Actions
- Create or verify the repo home for the app.
- Create or verify the deploy target project.
- Create or verify the primary database/backend project.
- Create the project memory file.
- Create the agent workstream map so ownership is explicit before fan-out.
- Create the app security gate file so Strix status is explicit before merge, release, or handoff.

## The 11 Building Blocks
- Record: the tracked source of truth for work in flight.
- Shared memory: append-only project context and references.
- Orchestrator: the decision-maker that routes and retries work.
- Execution environment: sandbox, container, or hosted runtime where work runs.
- Agent runtime: Claude Code, Codex, or another code generator.
- Integration layer: how agents talk to tools and APIs.
- Quality assurance: human gates and automated checks.
- Delivery target: the place the app is deployed.
- Observability: traces, logs, and audit history.
- Skills: domain knowledge encoded for repeatable work.
- Identity and secrets: authentication, authz, and secret handling.

## Current Status
- Source control
  - Default tool: GitHub
  - State: `configured`
  - Evidence: `GitHub origin: https://github.com/njerschow/textme.git`
- Deploy
  - Default tool: Vercel
  - State: `missing`
  - Evidence: `no deploy slot detected`
- Data
  - Default tool: Supabase
  - State: `missing`
  - Evidence: `no data slot detected`
- Memory
  - State: `configured`
  - Evidence: `memory/project-memory.md`
- Agent workstreams
  - State: `configured`
  - Evidence: `docs/agent/AGENT_WORKSTREAMS.md`
- Security gate
  - State: `configured`
  - Evidence: `docs/agent/SECURITY_GATES.md`

## Delivery Flow
- Intake -> spec -> architecture -> implementation -> review -> Strix/security gate -> test -> deploy.
- The orchestrator may fan work out in parallel only after file ownership and workstream boundaries are explicit.
- Memory is append-oriented. Do not silently rewrite prior agent history.

## Threading Model
- Keep the main orchestration thread or session focused on intake, decomposition, acceptance criteria, and integration decisions.
- Split medium and large work into separate builder threads or sessions with explicit file ownership and bounded prompts.
- Keep testing, review, browser checks, and acceptance validation in separate verifier or reviewer threads or sessions when feasible.
- Store handoffs in `docs/agent/AGENT_WORKSTREAMS.md`, `docs/agent/SPEC_SHEET.md`, `docs/agent/EVALS.md`, and `memory/project-memory.md` instead of relying on one giant conversation.
- Tiny, low-risk, single-file tasks may stay in one thread or session when the coordination overhead would outweigh the benefit.

## Gate
- Do not start deeper multi-agent execution until every slot is either configured or explicitly deferred here with a reason.
- Do not treat active app work as ready until Strix has run or the preflight blocker and fallback checks are recorded.
- If a different vendor is used, preserve the slot semantics and update the evidence instead of changing the framework.
- If work enters through webhook, record the source ticket or message in `memory/project-memory.md` before coding starts.
