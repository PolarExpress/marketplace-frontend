/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import baseConfig from "@graphpolaris/ts-configs";

export default [
  ...baseConfig,
  {
    rules: {
      "perfectionist/sort-imports": "off",
      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            Function: false
          },
          extendDefaults: true
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase", "PascalCase"],
          selector: "import"
        },
        {
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          selector: "variable",
          trailingUnderscore: "allow"
        }
      ],
      "unicorn/no-abusive-eslint-disable": "off"
    }
  }
];
