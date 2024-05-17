/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Addon } from "@polarexpress/types/addon";

import { AddonCategory } from "@polarexpress/types/addon";

import { authorList } from "./authors";

const categories = Object.values(AddonCategory);

export const generateAddon = (index: number): Addon => ({
  _id: index.toString(),
  author: authorList[(index - 1) % authorList.length],
  authorId: authorList[(index - 1) % authorList.length].userId,
  category: categories[(index - 1) % categories.length],
  icon: "icon.png",
  name: `Addon${index}`,
  summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Addon ${index}.`
});

export const shortAddonList: Addon[] = Array.from({ length: 3 }, (_, index) =>
  generateAddon(index + 1)
);

export const longAddonList: Addon[] = Array.from({ length: 120 }, (_, index) =>
  generateAddon(index + 1)
);
