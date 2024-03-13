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

export interface InstallProperties {
  addon: Addon;
  userId: string;
  defaultInstalled?: boolean;
}

export const InstallButton = ({
  defaultInstalled = false,
  ...props
}: InstallProperties) => {
  const [isInstalled, setInstalled] = useState(defaultInstalled);
  const dispatch = useAppDispatch();

  return (
    <Button
      text="Install"
      disabled={isInstalled}
      onClick={() => {
        dispatch(postInstalledAddon({
          userId: props.userId,
          addon: props.addon
        }));
        setInstalled(true);
      }}
    />
  );
};

export default InstallButton;
