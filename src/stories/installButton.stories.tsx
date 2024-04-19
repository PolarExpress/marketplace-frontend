/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";

import { InstallButton } from "@polarexpress/components";
import { store } from "@polarexpress/dataAccess/store";
import { userEvent, within } from "@storybook/test";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/**
 * Provides configuration and metadata for Storybook stories related to the SearchBar component.
 */
const meta = {
  component: InstallButton,
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
  title: "frontend/InstallButton"
} satisfies Meta<typeof InstallButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Renders the InstallButton component when the addon is not installed and the user is authorized.
 */
export const NotInstalled: Story = {
  args: {
    authorized: true,
    installPending: false,
    isAddonInstalled: false,
    uninstallPending: false,
    userAddonsLoading: false
  }
};

/**
 * Renders the InstallButton component when the addon is currently being installed.
 */
export const Installing: Story = {
  args: {
    authorized: true,
    installPending: true,
    isAddonInstalled: false,
    uninstallPending: false,
    userAddonsLoading: false
  }
};

/**
 * Renders the InstallButton component when the addon is already installed and can be uninstalled.
 */
export const Installed: Story = {
  args: {
    authorized: true,
    installPending: false,
    isAddonInstalled: true,
    uninstallPending: false,
    userAddonsLoading: false
  }
};

/**
 * Renders the InstallButton component when the addon is currently being uninstalled.
 */
export const Uninstalling: Story = {
  args: {
    authorized: true,
    installPending: false,
    isAddonInstalled: true,
    uninstallPending: true,
    userAddonsLoading: false
  }
};

/**
 * Renders the InstallButton component when the overall list of user addons is being loaded.
 */
export const LoadingUserAddons: Story = {
  args: {
    authorized: true,
    installPending: false,
    isAddonInstalled: false,
    uninstallPending: false,
    userAddonsLoading: true
  }
};

/**
 * Renders the InstallButton component when the user is not authorized to interact with the addon.
 */
export const Unauthorized: Story = {
  args: {
    authorized: false,
    installPending: false,
    isAddonInstalled: false,
    uninstallPending: false,
    userAddonsLoading: false
  }
};

/**
 * Renders the InstallButton component with the mouse hovered over the button.
 */
export const Hover: Story = {
  args: {
    authorized: true,
    installPending: false,
    isAddonInstalled: false,
    uninstallPending: false,
    userAddonsLoading: false
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const installButton = canvas.getByRole("button", { name: "Install" });
    await userEvent.hover(installButton, {
      delay: 100
    });
  }
};
