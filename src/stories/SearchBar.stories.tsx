import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "../components/SearchBar";
import { Provider } from "react-redux";
import { store } from "../app/store";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "frontend/SearchBar",
  component: SearchBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered"
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    placeholder: {
      control: "text",
      description: "The placeholder text within the search input"
    },
    value: {
      control: "text",
      description: "The current value displayed in the search input"
    },
    isFocused: {
      control: "boolean",
      description: "Whether the search input has focus"
    },
    onChange: {
      action: "changed",
      description: "Function called when the input value changes"
    }
  }
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Search add-ons...",
    isFocused: false
  },
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

export const Focused: Story = {
  args: {
    placeholder: "Search add-ons...",
    isFocused: true
  },
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};

export const WithValue: Story = {
  args: {
    placeholder: "Search add-ons...",
    isFocused: true,
    value: "ExampleVis"
  },
  decorators: [Story => <Provider store={store}> {Story()} </Provider>]
};
