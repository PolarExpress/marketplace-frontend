import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import removeAttr from "react-remove-attr";
import pathAlias from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    mode !== "test" &&
      removeAttr({
        extensions: ["tsx"],
        attributes: ["data-testid"]
      }),
    react(),
    pathAlias()
  ],
  server: {
    open: true
  },
  publicDir: command === "serve" ? "public" : false,
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/test/setup",
    mockReset: true,
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./coverage/vitest",
      exclude: [
        "public",
        "tailwind.config.js",
        "src/colors.js",
        "src/app.tsx",
        "src/dataAccess/broker/broker.interface.ts",
        "src/dataAccess/broker/broker.ts",
        "src/dataAccess/authentication",
        "src/main.tsx",
        "src/stories/**/*",
        "src/test",
        ...configDefaults.coverage.exclude!
      ]
    }
  }
}));
