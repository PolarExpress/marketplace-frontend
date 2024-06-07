/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/* eslint-disable unicorn/prevent-abbreviations */

import { Schema, defineConfig } from "@julr/vite-plugin-validate-env";

export default defineConfig({
  VITE_API_BASE: Schema.string(),
  VITE_BACKEND_WSS_URL: Schema.string(),
  VITE_GP_URL: Schema.string(),
  VITE_UMS_URL: Schema.string()
});
