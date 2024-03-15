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
import type { User } from "../types/UserTypes";
import type { Author } from "../types/AuthorTypes";
import { AddonCategory } from "../types/AddOnTypes";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { MemoryRouter } from "react-router-dom";
import { userEvent, within } from "@storybook/test";

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

const mockUser: User = {
  id: "user-1",
  name: "user one",
  email: "userone@gmail.com"
};

const mockAuthor: Author = {
  id: "author-1",
  user: mockUser,
}

/** Sample add-ons representing different categories */
const sampleAddOn: Addon = {
  id: "1",
  name: "ExampleVis",
  summary: "...",
  category: AddonCategory.VISUALISATION,
  author: mockAuthor
};
const sampleMLAddOn: Addon = {
  id: "2",
  name: "ExampleML",
  summary: "...",
  category: AddonCategory.MACHINE_LEARNING,
  author: mockAuthor
};
const sampleDataAPIAddOn: Addon = {
  id: "3",
  name: "ExampleData",
  summary: "...",
  category: AddonCategory.DATA_SOURCE,
  author: mockAuthor
};

/**
 * Renders the AddOnCard with a sample add-on for the 'Visualization' category
 */
export const Basic: Story = {
  args: {
    addOn: sampleAddOn
  }
};

/**
 * Renders the AddOnCard with the mouse hovered over it
 */
export const Hover: Story = {
  args: {
    addOn: sampleAddOn
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByTestId("addon-card");
    await userEvent.hover(card, {
      delay: 100
    });
  }
};
