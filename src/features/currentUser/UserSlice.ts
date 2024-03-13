/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Addon } from "../../types/AddOnTypes";
import * as userApi from "./UserApi";

const fetchInstalledAddons = createAsyncThunk(
  "user/fetchInstalledAddons",
  async (userId: string, thunkAPI) => {
    return userApi.GetInstalledAddons(userId);
  }
);

/** An action to post the data of installing an addon. */
const postInstalledAddon = createAsyncThunk(
  "user/postInstalledAddon",
  async ({ userId, addon }: { userId: string, addon: Addon } , thunkAPI) => {
     const addonId = addon.id;
     await userApi.PostInstalledAddon(userId, addonId);
     return addon;
  }
);

interface UserState {
  id: string;
  installedAddons: Addon[];
}

const initialState: UserState = {
  id: "",
  installedAddons: []
};

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder.addCase(fetchInstalledAddons.fulfilled, (state, action) => {
      state.installedAddons = (action.payload);
    });
    builder.addCase(postInstalledAddon.fulfilled, (state, action) => {
      state.installedAddons.push(action.payload);
    });
  }
});

export default userSlice;
export const addOnActions = userSlice.actions;
export { fetchInstalledAddons, postInstalledAddon };