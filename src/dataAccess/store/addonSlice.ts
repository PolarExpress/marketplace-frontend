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
   * The current page used to filter the addon list.
   */
  currentPage: number;
  /**
   * The search term used to filter the addon list.
   */
  searchTerm: string;
}

const initialState: AddonListState = {
  currentPage: 0,
  searchTerm: ""
};

const AddOnSlice = createSlice({
  initialState,
  name: "addOnList",
  reducers: {
    updateCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    }
  }
});

export { type AddonListState, initialState };
export const { updateCurrentPage, updateSearchTerm } = AddOnSlice.actions;
export default AddOnSlice.reducer;
