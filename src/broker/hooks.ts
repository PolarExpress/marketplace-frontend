/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useState, useCallback, useEffect } from "react";
import { Broker } from "./broker";
import type { MpBackendAction, MpBackendMessage } from "./types";
import { Addon } from "../types/AddOnTypes";

/**
 * Interface for parameters used in addon management hooks.
 */
interface UseAddonParams {
  addonId: string;
  action: "install" | "uninstall";
}

/**
 * A hook to manage (install or uninstall) an addon by sending a message to the backend.
 *
 * @returns An object containing the `isPending` state, the `error` state, and the `manageAddon` function.
 */
const useAddon = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const manageAddon = useCallback(
    async ({ addonId, action }: UseAddonParams) => {
      setIsPending(true);

      const message: MpBackendMessage = {
        key: "mpBackend",
        subKey: "get",
        body: {
          action: action,
          addonID: addonId
        }
      };

      try {
        // Unsure how backend error handling will be implemented
        await Broker.instance().sendMessageAsync(message);
      } catch (error) {
        setError(`Failed to ${action}. ${error}`);
      }

      setIsPending(false);
    },
    []
  );

  return { isPending, error, manageAddon };
};

/**
 * A hook to install an addon using the generic addon management hook.
 *
 * @returns An object containing the `isPending` state, the `error` state, and the `installAddon` function.
 */
export const useInstallAddon = () => {
  const { isPending, error, manageAddon } = useAddon();

  const installAddon = useCallback(
    (addonId: string) => {
      manageAddon({ addonId, action: "install" });
    },
    [manageAddon]
  );

  return { isPending, error, installAddon };
};

/**
 * A hook to uninstall an addon using the generic addon management hook.
 *
 * @returns An object containing the `isPending` state, the `error` state, and the `uninstallAddon` function.
 */
export const useUninstallAddon = () => {
  const { isPending, error, manageAddon } = useAddon();

  const uninstallAddon = useCallback(
    (addonId: string) => {
      manageAddon({ addonId, action: "uninstall" });
    },
    [manageAddon]
  );

  return { isPending, error, uninstallAddon };
};

/**
 * A hook to get addons by user ID by sending a message to the backend.
 *
 * @returns An object containing the `data` state, the `isLoading` state, and the `error` state.
 */
export const useGetAddonsByUserId = () => {
  const [data, setData] = useState<Addon[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddons = async () => {
      const message: MpBackendMessage = {
        key: "mpBackend",
        subKey: "get",
        body: {
          action: "addons/get-installed" as MpBackendAction
        }
      };

      try {
        const response = await Broker.instance().sendMessageAsync(message);
        setData(response.addons);
      } catch (error) {
        setError(`Failed to get addons by user ID. ${error}`);
      }

      setIsLoading(false);
    };

    fetchAddons();
  }, []);

  return { data, isLoading, error };
};
