/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Defines temporary add-ons. Will be removed when backend is connected
import type { Addon } from "@polarexpress/types/addon";
import { AddonCategory } from "@polarexpress/types/addon";
import { authorList } from "./authors";

const shortAddon: Addon = {
  _id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", // A unique identifier
  name: "Vis1",
  summary: "Lorem ipsum dolor sit amet.",
  icon: "icon.png",
  category: AddonCategory.VISUALISATION,
  authorId: authorList[0].userId,
  author: authorList[0]
};

const longAddon: Addon = {
  _id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6a", // A unique identifier
  name: "Vis3",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  category: AddonCategory.VISUALISATION,
  icon: "icon.png",
  authorId: authorList[0].userId,
  author: authorList[0]
};

const mediumAddon: Addon = {
  _id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6b", // A unique identifier
  name: "Vis2",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  category: AddonCategory.VISUALISATION,
  icon: "icon.png",
  authorId: authorList[1].userId,
  author: authorList[1]
};

export const addonList: Addon[] = [shortAddon, mediumAddon, longAddon];
