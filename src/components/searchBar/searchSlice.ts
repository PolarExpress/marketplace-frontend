/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  term: string;
}

const slice = createSlice({
  name: "search",
  initialState: { term: "" } as SearchState,
  reducers: {
    updateTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    }
  }
});

export const { updateTerm } = slice.actions;
export default slice.reducer;
