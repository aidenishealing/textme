# Agent Workstreams

Keep one active owner per work item. If ownership changes, update this file in the same change.
Follow a one-owner-at-a-time rule for both work items and locked files.

## Threading Rule
- For medium and large tasks, keep orchestration, implementation, verification, and review in separate threads, channels, or sessions.
- Main orchestration thread or session owns intake, decomposition, acceptance criteria, and integration decisions.
- Builder threads or sessions own only their scoped files.
- Verifier and reviewer threads or sessions own evidence, findings, and acceptance checks.
- Record handoffs here and in repo docs instead of relying on one long conversation.

## Default Workstreams
- Intake and record
  - Owner: factory webhook / orchestrator
  - Input: long Codex context file, voice transcript, Linear ticket, or inbound message from Telegram, iMessage, or WhatsApp
  - Output: tracked source-of-truth record and repo bootstrap
- PM spec
  - Owner: PM agent / `spec-writing` skill
  - Input: Linear ticket or equivalent issue
  - Output: problem statement, success criteria, scope boundaries, edge cases
- Architecture
  - Owner: architect
  - Input: PM spec + codebase map
  - Output: technical approach, call paths, risk notes
- Implementation
  - Owner: builder / coding agent
  - Input: approved spec + architecture
  - Output: code changes
- Verification
  - Owner: verifier / test runner
  - Input: implementation diff + success criteria
  - Output: test, lint, typecheck, and UX evidence
- Code review
  - Owner: reviewer
  - Input: implementation diff + repo rules
  - Output: findings, fixes, and approval status
- Deployment
  - Owner: deploy agent
  - Input: reviewed branch + environment config
  - Output: deployed target, logs, and release status
- Observability
  - Owner: orchestrator / telemetry agent
  - Input: pipeline events, traces, and deploy logs
  - Output: audit trail, trace links, and retry context
- Platform
  - Owner: factory bootstrapper
  - Input: repo path + environment setup
  - Output: source-control slot, deploy slot, data slot, and project memory status

## Active Assignments
- Work item:
  - Owner:
  - Status:
  - Notes:
