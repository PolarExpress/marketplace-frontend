import type { Addon } from "./AddOnTypes";

/**
 * Defines the structure of a user.
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** The user's email address */
  email: string;

  /** (Optional)  A list of add-ons that the user has installed. */
  installedAddons?: Addon[];
}
