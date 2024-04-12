import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
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
        ...configDefaults.coverage.exclude,
      ]
    }
  }
}));
