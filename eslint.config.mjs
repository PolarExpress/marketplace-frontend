/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import prettier from "eslint-config-prettier";
import eslint from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";

const rule = {
  meta: {
    type: "maintenance",
    docs: {
      description:
        "Ensure a specific comment exists at the top of the document",
      category: "Mandatory",
      recommended: true
    },
    fixable: "code"
  },
  create(context) {
    const commentText =
      "\n" +
      " * This program has been developed by students from the bachelor\n" +
      " * Computer Science at Utrecht University within the Software Project course.\n" +
      " *\n" +
      " * © Copyright Utrecht University\n" +
      " * (Department of Information and Computing Sciences)\n" +
      " ";
    return {
      Program(node) {
        if (!node.body.length) return;
        const comments = context.sourceCode.getCommentsBefore(node.body[0]);
        if (
          !(
            comments.length &&
            comments[0].range[0] === 0 &&
            comments[0].value === commentText
          )
        ) {
          context.report({
            node: comments[0] ?? node.body[0],
            message: "Copyright comment not found at the top",
            fix(fixer) {
              return fixer.insertTextBefore(
                comments[0] ?? node.body[0],
                `/*${commentText}*/\n\n`
              );
            }
          });
          return;
        }
      }
    };
  }
};

const plugin = { rules: { "enforce-copyright-comment": rule } };

const compat = new FlatCompat();

export default [
  {
    plugins: { custom: plugin },
    rules: { "custom/enforce-copyright-comment": "error" },
    ignores: ["**/*.config.*"]
  },
  prettier,
  eslint.configs.recommended,
  ...compat.extends("plugin:storybook/recommended", "react-app"),
  {
    rules: {
      "import/no-anonymous-default-export": "off"
    }
  },
  {
    ignores: ["storybook-static/**/*"]
  }
];
