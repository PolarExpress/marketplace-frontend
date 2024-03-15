/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AddonCategory, type Addon } from "../../types/AddOnTypes";
import { fetchAddons as fetchAddonsApi } from "./AddOnApi"; // Correctly import fetchAddons

interface AddOnListState {
  allAddOns: Addon[];
  searchTerm: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AddOnListState = {
  allAddOns: [],
  searchTerm: "",
  status: "idle",
  error: null
};

/**
 * Creates async thunk for fetching from backend.
 * Currently chooses page 0 and visualisation category
 */
export const fetchAddons = createAsyncThunk(
  "addOnList/fetchAddons",
  async () => {
    return await fetchAddonsApi(0, AddonCategory.VISUALISATION);
  }
);

const AddOnSlice = createSlice({
  name: "addOnList",
  initialState,
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddons.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.allAddOns = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAddons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch addons";
      });
  }
});

export { initialState, type AddOnListState };
export const { updateSearchTerm } = AddOnSlice.actions;
export default AddOnSlice.reducer;
