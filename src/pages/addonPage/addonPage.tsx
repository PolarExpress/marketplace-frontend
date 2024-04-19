/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import {
  InstallButton,
  LoadingSpinner,
  RTKError
} from "@polarexpress/components";
import {
  useGetAddonsByUserId,
  useInstallAddon,
  useUninstallAddon
} from "@polarexpress/dataAccess/broker/hooks";
import { useAuthorizationCache } from "@polarexpress/dataAccess/store";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

import {
  useGetAddonByIdQuery,
  useGetAddonReadmeByIdQuery
} from "./addonList/addonApi";

/**
 * Represents the individual page of an add-on.
 * It retrieves information about the add-on from the store and displays it.
 */
const AddonPage = () => {
  // Retrieve URL param
  const { id: thisId } = useParams();

  const auth = useAuthorizationCache();

  // Use the RTK Query hooks to retrieve addon and readme from the backend
  const {
    data: addon,
    error: addonError,
    isLoading: isAddonLoading
  } = useGetAddonByIdQuery(thisId ?? "");
  // Fetching of the readme is skipped if the addon is not yet retrieved
  const {
    data: readMe,
    error: readmeError,
    isLoading: isReadmeLoading
  } = useGetAddonReadmeByIdQuery(thisId ?? "", {
    skip: addon == null
  });

  // Use the custom hooks for interacting with the backend over AMQP
  const {
    error: installError,
    installAddon,
    isPending: installPending
  } = useInstallAddon();

  const {
    error: uninstallError,
    isPending: uninstallPending,
    uninstallAddon
  } = useUninstallAddon();

  const {
    data: userAddons,
    error: userAddonsError,
    isLoading: userAddonsLoading
  } = useGetAddonsByUserId();

  const isCurrentAddonInstalled = userAddons?.some(
    addon => addon._id === thisId
  );

  const [installed, setInstalled] = useState(isCurrentAddonInstalled ?? false);

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
      // TODO: Should redirect to the login page when it exists
      console.warn("User is not logged in. Redirecting to login page.");
    }
  };

  if (isAddonLoading)
    return (
      <div className="flex w-full justify-center" data-testid="addon-loading">
        <LoadingSpinner>Loading...</LoadingSpinner>
      </div>
    );

  if (addonError) return <RTKError error={addonError} />;

  if (installError || uninstallError || userAddonsError)
    return (
      <div data-testid="button-loading">
        {installError || uninstallError || userAddonsError}
      </div>
    );

  if (addon != null) {
    return (
      <div
        className="m-8 text-center font-sans leading-10"
        data-testid="addon-page">
        <div className="mb-2 border-b-2 pb-2">
          <h1 className="text-4xl font-bold">{addon.name}</h1>
          {/* TODO: Fetch author name instead of id */}
          <p className="text-sm font-light">{addon.authorId}</p>
          <p>{addon.summary}</p>{" "}
          <InstallButton
            authorized={auth.authorized ?? false}
            handleClick={handleInstall}
            installPending={installPending}
            isAddonInstalled={installed}
            uninstallPending={uninstallPending}
            userAddonsLoading={userAddonsLoading}
          />
        </div>

        {isReadmeLoading && (
          <div
            className="flex w-full justify-center"
            data-testid="readme-loading">
            <LoadingSpinner>Loading...</LoadingSpinner>
          </div>
        )}
        {/* Do not display error if the status is 400 (readme not found in backend). In that case, display a message.
            TODO: Update if structured errors are implemented.
        */}
        {readmeError &&
          ("status" in readmeError && readmeError.status === 400 ? (
            <div>No readme found</div>
          ) : (
            <RTKError error={readmeError} />
          ))}
        {readMe != null && (
          <div data-testid="readme">
            <Markdown>{readMe}</Markdown>
          </div>
        )}
      </div>
    );
  }
};

export default AddonPage;
