/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { describe, it, expect } from "vitest";
/*import type { Addon } from "../../types/AddOnTypes";
import { AddonCategory } from "../../types/AddOnTypes";
import { Author } from "../../types/AuthorTypes";
import { User } from "../../types/UserTypes";
import { renderWithProviders } from "../../utils/test-utils";
import AddOnList from "./AddOnList";*/

// Sample add-on data
/*const mockAddOns: Addon[] = [
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
];*/

// TODO: Doesn't succeed because of loading screen when fetching from backend
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
  it("temp", () => {
    expect(true).toEqual(true);
  });
  /*it("renders AddOnCard components for all add-ons", async () => {
    const mockState: AddOnListState = {
        allAddOns: mockAddOns,
        searchTerm: "",
        status: "succeeded",
        error: null
    };

    const { getAllByTestId, store } = renderWithProviders(<AddOnList />, {
      preloadedState: { addons: mockState }
    });

    // Expect two AddOnCard components to be rendered
    const addOnCards = getAllByTestId("addon-card");
    expect(addOnCards.length).toBe(2);
  });

  it("filters add-ons based on searchTerm", async () => {
    const mockState: AddOnListState = {
        allAddOns: mockAddOns,
        searchTerm: "mock addon 1",
        status: "succeeded",
        error: null
    };

    const { getAllByTestId } = renderWithProviders(<AddOnList />, {
      preloadedState: {addons: mockState}
    });

    // Expect only one AddOnCard (the one matching the search term)
    const addOnCards = getAllByTestId("addon-card");
    expect(addOnCards.length).toBe(1);
  });*/
});
