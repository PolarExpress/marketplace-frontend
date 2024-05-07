/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/// <reference types="vite/client" />

interface ImportMetaEnvironment {
  VITE_API_BASE: string;
  VITE_BACKEND_WSS_URL: string;
  VITE_MOCKING?: boolean;
  VITE_UMS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnvironment;
}
