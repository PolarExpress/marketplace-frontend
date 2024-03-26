/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Addon } from "../../types/AddOnTypes";

interface AddOnListState {
  searchTerm: string;
  allAddons: Addon[];
  selectedAddon: Addon | undefined;
  selectedReadMe: string | undefined;
}

const initialState: AddOnListState = {
  searchTerm: "",
  allAddons: [],
  selectedAddon: undefined,
  selectedReadMe: undefined
};

const AddOnSlice = createSlice({
  name: "addOnList",
  initialState,
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setAllAddons(state, action: PayloadAction<Addon[]>) {
      state.allAddons = action.payload;
    },
    setSelectedAddon(state, action: PayloadAction<Addon>) {
      state.selectedAddon = action.payload;
    },
    setSelectedReadMe(state, action: PayloadAction<string>) {
      state.selectedReadMe = action.payload;
    }
  }
});

export { initialState, type AddOnListState };
export const {
  updateSearchTerm,
  setAllAddons,
  setSelectedAddon,
  setSelectedReadMe
} = AddOnSlice.actions;
export default AddOnSlice.reducer;
