import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import SearchBar from "../components/SearchBar";
import type { RootState } from "../app/store";

describe("SearchBar Component", () => {
  it("renders correctly", async () => {
    // Rendering the component with Redux Provider
    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <SearchBar />
    );

    // Asserting that the input field is present in the document
    expect(getByPlaceholderText("Search add-ons...")).toBeInTheDocument();
    // Asserting that the search button is present in the document
    expect(getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

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

    // Getting the input and form elements
    const input = getByPlaceholderText("Search add-ons...");
    const button = getByRole("button", { name: "Search" });

    // Simulating typing into the input and clicking the form submit
    await user.type(input, "test");
    await user.click(button);

    // Asserting that the state is correctly updated
    const state = store.getState();
    expect(state.addons.searchTerm).toBe("test");
  });
});
