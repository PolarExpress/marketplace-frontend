// Redux slice to manage add-on-related state (fetched items, loading status, search filters, etc.).
import { createSlice } from '@reduxjs/toolkit';
import type { Addon } from '../../types/AddOnTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AddOnListState {
  allAddOns: Addon[];
  searchTerm: string;  
}

const initialState: AddOnListState = {
  allAddOns: [],
  searchTerm: ""
};

const AddOnSlice = createSlice({
    name: 'addOnList',
    initialState,
    reducers: {
      updateSearchTerm(state, action: PayloadAction<string>){
        state.searchTerm = action.payload;
      }
    }
});

export default AddOnSlice;
export const addOnActions = AddOnSlice.actions;