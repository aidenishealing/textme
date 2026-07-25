"use strict";

function normalizePath(filePath) {
  return String(filePath || "").replace(/\\\\/g, "/");
}

function escapeRegex(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
}

function globToRegex(glob) {
  const normalized = normalizePath(glob);
  const tokenized = normalized
    .replace(/\*\*/g, "__DOUBLE_STAR__")
    .replace(/\*/g, "__SINGLE_STAR__");
  const escaped = escapeRegex(tokenized)
    .replace(/__DOUBLE_STAR__/g, ".*")
    .replace(/__SINGLE_STAR__/g, "[^/]*");
  return new RegExp(`^${escaped}$`);
}

function matchesGlobs(filePath, globs) {
  const normalized = normalizePath(filePath);
  return (globs || []).some((glob) => globToRegex(glob).test(normalized));
}

function isInAllowedFile(context, allowedFileGlobs) {
  return matchesGlobs(context.getFilename(), allowedFileGlobs || []);
}

function report(context, node, message) {
  context.report({ node, message });
}

const defaultLlmImportPatterns = [
  "openai",
  "anthropic",
  "@anthropic-ai/sdk",
  "@google/generative-ai",
  "ollama",
  "mistralai",
  "deepseek",
];

const defaultTelemetryImportPatterns = [
  "@sentry",
  "posthog",
  "datadog",
  "@opentelemetry",
  "newrelic",
];

module.exports = {
  rules: {
    "no-raw-error-throw": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow throwing raw Error; enforce centralized app errors.",
        },
        schema: [
          {
            type: "object",
            properties: {
              allowedConstructors: {
                type: "array",
                items: { type: "string" },
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const allowed = new Set(options.allowedConstructors || ["AppError"]);

        return {
          ThrowStatement(node) {
            const arg = node.argument;
            if (!arg || arg.type !== "NewExpression") {
              return;
            }
            if (arg.callee.type !== "Identifier") {
              return;
            }

            const ctor = arg.callee.name;
            if (ctor === "Error") {
              report(
                context,
                node,
                "Throw AppError (or project wrapper), not raw Error."
              );
            }
            if (!allowed.has(ctor) && ctor !== "Error") {
              report(
                context,
                node,
                `Throwing '${ctor}' bypasses centralized error normalization.`
              );
            }
          },
        };
      },
    },

    "no-direct-trpc-error": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow direct TRPCError usage outside central error module.",
        },
        schema: [
          {
            type: "object",
            properties: {
              allowedFileGlobs: {
                type: "array",
                items: { type: "string" },
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const allowed = options.allowedFileGlobs || ["**/errors/appError.*"];

        if (isInAllowedFile(context, allowed)) {
          return {};
        }

        return {
          ImportDeclaration(node) {
            if (node.source.value !== "@trpc/server") {
              return;
            }

            for (const specifier of node.specifiers || []) {
              if (
                specifier.type === "ImportSpecifier" &&
                specifier.imported &&
                specifier.imported.name === "TRPCError"
              ) {
                report(
                  context,
                  node,
                  "Use centralized error conversion, not direct TRPCError imports."
                );
              }
            }
          },
          NewExpression(node) {
            if (
              node.callee &&
              node.callee.type === "Identifier" &&
              node.callee.name === "TRPCError"
            ) {
              report(
                context,
                node,
                "Use centralized error conversion, not direct TRPCError construction."
              );
            }
          },
        };
      },
    },

    "no-raw-apperror-in-router": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow constructing/throwing AppError directly in router handlers.",
        },
        schema: [
          {
            type: "object",
            properties: {
              routerFileGlobs: {
                type: "array",
                items: { type: "string" },
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const routerGlobs = options.routerFileGlobs || [
          "**/router/**",
          "**/routers/**",
          "**/*.router.*",
        ];

        if (!matchesGlobs(context.getFilename(), routerGlobs)) {
          return {};
        }

        return {
          NewExpression(node) {
            if (
              node.callee &&
              node.callee.type === "Identifier" &&
              node.callee.name === "AppError"
            ) {
              report(
                context,
                node,
                "Router should return normalized client errors, not raw AppError."
              );
            }
          },
          ImportDeclaration(node) {
            for (const specifier of node.specifiers || []) {
              if (
                specifier.type === "ImportSpecifier" &&
                specifier.imported &&
                specifier.imported.name === "AppError"
              ) {
                report(
                  context,
                  node,
                  "Router should avoid direct AppError usage; normalize via adapter."
                );
              }
            }
          },
        };
      },
    },

    "no-direct-llm-calls": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow direct LLM SDK imports outside unified AI module.",
        },
        schema: [
          {
            type: "object",
            properties: {
              allowedFileGlobs: {
                type: "array",
                items: { type: "string" },
              },
              deniedImportPatterns: {
                type: "array",
                items: { type: "string" },
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const allowed = options.allowedFileGlobs || ["**/ai/client/unified.*"];
        const denied = options.deniedImportPatterns || defaultLlmImportPatterns;

        if (isInAllowedFile(context, allowed)) {
          return {};
        }

        return {
          ImportDeclaration(node) {
            const source = String(node.source.value || "");
            if (denied.some((frag) => source.includes(frag))) {
              report(
                context,
                node,
                "Direct LLM SDK import is forbidden. Use unified AI module."
              );
            }
          },
        };
      },
    },

    "no-direct-telemetry": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow telemetry imports outside centralized AI/telemetry wrapper.",
        },
        schema: [
          {
            type: "object",
            properties: {
              allowedFileGlobs: {
                type: "array",
                items: { type: "string" },
              },
              deniedImportPatterns: {
                type: "array",
                items: { type: "string" },
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const allowed = options.allowedFileGlobs || [
          "**/ai/client/unified.*",
          "**/telemetry/**",
        ];
        const denied =
          options.deniedImportPatterns || defaultTelemetryImportPatterns;

        if (isInAllowedFile(context, allowed)) {
          return {};
        }

        return {
          ImportDeclaration(node) {
            const source = String(node.source.value || "");
            if (denied.some((frag) => source.includes(frag))) {
              report(
                context,
                node,
                "Direct telemetry import is forbidden. Use centralized wrapper withSpan/logger."
              );
            }
          },
        };
      },
    },

    "no-hardcoded-ai-model": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Disallow hardcoded LLM model IDs outside centralized AI module.",
        },
        schema: [
          {
            type: "object",
            properties: {
              allowedFileGlobs: {
                type: "array",
                items: { type: "string" },
              },
              modelRegex: { type: "string" },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const allowed = options.allowedFileGlobs || ["**/ai/client/unified.*"];
        const modelRegex = new RegExp(
          options.modelRegex || "\\b(gpt-|claude-|gemini-|llama|mistral|deepseek)",
          "i"
        );

        if (isInAllowedFile(context, allowed)) {
          return {};
        }

        function checkLiteral(node) {
          const value =
            node.type === "Literal"
              ? node.value
              : node.type === "TemplateElement"
                ? node.value && node.value.cooked
                : "";

          if (typeof value === "string" && modelRegex.test(value)) {
            report(
              context,
              node,
              "Hardcoded model ID detected. Resolve model selection through unified AI config."
            );
          }
        }

        return {
          Literal: checkLiteral,
          TemplateElement: checkLiteral,
        };
      },
    },
  },
};
