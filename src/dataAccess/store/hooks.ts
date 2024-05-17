/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store";

import { UseIsAuthorizedState, authState } from "../authentication";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAuthorizationCache: () => UseIsAuthorizedState = () =>
  useAppSelector(authState);
