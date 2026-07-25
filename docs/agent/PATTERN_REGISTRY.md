# Pattern Registry

Use this table to define centralized architecture patterns and enforce them with lint rules.

| Pattern | Central Module | Rule(s) |
|---|---|---|
| Error system | `errors/appError.ts` (`normalizeError`, `toClientError`) | `guardrails/no-raw-error-throw`, `guardrails/no-direct-trpc-error`, `guardrails/no-raw-apperror-in-router` |
| Unified AI layer | `ai/client/unified.ts` (`ai.stream`, `ai.complete`, `ai.embed`, `withSpan`) | `guardrails/no-direct-llm-calls`, `guardrails/no-direct-telemetry`, `guardrails/no-hardcoded-ai-model` |

## Rule Wiring
- Put central-module paths in `eslint.agent-guardrails.cjs` options.
- Keep options aligned with this table.
- If a new pattern is added, add at least one lint rule for it.
