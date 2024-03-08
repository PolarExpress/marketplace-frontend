// Defines Redux slice for managing global application state
// Might not be necessary for now
// Current code is from the example project and not used in our project, no idea what it does
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

// `buildCreateSlice` allows us to create a slice with async thunks.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
