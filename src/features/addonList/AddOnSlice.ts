/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Redux slice to manage add-on-related state (fetched items, loading status, search filters, etc.).
import { createSlice } from "@reduxjs/toolkit";
import type { Addon } from "../../types/AddOnTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addonList } from "./tempAddons";

/**
 * Defines the shape of the state managed by this Redux slice.
 * @property {Addon[]} allAddOns - The complete list of add-ons.
 * @property {string} searchTerm - The current search term used for filtering add-ons.
 */
interface AddOnListState {
  allAddOns: Addon[];
  searchTerm: string;
}

/**
 * The initial state of the add-on management slice.
 */
const initialState: AddOnListState = {
  allAddOns: addonList,
  searchTerm: ""
};

/**
 * Creates the Redux slice for managing add-on state, including reducers for updating state.
 */
const AddOnSlice = createSlice({
  name: "addOnList",
  initialState,
  reducers: {
    /**
     * Updates the searchTerm within the Redux state.
     * @param state - The current Redux state of the add-on slice.
     * @param action - The action containing the new search term as its payload.
     */
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    }
  }
});

export default AddOnSlice;
export const addOnActions = AddOnSlice.actions;
