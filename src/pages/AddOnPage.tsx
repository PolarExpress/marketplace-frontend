/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useParams } from "react-router-dom";
import "../styles/tempStyles.css";
import {
  useGetAddonByIdQuery,
  useGetAddonReadmeByIdQuery
} from "../features/addonList/AddOnApi";
import RTKError from "../components/RTKError";
import Markdown from "react-markdown";
import InstallButton from "../components/InstallButton";
import { useAuthorizationCache } from "../app/hooks";
import {
  useGetAddonsByUserId,
  useInstallAddon,
  useUninstallAddon
} from "../broker/hooks";
import { useEffect, useState } from "react";

/**
 * Represents the individual page of an add-on.
 * It retrieves information about the add-on from the store and displays it.
 */
const AddOnPage = () => {
  // Retrieve URL param
  const { id: thisId } = useParams();

  const auth = useAuthorizationCache();

  // Use the RTK Query hooks to retrieve addon and readme from the backend
  const {
    data: addon,
    isLoading: isAddonLoading,
    error: addonError
  } = useGetAddonByIdQuery(thisId ?? "");
  // Fetching of the readme is skipped if the addon is not yet retrieved
  const {
    data: readMe,
    isLoading: isReadmeLoading,
    error: readmeError
  } = useGetAddonReadmeByIdQuery(thisId ?? "", {
    skip: !addon
  });

  // Use the custom hooks for interacting with the backend over AMQP
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

  const {
    data: userAddons,
    isLoading: userAddonsLoading,
    error: userAddonsError
  } = useGetAddonsByUserId();

  const isCurrentAddonInstalled = userAddons?.some(
    addon => addon._id === thisId
  );

  const [installed, setInstalled] = useState<boolean>(
    isCurrentAddonInstalled ?? false
  );

  useEffect(() => {
    setInstalled(isCurrentAddonInstalled ?? false);
  }, [isCurrentAddonInstalled]);

  /**
   * Handles the installation or uninstallation of the add-on.
   * Changes the internal installed state as well.
   */
  const handleInstall = () => {
    if (auth.authorized) {
      if (installed) {
        uninstallAddon(thisId ?? "");
        setInstalled(false);
      } else {
        installAddon(thisId ?? "");
        setInstalled(true);
      }
    } else {
      // Should redirect to the login page when it exists
      console.warn("User is not logged in. Redirecting to login page.");
    }
  };

  if (isAddonLoading) return <div>Loading...</div>;

  if (addonError) return <RTKError error={addonError} />;

  if (installError || uninstallError || userAddonsError)
    return <div>{installError || uninstallError || userAddonsError}</div>;

  if (addon != null) {
    return (
      <div className="addon-page-container" data-testid="addon-page">
        <h1 className="addon-name">{addon.name}</h1>
        <p className="addon-author">{addon.author.userId}</p>
        <p className="addon-summary">{addon.summary}</p>{" "}
        <InstallButton
          isAddonInstalled={installed}
          installPending={installPending}
          uninstallPending={uninstallPending}
          userAddonsLoading={userAddonsLoading}
          authorized={auth.authorized ?? false}
          handleClick={handleInstall}
        />
        {isReadmeLoading && <div>Loading...</div>}
        {/* Do not display error if the status is 400 (readme not found in backend). In that case, display a message.
            TODO: Update if structured errors are implemented.
        */}
        {readmeError &&
          ("status" in readmeError && readmeError.status === 400 ? (
            <div>No readme found</div>
          ) : (
            <RTKError error={readmeError} />
          ))}
        {readMe != null && <Markdown>{readMe}</Markdown>}
      </div>
    );
  }
};

export default AddOnPage;
