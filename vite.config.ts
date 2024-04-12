import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import removeAttr from "react-remove-attr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    mode !== "test" && removeAttr({
      extensions: ["tsx"],
      attributes: ["data-testid"]
    }),
    react()
  ],
  server: {
    open: true
  },
  publicDir: command === "serve" ? "public" : false,
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./coverage/vitest",
      exclude: [
        "public",
        "storybook-static",
        "tailwind.config.js",
        "src/App.tsx",
        "src/broker/broker.tsx",
        "src/colors.js",
        "src/features/authentication",
        "src/main.tsx",
        "src/stories/**/*",
        "src/test",
        ...configDefaults.coverage.exclude!
      ]
    }
  }
}));
