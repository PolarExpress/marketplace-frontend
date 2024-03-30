/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Addon } from "../../types/AddOnTypes";
import userApi from "./UserApi";

/** An action to get all add-ons installed by the specified user. */
const fetchInstalledAddons = createAsyncThunk(
  "user/fetchInstalledAddons",
  async (userId: string, thunkAPI) => {
    return userApi.getInstalledAddons(userId);
  }
);

/** An action to post the data of installing an addon. */
const sendInstalledAddon = createAsyncThunk(
  "user/sendInstalledAddon",
  async (
    { userId, addon }: { userId: string | undefined; addon: Addon },
    thunkAPI
  ) => {
    const addonId = addon.id;
    await userApi.sendInstalledAddon(userId, addonId);
    return addon;
  }
);

interface UserState {
  /** The ID of the current user. */
  // id: string;
  /** All currently installed add-ons. */
  installedAddons: Addon[];
}

const initialState: UserState = {
  // id: "",
  installedAddons: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder.addCase(fetchInstalledAddons.fulfilled, (state, action) => {
      state.installedAddons = action.payload;
    });
    builder.addCase(sendInstalledAddon.fulfilled, (state, action) => {
      state.installedAddons.push(action.payload);
    });
  }
});

export default userSlice.reducer;
export const addOnActions = userSlice.actions;
export { fetchInstalledAddons, sendInstalledAddon };
