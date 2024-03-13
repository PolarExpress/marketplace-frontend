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
import { Author } from "../../types/AuthorTypes";
import { User } from "../../types/UserTypes";

describe("AddOnList component", () => {
  // Sample add-on data
  const mockUsers: User[] = [
    {
      id: "user1",
      name: "User One",
      email: "userone@gmail.com",
    },
    {
      id: "user2",
      name: "User Two",
      email: "usertwo@gmail.com",
    },
    {
      id: "user3",
      name: "User Three",
      email: "userthree@gmail.com",
    }
  ]
  const mockAuthors: Author[] = [
    {
      id: "author1",
      user: mockUsers[1]
    },
    {
      id: "author2",
      user: mockUsers[2]
    }
  ]
  const mockAddOns: Addon[] = [
    {
      id: "1",
      name: "Mock Addon 1",
      summary: "Mock Summary 1",
      category: AddonCategory.VISUALISATION,
      author: mockAuthors[0]
    },
    {
      id: "2",
      name: "Mock Addon 2",
      summary: "Mock Summary 2",
      category: AddonCategory.VISUALISATION,
      author: mockAuthors[1]
    }
  ];

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
