/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AddOnListState {
  searchTerm: string;
}

const initialState: AddOnListState = {
  searchTerm: ""
};

const AddOnSlice = createSlice({
  name: "addOnList",
  initialState,
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    }
  }
});

export { initialState, type AddOnListState };
export const { updateSearchTerm } = AddOnSlice.actions;
export default AddOnSlice.reducer;
