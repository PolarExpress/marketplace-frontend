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
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    placeholder: {
      control: "text",
      description: "The placeholder text within the search input"
    },
    value: {
      control: "text",
      description: "The current value displayed in the search input"
    },
    isFocused: {
      control: "boolean",
      description: "Whether the search input has focus"
    },
    onChange: {
      action: "changed",
      description: "Function called when the input value changes"
    }
  }
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders the SearchBar component in its basic state without focus and a placeholder.
 */
export const Basic: Story = {
  args: {
    placeholder: "Search add-ons...",
    isFocused: false
  },
  // Provides the Redux store for SearchBar to interact with
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

/**
 * Renders the SearchBar component in a focused state, ready for user input.
 */
export const Focused: Story = {
  args: {
    placeholder: "Search add-ons...",
    isFocused: true
  },
  // Provides the Redux store for SearchBar to interact with
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

/**
 * Renders the SearchBar component with a pre-populated search term.
 */
export const WithValue: Story = {
  args: {
    placeholder: "Search add-ons...",
    isFocused: true,
    value: "ExampleVis"
  },
  // Provides the Redux store for SearchBar to interact with
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};
