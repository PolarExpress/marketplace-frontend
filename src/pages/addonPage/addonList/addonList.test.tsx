/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { describe, it, expect } from "vitest";
import { renderWithProviders } from "@polarexpress/test/utils";
import AddonList from "./addonList";
import { addonList } from "@polarexpress/mockData/addons";
import { server } from "@polarexpress/test/setup";
import { HttpResponse, http } from "msw";
import Header from "@polarexpress/components/header";
import { Routes, Route } from "react-router-dom";
import AddonPage from "../addonPage";
import HomePage from "@polarexpress/pages/homePage";

describe("AddonList component", () => {
  it("renders AddonCard components for all add-ons", async () => {
    const { findAllByTestId, findByText, getByText, getAllByText } =
      renderWithProviders(<AddonList />);

    expect(findByText("Loading...")).toBeDefined();

    const addOnCards = await findAllByTestId("addon-card");
    expect(addOnCards.length).toBe(addonList.length);

    for (const addon of addonList) {
      expect(getByText(addon.name)).toBeDefined();
      expect(
        getByText(addon.summary.split(" ").slice(0, 15).join(" "))
      ).toBeDefined();
      expect(getAllByText(`Author: ${addon.authorId}`)).toBeDefined();
    }
  });

  it("filters add-ons based on searchTerm", async () => {
    const { user, findAllByTestId, getByText, findByTestId } =
      renderWithProviders(
        <>
          <Header />
          <AddonList />
        </>
      );

    const search = await findByTestId("search-input");
    const submit = await findByTestId("search-submit");

    await user.type(search, "Vis1");

    await user.click(submit);

    await expect(findByTestId("list-loading")).rejects.toThrow();

    const addOnCards = await findAllByTestId("addon-card");

    expect(addOnCards.length).toBe(1);
    expect(
      getByText(addonList[0].summary.split(" ").slice(0, 15).join(" "))
    ).toBeDefined();
  });

  it("displays message when no addons are found with search term", async () => {
    const { findByText } = renderWithProviders(<AddonList />, {
      preloadedState: { addons: { searchTerm: "qwerty" } }
    });

    const message = await findByText(
      "No Add-ons found with the given search term"
    );
    expect(message).toBeDefined();
  });

  it("displays the returned error", async () => {
    const baseUrl = import.meta.env.VITE_API_BASE;

    // Setup specific msw handlers for returning errors
    server.use(
      http.post(`${baseUrl}/addons/get`, () => {
        return HttpResponse.error();
      })
    );
    const { findByTestId } = renderWithProviders(<AddonList />);

    await expect(findByTestId("fetch-error")).toBeDefined();
  });

  it("navigates to Home Page when submitted", async () => {
    const { user, findByTestId, getByRole } = renderWithProviders(
      <>
        <Header />
        <Routes>
          <Route path="/addons/:id" element={<AddonPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </>,
      {},
      [`/addons/${addonList[2]._id}`]
    );

    // Simulate clicking search button
    await user.click(getByRole("button", { name: "Search" }));

    // Assert that the homepage is rendered
    await expect(findByTestId("homepage")).toBeDefined();
  });
});
