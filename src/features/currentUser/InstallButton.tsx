/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useState } from "react";
import Button from "../../components/Button";
import type { Addon } from "../../types/AddOnTypes";
import { useAppDispatch } from "../../app/hooks";
import { postInstalledAddon } from "./UserSlice";
import { store } from "../../app/store";

/** Contains properties for an install button. */
interface InstallProperties {
  /** The addon this button belongs to. */
  addon: Addon;
}

/** A button for installing an addon. */
const InstallButton = (props: InstallProperties) => {
  const getUserInfo = () => store.getState().user;
  const findInstalled = () =>
    getUserInfo().installedAddons.find(addon => addon.id === props.addon.id) ==
    null;

  const [isInstalled, setInstalled] = useState(findInstalled());
  const dispatch = useAppDispatch();

  return (
    <Button
      text="Install"
      disabled={isInstalled}
      onClick={() => {
        dispatch(
          postInstalledAddon({
            userId: getUserInfo().id,
            addon: props.addon
          })
        );
        // Recheck in order not to incorrectly disable the button if an error occurred.
        setInstalled(findInstalled());

        // TODO: should this same button be used for uninstall?
      }}
    />
  );
};

export default InstallButton;
