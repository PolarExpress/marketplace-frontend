/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { User } from "./UserTypes";
import type { Addon } from "./AddOnTypes";

export interface Author {
  /** Unique identifier for the author */
  id: string;
  /** User corresponding to the author */
  user: User;
  /** (Optional) The add-ons created by this author */
  createdAddons?: Addon[];
}