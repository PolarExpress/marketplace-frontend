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
import type { Addon } from "../../types/AddOnTypes";
import { AddonCategory } from "../../types/AddOnTypes";

// Sample add-on data
const mockAddOns: Addon[] = [
  {
    id: "1",
    name: "Mock Addon 1",
    summary: "Mock Summary 1",
    category: AddonCategory.VISUALISATION
  },
  {
    id: "2",
    name: "Mock Addon 2",
    summary: "Mock Summary 2",
    category: AddonCategory.VISUALISATION
  }
];

describe("AddOnList component", () => {
  it("renders AddOnCard components for all add-ons", () => {
    const mockState = { addons: { allAddOns: mockAddOns, searchTerm: "" } };

    const { getAllByTestId } = renderWithProviders(<AddOnList />, {
      preloadedState: mockState
    });

    // Expect two AddOnCard components to be rendered
    const addOnCards = getAllByTestId("addon-card");
    expect(addOnCards.length).toBe(2);
  });

  it("filters add-ons based on searchTerm", () => {
    const mockState = {
      addons: { allAddOns: mockAddOns, searchTerm: "mock addon 1" }
    };

    const { getAllByTestId } = renderWithProviders(<AddOnList />, {
      preloadedState: mockState
    });

    // Expect only one AddOnCard (the one matching the search term)
    const addOnCards = getAllByTestId("addon-card");
    expect(addOnCards.length).toBe(1);
  });
});
