/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/// <reference types="vite/client" />

type ImportMetaEnvAugmented =
  import("@julr/vite-plugin-validate-env").ImportMetaEnvAugmented<
    typeof import("../env").default
  >;

interface ImportMetaEnv extends ImportMetaEnvAugmented {
  // Now import.meta.env is totally type-safe and based on your `env.ts` schema definition
  // You can also add custom variables that are not defined in your schema
  VITE_MOCKING?: boolean;
}
