/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Author } from "./author";

/* eslint-disable perfectionist/sort-enums -- Should be ordered by importance */
export enum AddonCategory {
  VISUALISATION = "VISUALISATION",
  MACHINE_LEARNING = "MACHINE_LEARNING",
  DATA_SOURCE = "DATA_SOURCE"
}
/* eslint-enable perfectionist/sort-enums */

/**
 * Defines the structure of an add-on.
 */
export interface Addon {
  /**
   * Unique identifier for the add-on.
   */
  _id: string;
  /**
   * Author of the add-on.
   */
  author: Author;
  /**
   * Id of the author that created this add-on.
   */
  authorId: string;
  /**
   * The category it belongs to (e.g., visualization)
   */
  category: AddonCategory;
  /**
   * Link to the icon of the addon.
   */
  icon?: string;
  /**
   * Number of times this addon was installed.
   */
  installCount: number;
  /**
   * Display name of the add-on.
   */
  name: string;
  /**
   * A short description of the add-on's functionality.
   */
  summary: string;
}
