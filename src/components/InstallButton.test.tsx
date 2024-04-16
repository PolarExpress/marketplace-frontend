/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { addonList } from "@polarexpress/mockData/addons";
import {
  initializeInstalled,
  deleteInstalledList,
  addInstalled,
  getInstalled
} from "@polarexpress/test/mockingUtils";
import { setupPageWithId } from "@polarexpress/test/testUtils";
import * as hooks from "@polarexpress/dataAccess/broker/hooks";

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
   * @returns A promise that resolves to an object containing the user event and the button element.
   */
  const setupButton = async () => {
    const { user, findByTestId, getByTestId } = setupPageWithId(testAddon._id);
    await expect(findByTestId("button-loading")).rejects.toThrow();
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
    await expect(findByTestId("install-loading")).rejects.toThrow();

    expect(getByText("Install error")).toBeDefined();
  });
});
