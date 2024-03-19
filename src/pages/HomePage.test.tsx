/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Testing imports
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders, storeWithMockAddons } from "../test/utils";

// Page import
import App from "../App";

describe("HomePage", () => {
  it("filters addons based on the search term", async () => {
    const store = storeWithMockAddons();
    renderWithProviders(<App />, { store }, ["/"]);

    const searchBar = (await screen.findByTestId(
      "search-bar"
    )) as HTMLInputElement;
    fireEvent.change(searchBar, { target: { value: "1" } });

    await screen.findByTestId("addon-card");

    expect(screen.getByText("Mock Addon 1")).toBeDefined();
    expect(screen.getByText("Mock Summary 1")).toBeDefined();

    expect(screen.getAllByTestId("addon-card").length).toBe(1);
  });
});
