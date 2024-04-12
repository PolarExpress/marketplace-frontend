/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../../utils/test-utils";
import AddOnList from "./AddOnList";
import { addonList } from "../../temp/tempAddons";
import { server } from "../../setupTests";
import { HttpResponse, http } from "msw";

describe("AddOnList component", () => {
  it("renders AddOnCard components for all add-ons", async () => {
    const { findAllByTestId, findByText, getByText, getAllByText } =
      renderWithProviders(<AddOnList />);

    expect(findByText("Loading...")).toBeDefined();

    const addOnCards = await findAllByTestId("addon-card");
    expect(addOnCards.length).toBe(addonList.length);

    for (const addon of addonList) {
      expect(getByText(addon.name)).toBeDefined();
      expect(getByText(addon.summary.split(" ").slice(0, 15).join(" "))).toBeDefined();
      expect(getAllByText(`Author: ${addon.authorId}`)).toBeDefined();
    }
  });

  it("filters add-ons based on searchTerm", async () => {
    const { findAllByTestId, getByText } = renderWithProviders(<AddOnList />, {
      preloadedState: { addons: { searchTerm: addonList[0].name } }
    });

    const addOnCards = await findAllByTestId("addon-card");

    expect(addOnCards.length).toBe(1);
    expect(getByText(addonList[0].summary.split(" ").slice(0, 15).join(" "))).toBeDefined();
  });

  it("displays message when no addons are found with search term", async () => {
    const { findByText } = renderWithProviders(<AddOnList />, {
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
    const { findByTestId } = renderWithProviders(<AddOnList />);

    await expect(findByTestId("fetch-error")).toBeDefined();
  });
});
