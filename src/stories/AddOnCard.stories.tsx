/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";
import AddOnCard from "../features/addonList/AddOnCard";
import type { Addon } from "../types/AddOnTypes";
import { AddonCategory } from "../types/AddOnTypes";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { MemoryRouter } from "react-router-dom";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/**
 * Provides configuration and metadata for Storybook stories related to the SearchBar component.
 */
const meta = {
  title: "frontend/AddOnCard",
  component: AddOnCard,
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
        <MemoryRouter> {Story()} </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof AddOnCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sample add-ons representing different categories */
const sampleAddOn: Addon = {
  id: "1",
  name: "ExampleVis",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  category: AddonCategory.VISUALISATION
};

/**
 * Renders the AddOnCard with a sample add-on for the 'Visualization' category
 */
export const Basic: Story = {
  args: {
    addOn: sampleAddOn
  }
};
