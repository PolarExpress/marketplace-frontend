/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { shortAddonList } from "@polarexpress/mockData/addons";
import { addInstalled, removeInstalled } from "@polarexpress/test/mockingUtils";
import { server } from "@polarexpress/test/setup";
import { setupPageWithId } from "@polarexpress/test/utils";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";

const baseUrl = import.meta.env.VITE_API_BASE;

describe("AddonPage", () => {
  it("renders the add-on information when found", async () => {
    const testAddon = shortAddonList[0];

    const { findByTestId, getByTestId, getByText } = setupPageWithId(
      testAddon._id
    );

    expect(getByTestId("addon-loading")).toBeDefined();

    await findByTestId("addon-page");
    await findByTestId("readme");

    expect(getByText(testAddon.name)).toBeDefined();
    expect(getByText(testAddon.author.userId)).toBeDefined();
    expect(
      getByText(testAddon.summary.split(" ").slice(0, 15).join(" "))
    ).toBeDefined();
    expect(getByText(`README for ${testAddon.name}`)).toBeDefined();
  });

  it("displays the returned error", async () => {
    server.use(
      http.post(`${baseUrl}/addons/get-by-id`, () => {
        return HttpResponse.error();
      }),
      http.post(`${baseUrl}/addons/get-readme`, () => {
        return HttpResponse.error();
      })
    );
    const { findByTestId } = setupPageWithId(shortAddonList[0]._id);

    await expect(findByTestId("readme-loading")).rejects.toThrow();

    expect(await findByTestId("fetch-error")).toBeDefined();
  });

  it("does not attempt to render the addon when it has no data", async () => {
    server.use(
      http.post(`${baseUrl}/addons/get-by-id`, () => {
        return HttpResponse.json({ addons: undefined });
      })
    );
    const { findByTestId } = setupPageWithId(shortAddonList[0]._id);

    await expect(findByTestId("addon-page")).rejects.toThrow();
  });

  it("displays an error if installing fails", async () => {
    const testAddon = shortAddonList[0];

    const { findByTestId, getByTestId, user } = setupPageWithId(testAddon._id);

    await findByTestId("addon-page"); // Wait for page to load.

    addInstalled(testAddon); // Simulate an error response.

    const button = getByTestId("install");
    const alertSpy = vitest.spyOn(window, "alert").mockImplementation(() => {});

    await user.click(button);

    expect(alertSpy).toBeCalledTimes(1);
    expect(button.textContent).toContain("Retry");

    removeInstalled(testAddon._id);

    await user.click(button);

    // Now the installation should succeed.
    expect(alertSpy).toBeCalledTimes(1);
    expect(button.textContent).not.toContain("Retry");
  });
});
