import type { Meta, StoryObj } from "@storybook/react";
import AddOnCard from "../features/addonList/AddOnCard";
import type { Addon } from "../types/AddOnTypes";
import { AddonCategory } from "../types/AddOnTypes";
import { Provider } from "react-redux";
import { store } from "../app/store";

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
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addOn: {
      control: "object",
      description: "The add-on data to display"
    }
  }
} satisfies Meta<typeof AddOnCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sample add-ons representing different categories */
const sampleVisualisationAddOn: Addon = {
  id: "1",
  name: "ExampleVis",
  summary: "...",
  category: AddonCategory.VISUALISATION
};
const sampleMLAddOn: Addon = {
  id: "2",
  name: "ExampleML",
  summary: "...",
  category: AddonCategory.MACHINE_LEARNING
};
const sampleDataAPIAddOn: Addon = {
  id: "3",
  name: "ExampleData",
  summary: "...",
  category: AddonCategory.DATA_SOURCE
};

/**
 * Renders the AddOnCard with a sample add-on for the 'Visualization' category
 */
export const Visualisation: Story = {
  args: {
    addOn: sampleVisualisationAddOn
  },
  // Provides the Redux store for SearchBar to interact with
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

/**
 * Renders the AddOnCard with a sample add-on for the 'Machine Learning' category
 */
export const MachineLearning: Story = {
  args: {
    addOn: sampleMLAddOn
  },
  // Provides the Redux store for SearchBar to interact with
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

/**
 * Renders the AddOnCard with a sample add-on for the 'Data API' category
 */
export const DataAPI: Story = {
  args: {
    addOn: sampleDataAPIAddOn
  },
  // Provides the Redux store for SearchBar to interact with
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};
