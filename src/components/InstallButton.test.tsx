/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { addonList } from "../temp/tempAddons";
import {
  initializeInstalled,
  deleteInstalledList,
  addInstalled,
  getInstalled
} from "../utils/mocking-utils";
import { setupPageWithId } from "../utils/test-utils";
import * as hooks from "../broker/hooks";

describe("InstallButton", () => {
  const testAddon = addonList[0];

  beforeEach(() => {
    initializeInstalled();
  });

  afterEach(() => {
    deleteInstalledList();
  });

  /**
   * Sets up the InstallButton component for testing.
   * @returns {Promise<{ user: UserEvent, button: HTMLButtonElement }>} A promise that resolves to an object containing the user event and the button element.
   */
  const setupButton = async () => {
    const { user, findByTestId, getByTestId } = setupPageWithId(testAddon._id);
    await expect(findByTestId("addon-loading")).rejects.toThrow();
    const button = getByTestId("install") as HTMLButtonElement;
    return { user, button };
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
    const { user, button } = await setupButton();

    await user.click(button);
    expect(getInstalled()).toContainEqual(testAddon);

    await user.click(button);
    expect(getInstalled()).not.toContainEqual(testAddon);
  });

  it("renders the correct error", async () => {
    vi.spyOn(hooks, "useGetAddonsByUserId").mockReturnValue({
      data: null,
      isLoading: false,
      error: "Install error"
    });

    const { findByTestId, getByText } = setupPageWithId(testAddon._id);
    await expect(findByTestId("addon-loading")).rejects.toThrow();

    expect(getByText("Install error")).toBeDefined();
  });
});
