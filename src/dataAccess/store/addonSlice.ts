/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

/**
 * Interface representing the state of the addon list.
 */
interface AddonListState {
  /**
   * The search term used to filter the addon list.
   */
  searchTerm: string;
}

const initialState: AddonListState = {
  searchTerm: ""
};

const AddOnSlice = createSlice({
  initialState,
  name: "addOnList",
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    }
  }
});

export { type AddonListState, initialState };
export const { updateSearchTerm } = AddOnSlice.actions;
export default AddOnSlice.reducer;
