/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { describe, it, expect } from "vitest";
import { renderWithProviders } from "./utils/test-utils";
import App from "./App";

describe("App Component", () => {
  it("renders the Header and HomePage components", () => {
    // Render the App component
    const { getByTestId } = renderWithProviders(<App />);

    // Assert the Header component is rendered
    expect(getByTestId("header")).toBeInTheDocument();
    // Assert the HomePage component is rendered
    expect(getByTestId("homepage")).toBeInTheDocument();
  });
});
