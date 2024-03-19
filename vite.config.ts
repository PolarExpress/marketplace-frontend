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
        ...configDefaults.coverage.exclude,
        "src/main.tsx",
        "src/stories/**/*",
        "public",
        "tailwind.config.js",
        "src/colors.js"
      ]
    }
  }
}));