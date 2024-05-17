/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import {
  renderWithProviders,
  setupLongAddonListHandler
} from "@polarexpress/test/utils";
import Header from "@polarexpress/components/header";
import { shortAddonList } from "@polarexpress/mockData/addons";
import HomePage from "@polarexpress/pages/homePage";
import { server } from "@polarexpress/test/setup";
import { HttpResponse, http } from "msw";
import { Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import AddonPage from "../addonPage";
import AddonList from "./addonList";
import { AddonCategory } from "@polarexpress/types/addon";

const addonCardTestId = "addon-card";

describe("AddonList component", () => {
  it("renders AddonCard components for all add-ons", async () => {
    const { findAllByTestId, findByText, getByText } = renderWithProviders(
      <AddonList />
    );

    expect(findByText("Loading...")).toBeDefined();

    const addOnCards = await findAllByTestId(addonCardTestId);

    const visualisationAddons = shortAddonList.filter(
      addon => addon.category === AddonCategory.VISUALISATION
    );

    expect(addOnCards.length).toBe(visualisationAddons.length);

    for (const addon of visualisationAddons) {
      expect(getByText(addon.name)).toBeDefined();
      expect(
        getByText(addon.summary.split(" ").slice(0, 15).join(" "))
      ).toBeDefined();
      expect(getByText(`Author: ${addon.authorId}`)).toBeDefined();
    }
  });

  it("filters add-ons based on searchTerm", async () => {
    const { findAllByTestId, findByTestId, getByText, user } =
      renderWithProviders(
        <>
          <Header />
          <AddonList />
        </>
      );

    const search = await findByTestId("search-input");
    const submit = await findByTestId("search-submit");

    await user.type(search, shortAddonList[0].name);

    await user.click(submit);

    await expect(findByTestId("list-loading")).rejects.toThrow();

    const addOnCards = await findAllByTestId(addonCardTestId);

    expect(addOnCards.length).toBe(1);
    expect(
      getByText(shortAddonList[0].summary.split(" ").slice(0, 15).join(" "))
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

    expect(await findByTestId("fetch-error")).toBeDefined();
  });

  it("navigates to Home Page when submitted", async () => {
    const { findByTestId, getByRole, user } = renderWithProviders(
      <>
        <Header />
        <Routes>
          <Route element={<AddonPage />} path="/addons/:id" />
          <Route element={<HomePage />} path="/" />
        </Routes>
      </>,
      {},
      [`/addons/${shortAddonList[2]._id}`]
    );

    // Simulate clicking search button
    await user.click(getByRole("button", { name: "Search" }));

    // Assert that the homepage is rendered
    expect(await findByTestId("homepage")).toBeDefined();
  });

  it("correctly navigates between pages", async () => {
    setupLongAddonListHandler();

    const { findAllByTestId, findByText, user } = renderWithProviders(
      <AddonList />
    );

    let addOnCards = await findAllByTestId(addonCardTestId);

    expect(addOnCards.length).toBe(20);
    expect(await findByText("Addon1")).toBeDefined();
    expect(await findByText("Addon58")).toBeDefined();

    const nextButton = await findByText(">");
    await user.click(nextButton);

    addOnCards = await findAllByTestId(addonCardTestId);

    expect(addOnCards.length).toBe(20);
    expect(await findByText("Addon61")).toBeDefined();
    expect(await findByText("Addon118")).toBeDefined();

    const previousButton = await findByText("<");
    await user.click(previousButton);

    addOnCards = await findAllByTestId(addonCardTestId);

    expect(addOnCards.length).toBe(20);
    expect(await findByText("Addon1")).toBeDefined();
    expect(await findByText("Addon58")).toBeDefined();
  });

  /* eslint-disable jest/no-commented-out-tests */
  /*it("filters add-ons based on selected category", async () => {
    setupLongAddonListHandler();

    const { findAllByTestId, getByText, user } = renderWithProviders(
      <AddonList />
    );

    await findAllByTestId(addonCardTestId);

    await user.click(getByText("MACHINE LEARNING"));

    const addOnCards = await findAllByTestId(addonCardTestId);

    const addOns = addOnCards.map(card => {
      const nameElement = card.querySelector("h1");
      const name = nameElement ? nameElement.textContent : "";
      return longAddonList.find(addon => addon.name === name);
    });

    for (const addon of addOns) {
      expect(addon?.category).toBe(AddonCategory.MACHINE_LEARNING);
    }
  });*/
  /* eslint-enable jest/no-commented-out-tests */

  it("displays the filterError when an error occurs during filtering", async () => {
    const baseUrl = import.meta.env.VITE_API_BASE;

    // Setup specific msw handlers for returning errors during filtering
    server.use(
      http.post(`${baseUrl}/addons/get`, async ({ request }) => {
        const { searchTerm } = (await request.json()) as {
          searchTerm?: string;
        };
        if (searchTerm) {
          return HttpResponse.error();
        }
        return HttpResponse.json({ addons: shortAddonList });
      })
    );

    const { findByTestId, user } = renderWithProviders(
      <>
        <Header />
        <AddonList />
      </>
    );

    const search = await findByTestId("search-input");
    const submit = await findByTestId("search-submit");

    await user.type(search, shortAddonList[0].name);
    await user.click(submit);

    expect(await findByTestId("fetch-error")).toBeDefined();
  });
});
