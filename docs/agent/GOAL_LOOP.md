# Goal Loop Record Template

Copy this into the repo or workspace before a non-trivial workstream grows. Prefer repo-local paths such as `docs/agent/GOAL_LOOP.md` or `memory/goal-loop.md`. For global/local-agent work, keep the record under `/Users/HP/.codex/context/`.

## Target
What must become true:

## Done Evidence
- Evidence item:
- Command, runtime check, artifact, or source proving it:
- Scope covered:

## Current State
- Initialized by: `goal-loop-init`
- Initialized at: 2026-07-02 08:49:02 EDT
- Workspace: `/Users/HP/dev/10_active/textme-root`
- Verified from:
- Current status:
- Known gaps:

## Loop
1. Lock the next target slice.
2. Read the real files, docs, tools, runtime, primary sources, or current artifacts.
3. Execute the smallest meaningful change.
4. Verify on the real surface.
5. Reread `CONTROL.md` and `SIDECAR_NUDGES.md`; apply evidence-backed sidecar nudges that preserve the goal.
6. Security/safety review.
7. Fix failures.
8. Persist state, evidence, mistakes, sidecar responses, and next gap.
9. Repeat until done or a real escalation is required.

## Sidecar Review
- Control surface: `docs/agent/CONTROL.md`
- Nudge queue: `docs/agent/SIDECAR_NUDGES.md`
- Main agent reads both files before phase changes, after failed verification, before expensive steps, and before claiming completion.
- Sidecar reviewers check real artifacts, commands, screenshots, runtime behavior, or source files before nudging.
- Nudges may tighten quality, point to missed evidence, or redirect the next slice; they cannot silently weaken done evidence, scorecards, security gates, or user-approved scope.

## App/User-Story Tracker
Use `/Users/HP/.codex/context/web-app-user-story-tracker-template.csv` when the work is an app, website, dashboard, extension, or product surface.

## Research/Experiment Queue
Use `/Users/HP/.codex/context/research-experiment-queue-template.csv` when the work is research, ML experiments, pruning/merging, benchmarking, or continuous compute queues.

## Escalation
Ask Aiden only for:

- credentials or new account access
- paid installs, cloud spend, or financial actions
- device pairing, unlock, trust prompts, QR scans, or permission grants
- legal, tax, medical, compliance, or irreversible judgment calls
- destructive data changes
- public deployment or network exposure changes
- real product/research direction that cannot be inferred after discovery

## Completion Audit
Before claiming done:

- Every explicit requirement is mapped to direct evidence.
- Every named artifact exists or is explicitly ruled out.
- Tests/checks cover the claimed scope.
- Runtime or rendered behavior is verified when behavior matters.
- `CONTROL.md` and `SIDECAR_NUDGES.md` have been reread, and any unresolved sidecar nudge is applied, deferred with reason, or escalated.
- Security/safety gates are checked or marked not applicable.
- Remaining gaps are either closed or documented as true blockers.
