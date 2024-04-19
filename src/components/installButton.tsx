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
interface InstallButtonProps {
  /** Indicates if the addon is currently installed. */
  isAddonInstalled: boolean;
  /** Indicates if an addon installation is in progress. */
  installPending: boolean;
  /** Indicates if an addon uninstallation is in progress. */
  uninstallPending: boolean;
  /** Indicates if the overall list of user addons is currently being loaded. */
  userAddonsLoading: boolean;
  /** Indicates if the user has the necessary authorization to interact with addons. */
  authorized: boolean;
  /** Function to be executed when the addon button is clicked. */
  handleClick: () => void;
}

/**
 * Renders the install button
 */
const InstallButton = ({
  isAddonInstalled,
  installPending,
  uninstallPending,
  userAddonsLoading,
  authorized,
  handleClick
}: InstallButtonProps) => {
  return (
    <button
      data-testid="install"
      className={
        isAddonInstalled
          ? "h-10 w-24 rounded-full border-2 border-orange-500 bg-white text-center text-orange-500 hover:shadow-md"
          : "h-10 w-24 rounded-full border-none bg-orange-500 text-center text-white hover:shadow-md"
      }
      onClick={handleClick}
      disabled={installPending || uninstallPending || userAddonsLoading}>
      {authorized
        ? isAddonInstalled
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

export default InstallButton;
