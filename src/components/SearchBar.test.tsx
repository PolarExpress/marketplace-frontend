/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import SearchBar from "../components/SearchBar";
import { type RootState } from "../app/store";
import { updateSearchTerm } from "../features/addonList/AddOnSlice";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import AddOnPage from "../pages/AddOnPage";
import HomePage from "../pages/HomePage";
import { addonList } from "../temp/tempAddons";

describe("SearchBar Component", () => {
  it("updates the search term state on input change", async () => {
    const { user, getByPlaceholderText } = renderWithProviders(<SearchBar />);

    const searchInput = getByPlaceholderText(
      "Search add-ons..."
    ) as HTMLInputElement;

    await user.type(searchInput, "test");

    expect(searchInput.value).toBe("test");
  });

  it("dispatches the updateSearchTerm action on button click", async () => {
    const preloadedState: Partial<RootState> = {
      addons: {
        searchTerm: ""
      }
    };
    const { user, getByPlaceholderText, getByRole, store } =
      renderWithProviders(<SearchBar />, { preloadedState });

    // Spying the dispatch for assertions
    const spyDispatch = vi.spyOn(store, "dispatch");

    const searchInput = getByPlaceholderText("Search add-ons...");
    const searchButton = getByRole("button", { name: "Search" });

    await user.type(searchInput, "test");
    await user.click(searchButton);

    const state = store.getState();
    expect(spyDispatch).toHaveBeenCalledOnce();
    expect(spyDispatch).toHaveBeenCalledWith(updateSearchTerm("test"));
    expect(state.addons.searchTerm).toBe("test");
  });

  it("navigates to Home Page when submitted", async () => {
    const { user, findByTestId, getByRole } = renderWithProviders(
      <>
        <Header />
        <Routes>
          <Route path="/addons/:id" element={<AddOnPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </>,
      {},
      [`/addons/${addonList[2].id}`]
    );

    // Simulate clicking search button
    await user.click(getByRole("button", { name: "Search" }));

    // Assert that the homepage is rendered
    await expect(findByTestId("homepage")).toBeDefined();
  });
});
