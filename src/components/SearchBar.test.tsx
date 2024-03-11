import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import SearchBar from "../components/SearchBar";
import type { RootState } from "../app/store";
import { addOnActions } from "../features/addonList/AddOnSlice";

describe("SearchBar Component", () => {
  it("updates the search term state on input change", async () => {
    // Rendering the component with Redux Provider
    const { user, getByPlaceholderText } = renderWithProviders(<SearchBar />);
    const input = getByPlaceholderText("Search add-ons...");

    // Simulating a user typing 'test' into the input field
    await user.type(input, "test");

    // Asserting that the input's value is updated to 'test'
    expect(input).toHaveValue("test");
  });

  it("dispatches the updateSearchTerm action on form submission", async () => {
    const preloadedState: Partial<RootState> = {
      addons: {
        allAddOns: [],
        searchTerm: ""
      }
    };
    // Rendering the component with Redux Provider
    const { user, getByPlaceholderText, getByRole, store } =
      renderWithProviders(<SearchBar />, { preloadedState });

    // Mocking the dispatch for assertions
    const spyDispatch = vi.spyOn(store, "dispatch");

    // Getting the input and form elements
    const input = getByPlaceholderText("Search add-ons...");
    const button = getByRole("button", { name: "Search" });

    // Simulating typing into the input and clicking the form submit
    await user.type(input, "test");
    await user.click(button);

    // Asserting that the action is correctly dispatched and store is correctly updated
    const state = store.getState();
    expect(spyDispatch).toHaveBeenCalledOnce();
    expect(spyDispatch).toHaveBeenCalledWith(
      addOnActions.updateSearchTerm("test")
    );
    expect(state.addons.searchTerm).toBe("test");
  });
});
