/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import React from "react";
import { useInstallAddon } from "../broker/hooks";
import { useUninstallAddon } from "../broker/hooks";
import { useAuthorizationCache } from "../app/hooks";

interface AddonButtonProps {
  addonId: string;
}

const AddonButton: React.FC<AddonButtonProps> = ({ addonId }) => {
  const {
    isPending: installPending,
    error: installError,
    installAddon
  } = useInstallAddon();

  const {
    isPending: uninstallPending,
    error: uninstallError,
    uninstallAddon
  } = useUninstallAddon();

  const auth = useAuthorizationCache();

  const installed = false; // Simulate get-addons-by-user-id query

  const handleClick = () => {
    if (auth.authorized) {
      if (installed) {
        uninstallAddon(addonId);
      } else {
        installAddon(addonId);
      }
    } else {
      // Redirect to login page or show login prompt
      console.log("User is not logged in. Redirecting to login page.");
    }
  };

  if (installError || uninstallError) {
    // Handle errors
    console.error("Error:", installError || uninstallError);
    return null;
  }

  return (
    <button onClick={handleClick} disabled={installPending || uninstallPending}>
      {auth.authorized
        ? installed
          ? uninstallPending
            ? "Uninstalling..."
            : "Uninstall"
          : installPending
            ? "Installing..."
            : "Install"
        : "Login to install"}
    </button>
  );
};

export default AddonButton;
