/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
