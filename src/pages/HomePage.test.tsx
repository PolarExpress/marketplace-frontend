/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

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
