/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { MemoryRouter } from "react-router-dom";
import { userEvent, within } from "@storybook/test";
import InstallButton from "../features/currentUser/InstallButton";
import { addonList } from "../temp/tempAddons";

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
  // Provides the redux store and browser router for the stories
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof InstallButton>;

// TODO: perform login to see differences between logged in and not logged in.
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders the SearchBar component in its basic state
 */
export const Basic: Story = {
  args: {
    addon: addonList[0]
  }
};

/**
 * Renders the SearchBar with a search term
 */
export const PerformInstall: Story = {
  args: {
    addon: addonList[0]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText("Install");

    await userEvent.click(button, {
      delay: 500
    });
  }
};

export const Hover: Story = {
  args: {
    addon: addonList[0]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText("Install");

    await userEvent.hover(button, {
      delay: 300
    });
  }
};
