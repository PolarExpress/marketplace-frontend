/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Action, ThunkAction } from "@reduxjs/toolkit";

import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import AuthSlice from "../authentication";
import AddOnSlice from "./addonSlice";
import { emptySplitApi } from "./api";

const rootReducer = combineSlices({
  addons: AddOnSlice,
  auth: AuthSlice,
  // Allows the store to process the internal actions that the generated api hooks use
  [emptySplitApi.reducerPath]: emptySplitApi.reducer
});
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Creates a Redux store with a preloaded state and default middleware. Also
 * sets up RTK Query listeners for refetching on focus/reconnect.
 *
 * @param   preloadedState       - Optional initial state for the Redux store.
 *
 * @returns {Store}                The newly created Redux store.
 */
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    middleware: getDefaultMiddleware => {
      // API middleware adds logic for managing caching, invalidation, subscriptions, polling, and more.
      return getDefaultMiddleware().prepend(emptySplitApi.middleware);
    },
    preloadedState,
    reducer: rootReducer
  });

  // Configure listeners using the provided defaults
  // Optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);

  return store;
};

export const store = makeStore();

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
