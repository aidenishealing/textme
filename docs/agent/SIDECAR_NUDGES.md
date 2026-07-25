# SIDECAR_NUDGES

Use this queue for human or sidecar-agent feedback while the main goal runs.
The sidecar checks real results and adds nudges here; the main agent rereads
this file at the cadence defined in `CONTROL.md`.

## How To Use
- Reviewer adds one row per nudge with concrete evidence.
- Main agent marks the response after applying, deferring, or rejecting it.
- Nudges may tighten quality, point to missed evidence, or redirect the next
  phase; they must not silently weaken `GOAL_LOOP.md` done evidence.
- Anything requiring approval stays blocked until Aiden approves it.

## Nudge Queue

| Time | Reviewer | Evidence Checked | Nudge | Priority | Main Agent Response |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Applied Notes

- None yet.
