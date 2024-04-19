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
        "storybook-static",
        "tailwind.config.js",
        "src/App.tsx",
        "src/broker/broker.interface.ts",
        "src/broker/broker.ts",
        "src/colors.js",
        "src/features/authentication",
        "src/main.tsx",
        "src/stories/**/*",
        "src/test",
        ...configDefaults.coverage.exclude!
      ],
      provider: "istanbul",
      reportsDirectory: "./coverage/vitest"
    },
    environment: "jsdom",
    globals: true,
    mockReset: true,
    setupFiles: "src/test/setup"
  }
}));
