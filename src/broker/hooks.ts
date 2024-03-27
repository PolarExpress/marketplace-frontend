/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useState, useEffect } from "react";
import { Broker } from "./broker";
import type { SendMessageI } from "./types";

interface UseAddonParams {
  userId: string;
  addonId: string;
  action: "installAddon" | "uninstallAddon";
}

const useAddon = ({ userId, addonId, action }: UseAddonParams) => {
  // Backend response type does not matter
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const manageAddon = async () => {
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
        const response = await Broker.instance().sendMessageAsync(message);
        setData(response);
        setError(null);
      } catch (error) {
        setError(`Failed to ${action}`);
      }

      setIsPending(false);
    };

    manageAddon();
  }, [userId, addonId, action]);

  return { data, isPending, error };
};

// Use the hooks for install and uninstall
export const useInstallAddon = ({ userId, addonId }: UseAddonParams) =>
  useAddon({ userId, addonId, action: "installAddon" });

export const useUninstallAddon = ({ userId, addonId }: UseAddonParams) =>
  useAddon({ userId, addonId, action: "uninstallAddon" });
