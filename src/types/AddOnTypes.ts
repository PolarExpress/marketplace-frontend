import type { User } from "./UserTypes";

export enum AddonCategory {
  VISUALISATION = "VISUALISATION",
  MACHINE_LEARNING = "MACHINE_LEARNING",
  DATA_SOURCE = "DATA_SOURCE"
}

/**
 * Defines the structure of an add-on.
 */
export interface Addon {
  /** Unique identifier for the add-on */
  id: string;
  /** Display name of the add-on */
  name: string;
  /** A short description of the add-on's functionality */
  summary: string;
  /** The category it belongs to (e.g., visualization) */
  category: AddonCategory;

  /** (Optional)  A list of users who have installed the add-on */
  installedBy?: User[];
}
