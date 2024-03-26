/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { Broker } from "./broker";
import type { SendMessageI } from "./types";
import { AddonCategory } from "../types/AddOnTypes";

export const getAddons = (page?: number, category?: AddonCategory) => {
  const message: SendMessageI = {
    key: "addons",
    subKey: "getAllAddons",
    body: { page, category }
  };
  Broker.instance().sendMessageAsync(message);
};

export const getAddonById = (id: string) => {
  const message: SendMessageI = {
    key: "addons",
    subKey: "getAddonById",
    body: { id }
  };
  Broker.instance().sendMessageAsync(message);
};

export const getAddonReadmeById = (id: string) => {
  const message: SendMessageI = {
    key: "addons",
    subKey: "getAddonReadmeById",
    body: { id }
  };
  Broker.instance().sendMessageAsync(message);
};
