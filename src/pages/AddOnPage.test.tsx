/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */
import { describe, it, expect } from "vitest";
import { server } from "../setupTests";
import { HttpResponse, http } from "msw";
import { setupPageWithId } from "../utils/test-utils";

import { addonList } from "../temp/tempAddons";

const baseUrl = import.meta.env.VITE_API_BASE;

describe("AddOnPage", () => {
  it("renders the add-on information when found", async () => {
    const testAddon = addonList[0];

    const { findByTestId, getByTestId, getByText } = setupPageWithId(
      testAddon._id
    );

    expect(getByTestId("addon-loading")).toBeDefined();

    await findByTestId("addon-page");
    await findByTestId("readme");

    expect(getByText(testAddon.name)).toBeDefined();
    expect(getByText(testAddon.author.userId)).toBeDefined();
    expect(getByText(testAddon.summary.split(" ").slice(0, 15).join(" "))).toBeDefined();
    expect(getByText(`README for ${testAddon.name}`)).toBeDefined();
  });

  it("displays the returned error", async () => {
    // Setup specific msw handlers for returning errors
    server.use(
      http.post(`${baseUrl}/addons/get-by-id`, () => {
        return HttpResponse.error();
      }),
      http.post(`${baseUrl}/addons/get-readme`, () => {
        return HttpResponse.error();
      })
    );
    const { findByTestId } = setupPageWithId(addonList[0]._id);

    // Checks if fetching of readme is skipped when addon doesn't load
    await expect(findByTestId("readme-loading")).rejects.toThrow();

    await expect(findByTestId("fetch-error")).toBeDefined();
  });

  it("does not attempt to render the addon when it has no data", async () => {
    // Setup specific msw handlers for returning errors
    server.use(
      http.post(`${baseUrl}/addons/get-by-id`, () => {
        return HttpResponse.json({ addons: null });
      })
    );
    const { findByTestId } = setupPageWithId(addonList[0]._id);

    await expect(findByTestId("addon-page")).rejects.toThrow();
  });
});
