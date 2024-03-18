/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { describe, it, expect } from "vitest";
import { renderWithProviders, storeWithMockAddons } from "../utils/test-utils";
import SearchBar from "../components/SearchBar";
import { type RootState } from "../app/store";
import { updateSearchTerm } from "../features/addonList/AddOnSlice";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import AddOnPage from "../pages/AddOnPage";
import HomePage from "../pages/HomePage";
import userEvent from "@testing-library/user-event";

describe("SearchBar Component", () => {
  it("updates the search term state on input change", async () => {
    // Rendering the component with Redux Provider
    const { user, getByPlaceholderText } = renderWithProviders(<SearchBar />);

    const searchInput = getByPlaceholderText(
      "Search add-ons..."
    ) as HTMLInputElement;

    // Simulating a user typing 'test' into the input field
    await user.type(searchInput, "test");

    // Asserting that the input's value is updated to 'test'
    expect(searchInput.value).toBe("test");
  });

  it("dispatches the updateSearchTerm action on button click", async () => {
    const preloadedState: Partial<RootState> = {
      addons: {
        searchTerm: ""
      }
    };
    // Rendering the component with Redux Provider
    const { user, getByPlaceholderText, getByRole, store } =
      renderWithProviders(<SearchBar />, { preloadedState });

    // Spying the dispatch for assertions
    const spyDispatch = vi.spyOn(store, "dispatch");

    // Getting the input and form elements
    const searchInput = getByPlaceholderText("Search add-ons...");
    const searchButton = getByRole("button", { name: "Search" });

    // Simulating typing into the input and clicking the form submit
    await user.type(searchInput, "test");
    await user.click(searchButton);

    // Asserting that the action is correctly dispatched and state is updated
    const state = store.getState();
    expect(spyDispatch).toHaveBeenCalledOnce();
    expect(spyDispatch).toHaveBeenCalledWith(updateSearchTerm("test"));
    expect(state.addons.searchTerm).toBe("test");
  });

  it("navigates to Home Page when submitted", async () => {
    // Create store with a mocked state
    const store = storeWithMockAddons();

    // Render the Header starting at route "/addons/2" using the mocked state
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/addons/2"]}>
          <Header />
          <Routes>
            <Route path="/addons/:id" element={<AddOnPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Simulate clicking search button
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    // Assert that the homepage is rendered
    expect(screen.getByTestId("homepage")).toBeDefined();
  });
});
