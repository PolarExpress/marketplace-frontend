/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Addon } from "../../types/AddOnTypes";
// import { User } from "../../types/UserTypes";
import { addonList } from "../../temp/tempAddons";
import { userList } from "../../temp/tempUsers";

/**
 * Get all add-ons installed by the specified user.
 * @param userId: The ID of the user.
 * @returns A list of addons installed by the specified user.
 */
async function getInstalledAddons(
  userId: string | undefined
): Promise<Addon[]> {
  if (userId == null) throw new Error("No user logged in."); // TODO: ensure that this doesn't happen. (At type level?)

  return [addonList[0], addonList[1], addonList[2]];
}

/**
 * Send a request to install a specified add-on for the specified user.
 * @param userId The ID of the user.
 * @param addonId The ID of the add-on to install.
 * @returns The modified data about the user.
 */
async function sendInstalledAddon(userId: string | undefined, addonId: string) {
  if (userId == null) throw new Error("No user logged in.");

  return userList[0];
  // return sendRequest<User>("http://localhost:3000/install", "POST", {
  //   userId: userId,
  //   addonId: addonId
  // });
}

/** The user API. */
export default {
  getInstalledAddons: getInstalledAddons,
  sendInstalledAddon: sendInstalledAddon
};

// // Remove from this file if HTTPutils PR is merged.
// type HTTPMethod =
//   | "GET"
//   | "HEAD"
//   | "POST"
//   | "PUT"
//   | "DELETE"
//   | "CONNECT"
//   | "OPTIONS"
//   | "TRACE"
//   | "PATCH";

// // Remove from this file if HTTPutils PR is merged.
// async function sendRequest<T>(
//   url: string,
//   method: HTTPMethod,
//   body = {}
// ): Promise<T> {
//   const headers = new Headers();
//   headers.set("Content-Type", "application/json");
//   const requestOptions = {
//     method: method,
//     headers: headers,
//     body: JSON.stringify(body)
//   };

//   const response = await fetch(url, requestOptions);

//   if (!response.ok) {
//     throw new Error("Something went wrong!");
//   }

//   return response.json() as T;
// }
