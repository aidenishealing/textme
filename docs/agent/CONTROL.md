# CONTROL

This is the compact operator panel for the active goal. It lets Aiden or a
sidecar reviewer steer the main agent while the goal is running without
rewriting the goal itself.

## Status Contract
status_file: GOAL_LOOP.md
attempt_log: GOAL_LOOP.md
durable_notes: GOAL_LOOP.md
nudge_file: SIDECAR_NUDGES.md
review_queue_file: SIDECAR_NUDGES.md
check_control_before:
- phase_change
- strategic_pivot
- expensive_step
- completion_claim
sidecar_apply_cadence:
- after_failed_check
- before_phase_change
- before_completion_claim

## Human Priorities
primary_priority: truth
secondary_priority: correctness
protected_priority: safety_and_security

## Scope Knobs
allowed_files:
- current goal scope

protected_files:
- secrets
- credentials
- unrelated user work
- conversation/session/archive/history data

max_blast_radius: smallest verified scope that satisfies the goal

## Resource Knobs
max_runtime_per_step: use judgment; pause before expensive or runaway work
max_parallel_jobs: use the smallest useful number
network_allowed: task-dependent; verify current sources when facts may drift
external_api_allowed: task-dependent; do not spend money or change accounts without approval

## Decision Gates
require_approval_for:
- strategic_pivot
- destructive_change
- dependency_change
- schema_or_migration_change
- public_api_change
- public_deploy_or_network_exposure
- scope_expansion
- paid_resource_or_financial_action
- legal_tax_medical_or_compliance_judgment

## Sidecar Inputs
sidecar_enabled: true
nudge_file: SIDECAR_NUDGES.md
human_overlay_file: SIDECAR_NUDGES.md
review_queue_file: SIDECAR_NUDGES.md
sidecar_apply_cadence: after_failed_check, before_phase_change, before_completion_claim

Main agent rule: reread this file and `SIDECAR_NUDGES.md` before each phase
change, after any failed verification, before any expensive step, and before
claiming completion. Apply evidence-backed nudges that preserve the goal's
done criteria and safety gates. If a nudge is not applied, record the reason in
`SIDECAR_NUDGES.md`.

Sidecar reviewer rule: check real artifacts, commands, screenshots, runtime
behavior, or source files before nudging. Keep nudges small, evidence-backed,
and tied to the goal's done criteria.

## Latest Human Nudge
None yet.
