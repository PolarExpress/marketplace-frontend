/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Testing imports
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { renderWithProviders, storeWithMockAddons } from "../test/utils";

// Page import
import AddOnPage from "./AddOnPage";

function setupPageWithId(id: string) {
  const store = storeWithMockAddons();

  renderWithProviders(
    <Routes>
      <Route path="/addons/:id" element={<AddOnPage />} />
    </Routes>
  , { store }, [`/addons/${id}`]);
}

describe("AddOnPage", () => {
  it("renders the add-on information when found", async () => {
    // Render the Add-on Page starting at route "/addons/1" using the mocked state
    setupPageWithId("1");

    await screen.findByTestId("addon-page");

    expect(screen.getByText("Mock Addon 1")).toBeDefined();
    expect(screen.getByText("Mock Summary 1")).toBeDefined();
  });

  it('renders "Add-on not found" if the add-on is not in the store', async () => {
    // Render the Add-on Page starting at route "/addons/3" (does not exist) using the mocked state
    setupPageWithId("3")

    await screen.findByTestId("addon-not-found");

    expect(screen.getByText("Add-on not found")).toBeDefined();
  });
});
