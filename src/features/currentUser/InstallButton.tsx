/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useState } from "react";
import type { Addon } from "../../types/AddOnTypes";
import { useAppDispatch, useAuthorizationCache } from "../../app/hooks";
import { store } from "../../app/store";
import { sendInstalledAddon } from "./UserSlice";

/** Contains properties for an install button. */
interface InstallProperties {
  /** The addon this button belongs to. */
  addon: Addon;
}

/** A button for installing an addon. */
const InstallButton = (props: InstallProperties) => {
  const auth = useAuthorizationCache();
  const getUserInfo = () => store.getState().user;
  const findInstalled = () =>
    getUserInfo().installedAddons.find(addon => addon.id === props.addon.id) ==
    null;

  const [isInstalled, setInstalled] = useState(findInstalled());
  const dispatch = useAppDispatch();

  return (
    <button
      hidden={!auth.authorized}
      disabled={isInstalled}
      onClick={() => {
        dispatch(
          sendInstalledAddon({
            userId: auth.userID, // TODO: zijn onze ID's gelijk aan die van GP? Kunnen we die zo door elkaar gebruiken?
            addon: props.addon
          })
        );
        // Recheck in order not to incorrectly disable the button if an error occurred.
        setInstalled(findInstalled());

        // TODO: should this same button be used for uninstall?
      }}>
      Install
    </button>
  );
};

export default InstallButton;
