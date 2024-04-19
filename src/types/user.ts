/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/**
 * Defines the structure of a user.
 */
export interface User {
  /** MongoDB object id */
  _id: string;
  /** A list of add-on id's that the user has installed. */
  installedAddons: string[];
  /** Unique identifier for the user */
  userId: string;
}
