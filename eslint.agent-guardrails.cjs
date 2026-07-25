"use strict";

const guardrails = require("./tools/eslint-plugin-agent-guardrails.cjs");

module.exports = [
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx}"],
    plugins: {
      guardrails,
    },
    rules: {
      "guardrails/no-raw-error-throw": [
        "error",
        {
          allowedConstructors: ["AppError"],
        },
      ],
      "guardrails/no-direct-trpc-error": [
        "error",
        {
          allowedFileGlobs: ["**/errors/appError.*"],
        },
      ],
      "guardrails/no-raw-apperror-in-router": [
        "error",
        {
          routerFileGlobs: ["**/router/**", "**/routers/**", "**/*.router.*"],
        },
      ],
      "guardrails/no-direct-llm-calls": [
        "error",
        {
          allowedFileGlobs: ["**/ai/client/unified.*"],
        },
      ],
      "guardrails/no-direct-telemetry": [
        "error",
        {
          allowedFileGlobs: ["**/ai/client/unified.*", "**/telemetry/**"],
        },
      ],
      "guardrails/no-hardcoded-ai-model": [
        "error",
        {
          allowedFileGlobs: ["**/ai/client/unified.*"],
        },
      ],
    },
  },
];
