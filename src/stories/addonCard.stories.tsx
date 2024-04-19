/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";

import { store } from "@polarexpress/dataAccess/store/store";
import { addonList } from "@polarexpress/mockData/addons";
import AddonCard from "@polarexpress/pages/addonPage/addonList/addonCard";
import { userEvent, within } from "@storybook/test";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/**
 * Provides configuration and metadata for Storybook stories related to the SearchBar component.
 */
const meta = {
  component: AddonCard,
  // Provides the redux store and browser router for the stories
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter> {Story()} </MemoryRouter>
      </Provider>
    )
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  title: "frontend/AddonCard"
} satisfies Meta<typeof AddonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders the AddonCard with a sample add-on for the 'Visualization' category
 */
export const Basic: Story = {
  args: {
    addOn: addonList[1]
  }
};

/**
 * Renders the AddonCard with the mouse hovered over it
 */
export const Hover: Story = {
  args: {
    addOn: addonList[1]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByTestId("addon-card");
    await userEvent.hover(card, {
      delay: 100
    });
  }
};
