/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useState } from "react";
import {
  useInstallByIdMutation,
  useUninstallByIdMutation
} from "../../app/services/addonService";
import { Addon } from "../../types/AddOnTypes";

interface InstallButtonProps {
  addon: Addon;
}

export function InstallButton({ addon }: InstallButtonProps) {
  const [installed, setInstalled] = useState(!!addon.installedBy?.length);
  const [installById] = useInstallByIdMutation();
  const [uninstallById] = useUninstallByIdMutation();

  function install() {
    installById(addon.id);
    setInstalled(true);
  }

  function uninstall() {
    uninstallById(addon.id);
    setInstalled(false);
  }

  return installed ? (
    <button
      onClick={uninstall}
      className="mt-2 bg-red-500 py-1 px-2 rounded-full border-red-600 text-white">
      Uninstall
    </button>
  ) : (
    <button
      onClick={install}
      className="mt-2 bg-blue-500 py-1 px-2 rounded-full border-blue-600 text-white">
      Install
    </button>
  );
}
