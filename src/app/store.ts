/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Configures Redux store, including middleware and combining reducers
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

// Slices and services
import { api } from "./services/addonService";
import searchSlice from "../components/searchBar/searchSlice";

const reducer = combineSlices({
  [api.reducerPath]: api.reducer,
  search: searchSlice
});

export type RootState = ReturnType<typeof reducer>;

/**
 * Creates a Redux store with a preloaded state and default middleware.
 * Also sets up RTK Query listeners for refetching on focus/reconnect.
 *
 * @returns The newly created Redux store.
 */
export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(api.middleware);
    }
  });
}

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
