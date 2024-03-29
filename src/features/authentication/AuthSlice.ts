/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UseIsAuthorizedState = SingleIsAuthorizedState & {
  roomID: string | undefined;
};

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
  sessionID: undefined,
  roomID: undefined,
  userID: undefined,
  username: undefined
};

export const AuthSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
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

export const { authorized, unauthorized, logout, changeRoom } =
  AuthSlice.actions;

export default AuthSlice.reducer;
