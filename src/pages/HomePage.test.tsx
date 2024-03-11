import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../utils/test-utils";
import HomePage from "./HomePage";

describe("HomePage component", () => {
  it("renders the AddOnList component", () => {
    const { getByTestId } = renderWithProviders(<HomePage />);

    // Check if AddOnList is rendered
    const addOnList = getByTestId("addons-list");
    expect(addOnList).toBeInTheDocument();
  });
});
