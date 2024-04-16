/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "@polarexpress/dataAccess/store";
import RTKError from "@polarexpress/components/rtkError";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/**
 * Provides configuration and metadata for Storybook stories related to the SearchBar component.
 */
const meta = {
  title: "frontend/RTKError",
  component: RTKError,
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
} satisfies Meta<typeof RTKError>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Throws a TypeError to simulate a SerializedError (one of the two types RTK Query could throw)
 */
export const SerializedErrorMessage: Story = {
  args: {
    error: new TypeError("Cannot read properties of undefined")
  }
};

/**
 * Throws a 500 error to simulate the other type
 */
export const FetchBaseQueryErrorMessage: Story = {
  args: {
    error: {
      status: 500,
      data: "Internal server error occurred"
    }
  }
};
