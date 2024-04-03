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
import InstallButton from "../components/InstallButton";
import { userEvent, within } from "@storybook/test";

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
        <MemoryRouter> {Story()} </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof InstallButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders the InstallButton component when the addon is not installed and the user is authorized.
 */
export const NotInstalled: Story = {
  args: {
    isAddonInstalled: false,
    installPending: false,
    uninstallPending: false,
    userAddonsLoading: false,
    authorized: true
  }
};

/**
 * Renders the InstallButton component when the addon is currently being installed.
 */
export const Installing: Story = {
  args: {
    isAddonInstalled: false,
    installPending: true,
    uninstallPending: false,
    userAddonsLoading: false,
    authorized: true
  }
};

/**
 * Renders the InstallButton component when the addon is already installed and can be uninstalled.
 */
export const Installed: Story = {
  args: {
    isAddonInstalled: true,
    installPending: false,
    uninstallPending: false,
    userAddonsLoading: false,
    authorized: true
  }
};

/**
 * Renders the InstallButton component when the addon is currently being uninstalled.
 */
export const Uninstalling: Story = {
  args: {
    isAddonInstalled: true,
    installPending: false,
    uninstallPending: true,
    userAddonsLoading: false,
    authorized: true
  }
};

/**
 * Renders the InstallButton component when the overall list of user addons is being loaded.
 */
export const LoadingUserAddons: Story = {
  args: {
    isAddonInstalled: false,
    installPending: false,
    uninstallPending: false,
    userAddonsLoading: true,
    authorized: true
  }
};

/**
 * Renders the InstallButton component when the user is not authorized to interact with the addon.
 */
export const Unauthorized: Story = {
  args: {
    isAddonInstalled: false,
    installPending: false,
    uninstallPending: false,
    userAddonsLoading: false,
    authorized: false
  }
};

/**
 * Renders the InstallButton component with the mouse hovered over the button.
 */
export const Hover: Story = {
  args: {
    isAddonInstalled: false,
    installPending: false,
    uninstallPending: false,
    userAddonsLoading: false,
    authorized: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const installButton = canvas.getByRole("button", { name: "Install" });
    await userEvent.hover(installButton, {
      delay: 100
    });
  }
};
