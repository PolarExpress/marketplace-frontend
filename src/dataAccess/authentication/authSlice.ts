/* eslint-disable */

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type UseIsAuthorizedState = {
  roomID: string | undefined;
} & SingleIsAuthorizedState;

export type SingleIsAuthorizedState = {
  authorized: boolean | undefined;
  jwt: string | undefined;
  sessionID: string | undefined;
  userID: string | undefined;
  username: string | undefined;
};

// Define the initial state using that type
export const initialState: UseIsAuthorizedState = {
  authorized: undefined,
  jwt: undefined,
  roomID: undefined,
  sessionID: undefined,
  userID: undefined,
  username: undefined
};

export const AuthSlice = createSlice({
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  name: "auth",
  reducers: {
    authorized(state, action: PayloadAction<SingleIsAuthorizedState>) {
      console.info("%cAuthorized", "background-color: blue");
      state.authorized = action.payload.authorized;
      state.jwt = action.payload.jwt;
      state.userID = action.payload.userID;
      state.sessionID = action.payload.sessionID;
      state.username = action.payload.username;
    },
    changeRoom(state, action: PayloadAction<string | undefined>) {
      console.info("Changing Room to", action.payload);
      state.roomID = action.payload;
      const query = new URLSearchParams(window.location.search);
      if (action?.payload) {
        query.set("roomID", action?.payload || "null");
        window.history.pushState(null, "", "?" + query.toString());
      } else {
        query.delete("roomID");
        window.history.pushState(null, "", "?" + query.toString());
      }
    },
    logout(state) {
      console.info("Logging out");
      state.authorized = undefined;
      state.jwt = undefined;
      state.sessionID = undefined;
      state.userID = undefined;
      state.username = undefined;
      const query = new URLSearchParams(window.location.search);
      query.delete("roomID");
      window.history.pushState(null, "", "?" + query.toString());
    },
    unauthorized(state) {
      console.warn("Unauthorized");
      state.authorized = false;
      const query = new URLSearchParams(window.location.search);
      query.delete("roomID");
      window.history.pushState(null, "", "?" + query.toString());
    }
  }
});

export const { authorized, changeRoom, logout, unauthorized } =
  AuthSlice.actions;

export const authState = (state: RootState) => state.auth;

export default AuthSlice.reducer;
