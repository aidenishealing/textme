# Security Gates

Use this file to record app security checks before merge, release, or handoff.

Canonical global runbook: `/Users/HP/.codex/context/strix-app-security-gate.md`

## Required App Gate

Every app should have a current Strix result or an explicit Strix preflight blocker before it is treated as ready.

## Cadence

- Pull request or meaningful branch change: `quick`
- Weekly or milestone review: `standard`
- Major release, public launch, auth/data/payment change, or critical handoff: `deep`

## Preferred Commands

```bash
/Users/HP/bin/strix-security-gate --target ./ --mode quick --diff-base origin/main
/Users/HP/bin/strix-security-gate --target ./ --mode standard
/Users/HP/bin/strix-security-gate --target ./ --target https://staging.example.com --mode deep
```

Only include deployed/staging targets that are owned or explicitly authorized for testing.

## Latest Result

- Date:
- Agent:
- Mode:
- Targets:
- Command:
- Exit code:
- Artifact path:
- Summary:
- Follow-up:

## Preflight Blocker

Use this only when Strix cannot run yet.

- Missing prerequisite:
- Verified by:
- Temporary fallback checks:
- Rerun trigger:

## Boundaries

- No real credentials in committed instruction files.
- Treat `strix_runs/` and reports as sensitive by default.
- Do not auto-apply generated fixes without review, tests, and security checks.
