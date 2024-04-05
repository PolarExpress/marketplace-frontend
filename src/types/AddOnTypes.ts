/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Author } from "./AuthorTypes";

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
  _id: string;
  /** Display name of the add-on */
  name: string;
  /** A short description of the add-on's functionality */
  summary: string;
  /** Link to the icon of the addon */
  icon: string;
  /** The category it belongs to (e.g., visualization) */
  category: AddonCategory;

  /** Id of the author that created this add-on */
  authorId: string;

  /** Author of the add-on */
  author: Author;
}
