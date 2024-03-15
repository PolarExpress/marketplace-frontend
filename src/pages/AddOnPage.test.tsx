/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { render, screen } from "@testing-library/react";
import AddOnPage from "./AddOnPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { storeWithMockAddons } from "../utils/test-utils";

describe("AddOnPage", () => {
  it("renders the add-on information when found", () => {
    const store = storeWithMockAddons();

    // Render the Add-on Page starting at route "/addons/1" using the mocked state
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/addons/1"]}>
          <Routes>
            <Route path="/addons/:id" element={<AddOnPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Assert wether the add-on page correctly retrieves the information from its parameters
    expect(screen.getByText("Mock Addon 1")).toBeDefined();
    expect(screen.getByText("Mock Summary 1")).toBeDefined();
  });
  it('renders "Add-on not found" if the add-on is not in the store', () => {
    const store = storeWithMockAddons();

    // Render the Add-on Page starting at route "/addons/3" (does not exist) using the mocked state
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/addons/3"]}>
          <Routes>
            <Route path="/addons/:id" element={<AddOnPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Add-on not found")).toBeDefined();
  });
});
