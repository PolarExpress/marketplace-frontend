/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Addon } from "./AddOnTypes";

/**
 * Defines the structure of a user.
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** The name of the user */
  name: string;
  /** The user's email address */
  email: string;
  /** (Optional)  A list of add-ons that the user has installed. */
  installedAddons?: Addon[];
}
