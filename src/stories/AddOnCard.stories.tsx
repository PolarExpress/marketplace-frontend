import type { Meta, StoryObj } from "@storybook/react";
import AddOnCard from "../features/addonList/AddOnCard";
import type { Addon } from "../types/AddOnTypes";
import { AddonCategory } from "../types/AddOnTypes";
import { Provider } from "react-redux";
import { store } from "../app/store";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "frontend/AddOnCard",
  component: AddOnCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    addOn: {
      control: "object",
      description: "The add-on data to display"
    }
  }
} satisfies Meta<typeof AddOnCard>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Visualisation: Story = {
  args: {
    addOn: sampleVisualisationAddOn
  },
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

export const MachineLearning: Story = {
  args: {
    addOn: sampleMLAddOn
  },
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

export const DataAPI: Story = {
  args: {
    addOn: sampleDataAPIAddOn
  },
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};
