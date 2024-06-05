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
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import {
  useGetAddonByIdQuery,
  useGetAddonReadmeByIdQuery
} from "./addonList/addonApi";

/**
 * Renders the individual page of an add-on. It retrieves information about the
 * add-on from the store and displays it.
 */
const AddonPage = () => {
  const { id: thisId } = useParams();
  const auth = useAuthorizationCache();

  // Fetching data from backend.
  const {
    data: addon,
    error: addonError,
    isLoading: isAddonLoading
  } = useGetAddonByIdQuery(thisId ?? "");
  const {
    data: readMe,
    error: readmeError,
    isLoading: isReadmeLoading
  } = useGetAddonReadmeByIdQuery(thisId ?? "", {
    // Fetching of the readme is skipped if the addon is not yet retrieved
    skip: addon === undefined
  });
  const {
    data: userAddons,
    error: userAddonsError,
    isLoading: userAddonsLoading
  } = useGetAddonsByUserId();

  const isCurrentAddonInstalled = userAddons?.some(
    addon => addon._id === thisId
  );
  useEffect(() => {
    setInstalled(isCurrentAddonInstalled ?? false);
  }, [isCurrentAddonInstalled]);

  // Managing installation.
  const install = useInstallAddon();
  const unInstall = useUninstallAddon();
  const [installed, setInstalled] = useState(isCurrentAddonInstalled ?? false);
  const [installationError, setInstallationError] = useState(false);

  /**
   * Checks if there is an error field in the given response, and displays the
   * error if there is one.
   *
   * @param   response    The reponse body to check for errors.
   * @param   isUninstall If the action was an install or uninstall.
   *
   * @returns             `true` if an error was found; otherwise `false`.
   */
  const checkError = (
    response: Record<string, unknown>,
    isUninstall: boolean
  ) => {
    if (response && "error" in response) {
      const word = (isUninstall ? "un" : "") + "installing";
      setInstallationError(true);

      // TODO: find something better than an alert.
      alert(
        `An error occurred while ${word} ${addon?.name}: ${response.error}`
      );
      return true;
    }
    return false;
  };

  /**
   * Handles the installation or uninstallation of the add-on. Changes the
   * internal installed state as well.
   */
  const handleInstall = async () => {
    if (!auth.authorized) {
      // TODO: Should redirect to the login page when it exists.
      console.warn("User is not logged in. Redirecting to login page.");

      return;
    }

    if (installed) {
      const response = await unInstall.attempt(thisId ?? "");

      if (checkError(response, true)) return;

      setInstalled(false);
    } else {
      const response = await install.attempt(thisId ?? "");

      if (checkError(response, false)) return;

      setInstalled(true);
    }
  };

  if (isAddonLoading)
    return (
      <div className="flex w-full justify-center" data-testid="addon-loading">
        <LoadingSpinner>Loading...</LoadingSpinner>
      </div>
    );
  if (addonError) return <RTKError error={addonError} />;
  if (userAddonsError)
    return <div data-testid="button-loading">{userAddonsError}</div>;
  if (!addon) return; //throw new Error("Unreachable code was reached.");

  return (
    <div className="m-8 font-sans leading-10" data-testid="addon-page">
      {/* Name, author and summary. */}
      <div className="mb-2 border-b-2 pb-2 text-center">
        <h1 className="text-4xl font-bold">{addon.name}</h1>
        <p className="text-sm font-light">{addon.authorId}</p>
        <p>{addon.summary}</p>

        {/* Install button. */}
        <div className="my-4 flex justify-center">
          <InstallButton
            authorized={auth.authorized ?? false}
            data-testid="install"
            handleClick={handleInstall}
            installPending={install.isPending}
            installationError={installationError}
            isAddonInstalled={installed}
            uninstallPending={unInstall.isPending}
            userAddonsLoading={userAddonsLoading}
          />
        </div>
      </div>

      {/* Readme. */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-3xl rounded-2xl border-2 p-4">
          {isReadmeLoading && (
            <div
              className="flex w-full justify-center"
              data-testid="readme-loading">
              <LoadingSpinner>Loading...</LoadingSpinner>
            </div>
          )}
          {readmeError &&
            ("status" in readmeError && readmeError.status === 400 ? (
              <div>No readme found</div>
            ) : (
              <RTKError error={readmeError} />
            ))}
          {readMe !== undefined && (
            <div className="markdown" data-testid="readme">
              <Markdown remarkPlugins={[remarkGfm]}>{readMe}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddonPage;
