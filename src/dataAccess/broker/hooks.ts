/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Addon, AddonCategory } from "@polarexpress/types/addon";

import { createBroker } from "@polarexpress/test/mockingUtils";
import { useCallback, useEffect, useState } from "react";

import type { MpBackendAction, MpBackendMessage } from "./types";

const Broker = createBroker();

/**
 * Interface for parameters used in addon management hooks.
 */
interface UseAddonParams {
  action: "install" | "uninstall";
  addonId: string;
}

/**
 * A hook to manage (install or uninstall) an addon by sending a message to the backend.
 *
 * @returns An object containing the `isPending` state, the `error` state, and the `manageAddon` function.
 */
const useAddon = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const manageAddon = useCallback(
    async ({ action, addonId }: UseAddonParams) => {
      setIsPending(true);

      const message: MpBackendMessage = {
        body: {
          action: action,
          addonID: addonId
        },
        key: "mpBackend",
        subKey: "get"
      };

      try {
        // Unsure how backend error handling will be implemented
        await Broker.sendMessageAsync(message);
      } catch (error) {
        setError(`Failed to ${action}. ${error}`);
      }

      setIsPending(false);
    },
    []
  );

  return { error, isPending, manageAddon };
};

/**
 * A hook to install an addon using the generic addon management hook.
 *
 * @returns An object containing the `isPending` state, the `error` state, and the `installAddon` function.
 */
export const useInstallAddon = () => {
  const { error, isPending, manageAddon } = useAddon();

  /* eslint-disable react-hooks/exhaustive-deps -- dependency cannot change */
  const installAddon = useCallback((addonId: string) => {
    manageAddon({ action: "install", addonId });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { error, installAddon, isPending };
};

/**
 * A hook to uninstall an addon using the generic addon management hook.
 *
 * @returns An object containing the `isPending` state, the `error` state, and the `uninstallAddon` function.
 */
export const useUninstallAddon = () => {
  const { error, isPending, manageAddon } = useAddon();

  /* eslint-disable react-hooks/exhaustive-deps -- dependency cannot change */
  const uninstallAddon = useCallback((addonId: string) => {
    manageAddon({ action: "uninstall", addonId });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { error, isPending, uninstallAddon };
};

/**
 * Interface for parameters used in get GetAddonsByUserId hook
 */
interface UseGetAddonsByUserIdParams {
  category?: AddonCategory;
  page?: number;
}

/**
 * A hook to get addons by user ID by sending a message to the backend.
 *
 * @returns An object containing the `data` state, the `isLoading` state, and the `error` state.
 */
export const useGetAddonsByUserId = ({
  category,
  page
}: UseGetAddonsByUserIdParams = {}) => {
  const [data, setData] = useState<Addon[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchAddons = async () => {
      const message: MpBackendMessage = {
        body: {
          action: "addons/get-by-user" as MpBackendAction,
          category: category,
          page: page
        },
        key: "mpBackend",
        subKey: "get"
      };

      try {
        const response = await Broker.sendMessageAsync(message);
        setData(response.addons);
      } catch (error) {
        setError(`Failed to get addons by user ID. ${error}`);
      }

      setIsLoading(false);
    };

    fetchAddons();
  }, [category, page]);

  return { data, error, isLoading };
};
