/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import { Route, Routes } from "react-router-dom";
import { server } from "../setupTests";
import { HttpResponse, http } from "msw";

import AddOnPage from "./AddOnPage";
import { addonList } from "../temp/tempAddons";

const baseUrl = import.meta.env.VITE_API_BASE;

/**
 * Renders the individual page of an addon
 * @param id Id of addon to be rendered
 * @returns An object containing functions to query the rendered page
 */
const setupPageWithId = (id: string) => {
  return renderWithProviders(
    <Routes>
      <Route path="/addons/:id" element={<AddOnPage />} />
    </Routes>,
    {},
    [`/addons/${id}`]
  );
};

describe("AddOnPage", () => {
  it("renders the add-on information when found", async () => {
    const testAddon = addonList[0];

    const { findByTestId, getByTestId, getByText } = setupPageWithId(
      testAddon.id
    );

    //Addon loading is instantly visible, readme later
    expect(getByTestId("addon-loading")).toBeDefined();
    await expect(findByTestId("readme-loading")).toBeDefined();

    // Waits until the addon page is rendered
    await findByTestId("addon-page");

    expect(getByText(testAddon.name)).toBeDefined();
    expect(getByText(testAddon.author.user.name)).toBeDefined();
    expect(getByText(testAddon.summary)).toBeDefined();

    // Waits until loading has finished
    await expect(findByTestId("addon-loading")).rejects.toThrow();
    await expect(findByTestId("readme-loading")).rejects.toThrow();

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
    const { findByTestId } = setupPageWithId(addonList[0].id);

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
    const { findByTestId } = setupPageWithId(addonList[0].id);

    await expect(findByTestId("addon-page")).rejects.toThrow();
  });
});
