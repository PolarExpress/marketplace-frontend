/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import * as hooks from "@polarexpress/dataAccess/broker/hooks";
import { shortAddonList } from "@polarexpress/mockData/addons";
import {
  addInstalled,
  getInstalled,
  initializeInstalled
} from "@polarexpress/test/mockingUtils";
import { setupPageWithId } from "@polarexpress/test/utils";
import { waitFor } from "@testing-library/react";

describe("InstallButton", () => {
  const testAddon = shortAddonList[0];

  beforeEach(() => {
    initializeInstalled();
  });

  /**
   * Sets up the InstallButton component for testing.
   *
   * @param   authorized If the page should be rendered with authorisation.
   *
   * @returns            A promise that resolves to an object containing the
   *   user event and the button element.
   */
  const setupButton = async (authorized: boolean = true) => {
    const { findByTestId, getByTestId, user } = setupPageWithId(
      testAddon._id,
      authorized
    );

    await expect(findByTestId("button-loading")).rejects.toThrow();

    const button = getByTestId("install") as HTMLButtonElement;
    return { button, getByTestId, user };
  };

  it('shows "Install" when addon is NOT installed', async () => {
    const { button } = await setupButton();

    expect(button.textContent).toBe("Install");
    expect(button.disabled).toBe(false);
  });

  it('shows "Uninstall" when addon is installed', async () => {
    addInstalled(testAddon);

    const { button } = await setupButton();

    expect(button.textContent).toBe("Uninstall");
    expect(button.disabled).toBe(false);
  });

  it("updates the installed addons correctly on button click", async () => {
    const { button, user } = await setupButton();

    await user.click(button);

    expect(getInstalled().map(addon => addon._id)).toStrictEqual([
      testAddon._id
    ]);

    await user.click(button);

    expect(getInstalled().map(addon => addon._id)).not.toStrictEqual([
      testAddon._id
    ]);
  });

  it('shows "Installing..." when installation is in progress', async () => {
    vi.spyOn(hooks, "useInstallAddon").mockReturnValue({
      error: undefined,
      installAddon: vi.fn(),
      isPending: true
    });

    const { button } = await setupButton();

    expect(button.textContent).toBe("Installing...");
    expect(button.disabled).toBe(true);
  });

  it('shows "Uninstalling..." when uninstallation is in progress', async () => {
    addInstalled(testAddon);

    vi.spyOn(hooks, "useUninstallAddon").mockReturnValue({
      error: undefined,
      isPending: true,
      uninstallAddon: vi.fn()
    });

    const { button } = await setupButton();

    expect(button.textContent).toBe("Uninstalling...");
    expect(button.disabled).toBe(true);
  });

  it("properly increments and decrements install count", async () => {
    const { button, getByTestId, user } = await setupButton();

    await user.click(button);

    waitFor(() => {
      expect(getByTestId("install-count")).toHaveTextContent("1 installs");
    });

    await user.click(button);

    waitFor(() => {
      expect(getByTestId("install-count")).toHaveTextContent("0 installs");
    });
  });

  it('shows "Login to install" when user is not authorized', async () => {
    const { button } = await setupButton(false);

    expect(button.textContent).toBe("Login to install");
    expect(button.disabled).toBe(false);
  });

  it("renders the correct error", async () => {
    vi.spyOn(hooks, "useGetAddonsByUserId").mockReturnValue({
      data: undefined,
      error: "Install error",
      isLoading: false
    });

    const { findByTestId, getByText } = setupPageWithId(testAddon._id);

    await expect(findByTestId("install-loading")).rejects.toThrow();

    expect(getByText("Install error")).toBeDefined();
  });
});
