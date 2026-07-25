# Evals

Use this file to define what the factory must check before build, before merge,
and before deploy.

## Intake -> Spec Eval
- Raw intake captured in `docs/agent/INTAKE_CONTEXT.md`
- Product, user, V1, and delivery target are explicit
- Unknowns are called out instead of guessed

## Spec Quality Gate
- Problem statement is concrete
- Success criteria are testable
- Scope boundaries clearly separate in-scope from non-goals
- Edge cases cover empty, failure, permission, and retry behavior

## Build Eval
- Happy path works
- Primary user flow matches the spec
- Required data is persisted or returned correctly
- Empty and failure states are handled
- No obvious auth, injection, or secret-leak issues

## Review Eval
- Diff stays inside the agreed scope
- No parallel implementation of central modules
- New files follow the repo's architecture map and pattern registry
- Verification evidence exists for claims in the PR or handoff

## Strix Security Gate
- App work has a current Strix result or an explicit preflight blocker
- PR or branch-change gate: `/Users/HP/bin/strix-security-gate --target ./ --mode quick --diff-base origin/main`
- Weekly or milestone gate: `/Users/HP/bin/strix-security-gate --target ./ --mode standard`
- Release or critical-change gate: `/Users/HP/bin/strix-security-gate --target ./ --mode deep`
- Findings are fixed, retested, or recorded as accepted risk with a named approver

## Deploy Eval
- Required env vars are documented
- Health check or smoke path works
- Observability hooks are configured or explicitly deferred
- Rollback path is known

## Human Gate
- Approver:
- Decision:
- Notes:
