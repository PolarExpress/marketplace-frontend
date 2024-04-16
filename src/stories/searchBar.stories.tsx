/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { SearchBar } from "@polarexpress/components";
import { store } from "@polarexpress/dataAccess/store";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/**
 * Provides configuration and metadata for Storybook stories related to the SearchBar component.
 */
const meta = {
  title: "frontend/SearchBar",
  component: SearchBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Provides the redux store and browser router for the stories
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders the SearchBar component in its basic state
 */
export const Basic: Story = {};

/**
 * Renders the SearchBar with a search term
 */
export const WithSearchTerm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search add-ons...");
    await userEvent.type(searchInput, "test", {
      delay: 200
    });
  }
};

/**
 * Renders the SearchBar with the mouse hovered over the search input
 */
export const HoverInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search add-ons...");
    await userEvent.hover(searchInput, {
      delay: 100
    });
  }
};

/**
 * Renders the SearchBar with the mouse hovered over the search button
 */
export const HoverSearch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchButton = canvas.getByRole("button", { name: "Search" });
    await userEvent.hover(searchButton, {
      delay: 100
    });
  }
};
