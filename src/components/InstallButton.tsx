/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/**
 * Properties for the InstallButton component.
 * @property {boolean} isAddonInstalled - Indicates if the addon is currently installed.
 * @property {boolean} installPending - Indicates if an addon installation is in progress.
 * @property {boolean} uninstallPending - Indicates if an addon uninstallation is in progress.
 * @property {boolean} userAddonsLoading - Indicates if the overall list of user addons is currently being loaded.
 * @property {boolean} authorized - Indicates if the user has the necessary authorization to interact with addons.
 * @property {() => void} handleClick - Function to be executed when the addon button is clicked.
 */
interface InstallButtonProps {
  isAddonInstalled: boolean;
  installPending: boolean;
  uninstallPending: boolean;
  userAddonsLoading: boolean;
  authorized: boolean;
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
    <button className= {isAddonInstalled === true ? "hover:shadow-md text-orange-500 text-center bg-white h-10 w-24 border-2 border-orange-500" : "hover:shadow-md text-white text-center border-none bg-orange-500 h-10 w-24"}
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
