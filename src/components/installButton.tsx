/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/**
 * Properties for the InstallButton component.
 */
interface InstallButtonProperties {
  /**
   * Indicates if the user has the necessary authorization to interact with
   * addons.
   */
  authorized: boolean;
  /**
   * Function to be executed when the addon button is clicked.
   */
  handleClick: () => void;
  /**
   * Indicates if an addon installation is in progress.
   */
  installPending: boolean;
  /**
   * Indicates if an error has occurred with installation.
   */
  installationError: boolean;
  /**
   * Indicates if the addon is currently installed.
   */
  isAddonInstalled: boolean;
  /**
   * Indicates if an addon uninstallation is in progress.
   */
  uninstallPending: boolean;
  /**
   * Indicates if the overall list of user addons is currently being loaded.
   */
  userAddonsLoading: boolean;
}

/**
 * Renders the install button.
 */
const InstallButton = ({
  authorized,
  handleClick,
  installPending,
  installationError,
  isAddonInstalled,
  uninstallPending,
  userAddonsLoading
}: InstallButtonProperties) => {
  let buttonText: string;

  if (authorized) {
    if (isAddonInstalled) {
      buttonText = uninstallPending ? "Uninstalling..." : "Uninstall";
    } else {
      buttonText = installPending ? "Installing..." : "Install";
    }
  } else {
    buttonText = "Login to install";
  }

  return (
    <button
      className={
        "h-10 w-fit px-4 rounded-full text-center hover:shadow-md " +
        (isAddonInstalled
          ? "border-2 border-orange-500 bg-white text-orange-500"
          : "bg-orange-500 text-white")
      }
      data-testid="install"
      disabled={installPending || uninstallPending || userAddonsLoading}
      onClick={handleClick}>
      {(installationError ? "Retry " : "") + buttonText}
    </button>
  );
};

export default InstallButton;
