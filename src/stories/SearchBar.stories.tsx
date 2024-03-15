/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "../components/SearchBar";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { MemoryRouter } from "react-router-dom";

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
