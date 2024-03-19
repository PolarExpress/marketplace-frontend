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

function setupPageWithId(id: string) {
  return renderWithProviders(
    <Routes>
      <Route path="/addons/:id" element={<AddOnPage />} />
    </Routes>,
    {},
    [`/addons/${id}`]
  );
}

describe("AddOnPage", () => {
  it("renders the add-on information when found", async () => {
    const { findByTestId, getByTestId, findByText, getByText } =
      setupPageWithId(addonList[0].id);

    //Addon loading starts instantly, readme later
    expect(getByTestId("addon-loading")).toBeDefined();
    await expect(findByTestId("readme-loading")).toBeDefined();

    // Waits until the addon page is rendered
    await findByTestId("addon-page");

    expect(getByText(addonList[0].name)).toBeDefined();
    expect(getByText(addonList[0].author.user.name)).toBeDefined();
    expect(getByText(addonList[0].summary)).toBeDefined();

    await expect(findByTestId("addon-loading")).rejects.toThrow();
    await expect(findByTestId("readme-loading")).rejects.toThrow();

    await expect(findByText("readme")).toBeDefined();
  });
  it("displays the returned error", async () => {
    // Setup specific msw handlers for returning errors
    server.use(
      http.get(`${baseUrl}/addons/:id`, () => {
        return HttpResponse.error();
      }),
      http.get(`${baseUrl}/addons/:id/readme`, () => {
        return HttpResponse.error();
      })
    );
    const { findByTestId } = setupPageWithId(addonList[0].id);

    // Checks if fetching of readme is skipped when addon doesn't load
    await expect(findByTestId("readme-loading")).rejects.toThrow();

    await expect(findByTestId("fetch-error")).toBeDefined();
  });
});
