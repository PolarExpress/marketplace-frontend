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

export const generateAddon = (index: number): Addon => ({
  _id: index.toString(),
  author: authorList[index % authorList.length],
  authorId: authorList[index % authorList.length].userId,
  category: AddonCategory.VISUALISATION,
  icon: "icon.png",
  name: `Vis${index}`,
  summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Addon ${index}.`
});

export const shortAddonList: Addon[] = Array.from({ length: 3 }, (_, index) =>
  generateAddon(index)
);

export const longAddonList: Addon[] = Array.from({ length: 60 }, (_, index) =>
  generateAddon(index)
);
