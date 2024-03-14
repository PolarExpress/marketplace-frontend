/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";
import { AddonCategory, type Addon } from "../types/AddOnTypes";
import { Provider } from "react-redux";
import { store } from "../app/store";
import InstallButton from "../features/currentUser/InstallButton";

const sampleAddon: Addon = {
  id: "addon1",
  name: "Sample Add-On",
  summary: "This is a simple sample add-on.",
  category: AddonCategory.VISUALISATION
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/**
 * Provides configuration and metadata for Storybook stories related to the SearchBar component.
 */
const meta = {
  title: "frontend/InstallButton",
  component: InstallButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addon: {
      control: "object",
      description: "The add-on for which the install button should work."
    }
  }
} satisfies Meta<typeof InstallButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders the InstallButton component in its basic state.
 */
export const Basic: Story = {
  args: {
    addon: sampleAddon
  },
  // Provides the Redux store to interact with.
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};
