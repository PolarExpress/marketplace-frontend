/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { AddonCategory } from "@polarexpress/types/addon";
import { SortOptions } from "@polarexpress/types/sorting";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

/**
 * Interface representing the state of the addon list.
 */
interface searchState {
  /**
   * The current page used to filter the addon list.
   */
  currentPage: number;
  /**
   * The search term used to filter the addon list.
   */
  searchTerm: string;
  /**
   * The selected category used to filter the addon list.
   */
  selectedCategory: AddonCategory;
  /**
   * The selected sorting option to sort the returned addons.
   */
  selectedSort: SortOptions;
}

const initialState: searchState = {
  currentPage: 0,
  searchTerm: "",
  selectedCategory: AddonCategory.VISUALISATION,
  selectedSort: SortOptions.NONE
};

const searchSlice = createSlice({
  initialState,
  name: "addOnList",
  reducers: {
    updateCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    updateSelectedCategory(state, action: PayloadAction<AddonCategory>) {
      state.selectedCategory = action.payload;
    },
    updateSelectedSort(state, action: PayloadAction<SortOptions>) {
      state.selectedSort = action.payload;
    }
  }
});

export { initialState, type searchState };
export const {
  updateCurrentPage,
  updateSearchTerm,
  updateSelectedCategory,
  updateSelectedSort
} = searchSlice.actions;
export default searchSlice.reducer;
