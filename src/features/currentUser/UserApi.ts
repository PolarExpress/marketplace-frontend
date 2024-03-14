/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Addon } from "../../types/AddOnTypes";
import { AddonCategory } from "../../types/AddOnTypes";
import { User } from "../../types/UserTypes";
import { delay } from "../../utils/asyncUtils";

/**
 * Get all add-ons installed by the specified user.
 * @param userId: The ID of the user.
 * @returns A list of addons installed by the specified user.
 */
async function getInstalledAddons(userId: string): Promise<Addon[]> {
  return delay(20).then(() => {
    return [
      {
        id: "addon_01",
        name: "Test Addon",
        summary: "An addon for testing",
        category: AddonCategory.VISUALISATION
      }
    ];
  });
}

/**
 * Send a request to install a specified add-on for the specified user.
 * @param userId The ID of the user.
 * @param addonId The ID of the add-on to install.
 * @returns The modified data about the user.
 */
async function postInstalledAddon(userId: string, addonId: string) {
  return sendRequest<User>("http://localhost:3000/install", "POST", {
    userId: userId,
    addonId: addonId
  });
}

/** The user API. */
export default {
  getInstalledAddons: getInstalledAddons,
  postInstalledAddon: postInstalledAddon
};

// Remove from this file if HTTPutils PR is merged.
type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

// Remove from this file if HTTPutils PR is merged.
async function sendRequest<T>(
  url: string,
  method: HTTPMethod,
  body = {}
): Promise<T> {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const requestOptions = {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  return response.json() as T;
}
