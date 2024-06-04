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

/**
 * Generates a mock addon object.
 *
 * @param   index The index of the addon to generate.
 *
 * @returns       The generated addon object.
 */
export const generateAddon = (index: number): Addon => ({
  _id: index.toString(),
  author: authorList[(index - 1) % authorList.length],
  authorId: authorList[(index - 1) % authorList.length].userId,
  category: categories[(index - 1) % categories.length],
  icon: "icon.png",
  installCount: 0,
  name: `Addon${index}`,
  summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Addon ${index}.`
});

/**
 * A short list of 3 generated mock addon objects.
 */
export const shortAddonList: Addon[] = Array.from({ length: 3 }, (_, index) =>
  generateAddon(index + 1)
);

/**
 * A long list of 120 generated mock addon objects.
 */
export const longAddonList: Addon[] = Array.from({ length: 120 }, (_, index) =>
  generateAddon(index + 1)
);
