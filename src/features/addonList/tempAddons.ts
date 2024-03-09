// Defines temporary add-ons. Will be removed when backend is connected
import type { Addon } from "../../types/AddOnTypes";
import { AddonCategory } from "../../types/AddOnTypes";

const shortAddon: Addon = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", // A unique identifier
  name: "Vis1",
  summary: "Lorem ipsum dolor sit amet.",
  category: AddonCategory.VISUALISATION
};

const longAddon: Addon = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6a", // A unique identifier
  name: "Vis3",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  category: AddonCategory.VISUALISATION
};

const mediumAddon: Addon = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6b", // A unique identifier
  name: "Vis2",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  category: AddonCategory.VISUALISATION
};

export const addonList: Addon[] = [shortAddon, mediumAddon, longAddon];
