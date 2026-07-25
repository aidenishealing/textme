# ESLint Guardrails Integration

## Step 1: Install dependencies if missing

```bash
npm i -D eslint
```

## Step 2: Keep the generated files
- `tools/eslint-plugin-agent-guardrails.cjs`
- `eslint.agent-guardrails.cjs`

## Step 3: Integrate with your root ESLint config

If using flat config (`eslint.config.js`/`mjs`/`cjs`), append:

```js
const guardrailsConfig = require('./eslint.agent-guardrails.cjs');
module.exports = [
  // ...existing config,
  ...guardrailsConfig,
];
```

If using legacy `.eslintrc.*`, copy the `rules` section from `eslint.agent-guardrails.cjs`
into your existing config and load the local plugin from `tools/eslint-plugin-agent-guardrails.cjs`.

## Step 4: Add script

```json
{
  "scripts": {
    "lint:agent": "eslint . --ext .js,.cjs,.mjs,.ts,.tsx"
  }
}
```

## Step 5: Keep it strict
- Do not disable these rules globally.
- If exceptions are required, use narrow inline disables with a justification comment.
