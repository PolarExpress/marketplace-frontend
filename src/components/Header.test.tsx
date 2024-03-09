import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import Header from "./Header";

describe("Header", () => {
  it("renders the SearchBar component", () => {
    // Rendering the component with Redux Provider
    const { getByPlaceholderText } = renderWithProviders(<Header />);

    // Check if SearchBar is rendered
    const searchInput = getByPlaceholderText("Search add-ons...");
    expect(searchInput).toBeInTheDocument();
  });
});
