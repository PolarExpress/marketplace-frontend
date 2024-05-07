/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { Broker } from "@polarexpress/dataAccess/broker";
import { BrokerBase } from "@polarexpress/dataAccess/broker";
import { MockBroker } from "@polarexpress/dataAccess/broker";
import { Addon } from "@polarexpress/types/addon";

/**
 * Decides which broker to use based on mocking global.
 */
export function createBroker(): BrokerBase {
  return import.meta.env.VITE_MOCKING
    ? MockBroker.instance()
    : Broker.instance();
}

/**
 * Initializes sessionStorage with an empty list. sessionStorage is used as a
 * temporary database while mocking.
 */
export const initializeInstalled = () => {
  sessionStorage.setItem("installed", JSON.stringify([]));
};

/**
 * Removes an addon from sessionStorage.
 *
 * @param addonId Id of the addon to be uninstalled.
 */
export const removeInstalled = (addonID: string): void => {
  const installedAddons: Addon[] = JSON.parse(
    sessionStorage.getItem("installed") || "[]"
  );
  const updatedAddons: Addon[] = installedAddons.filter(
    addon => addon._id !== addonID
  );
  sessionStorage.setItem("installed", JSON.stringify(updatedAddons));
};

/**
 * Adds an addon to sessionStorage.
 *
 * @param addon Addon object to be installed.
 */
export const addInstalled = (addon: Addon): void => {
  const installedAddons: Addon[] = JSON.parse(
    sessionStorage.getItem("installed") || "[]"
  );
  installedAddons.push(addon);
  sessionStorage.setItem("installed", JSON.stringify(installedAddons));
};

/**
 * Deletes the list of installed addons from sessionStorage.
 */
export const deleteInstalledList = () => {
  sessionStorage.removeItem("installed");
};

/**
 * Retrieves the list of installed addons from sessionStorage.
 *
 * @returns {Addon[]} A list of Addon objects representing the installed addons.
 *   Returns an empty list if the 'installed' item is not found in
 *   sessionStorage.
 */
export const getInstalled = (): Addon[] => {
  const installedAddons: Addon[] = JSON.parse(
    sessionStorage.getItem("installed") || "[]"
  );
  return installedAddons;
};
