/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useState, useCallback } from "react";
import { Broker } from "./broker";
import type { SendMessageI } from "./types";

/**
 * Interface for parameters used in addon management hooks.
 */
interface UseAddonParams {
  userId: string;
  addonId: string;
  action: "installAddon" | "uninstallAddon";
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
    async ({ userId, addonId, action }: UseAddonParams) => {
      setIsPending(true);

      const message: SendMessageI = {
        key: "mp-backend",
        subKey: "update",
        body: {
          action: action,
          payload: {
            userId,
            addonId
          }
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
    ({ userId, addonId }: Omit<UseAddonParams, "action">) => {
      manageAddon({ userId, addonId, action: "installAddon" });
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
    ({ userId, addonId }: Omit<UseAddonParams, "action">) => {
      manageAddon({ userId, addonId, action: "uninstallAddon" });
    },
    [manageAddon]
  );

  return { isPending, error, uninstallAddon };
};
