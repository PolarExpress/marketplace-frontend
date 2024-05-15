import react from "@vitejs/plugin-react";
import removeAttr from "react-remove-attr";
import pathAlias from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    mode !== "test" &&
      removeAttr({
        attributes: ["data-testid"],
        extensions: ["tsx"]
      }),
    react(),
    pathAlias()
  ],
  publicDir: command === "serve" ? "public" : false,
  server: {
    open: true
  },
  test: {
    coverage: {
      exclude: [
        "public",
        "tailwind.config.js",
        "src/colors.js",
        "src/app.tsx",
        "src/dataAccess/broker/broker.interface.ts",
        "src/dataAccess/broker/broker.mock.ts", // Used for mocking only.
        "src/dataAccess/broker/broker.ts", // Not our code.
        "src/dataAccess/authentication", // Not our code.
        "src/main.tsx",
        "src/stories",
        "src/test",
        "src/components/rtkError.tsx", // Currently impossible to test all branches in integration tests.
        ...configDefaults.coverage.exclude!
      ],
      provider: "istanbul",
      reporter: ["text", "json-summary", "json", "lcov"],
      reportsDirectory: "./coverage/vitest",
      thresholds: {
        branches: 85,
        functions: 85,
        lines: 85,
        statements: 85
      }
    },
    environment: "jsdom",
    globals: true,
    mockReset: true,
    setupFiles: "src/test/setup"
  }
}));
