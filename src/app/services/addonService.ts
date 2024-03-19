/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Addon } from "../../types/AddOnTypes";

const userId = "cltwnxhba000aswnpy6ndl3gp";

export const api = createApi({
  reducerPath: "addonApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE }),
  endpoints: builder => ({
    listAddons: builder.query<Addon[], number | void>({
      query: (page = 1) => `addons?page=${page}&userId=${userId}`
    }),
    findAddonById: builder.query<Addon, string>({
      query: id => `/addons/${id}`
    }),
    installById: builder.mutation<boolean, string>({
      query: id => ({
        method: "POST",
        url: "install",
        body: { addonId: id, userId }
      }),
      transformResponse: () => true,
      transformErrorResponse: () => false
    }),
    uninstallById: builder.mutation<boolean, string>({
      query: id => ({
        method: "POST",
        url: "uninstall",
        body: { addonId: id, userId }
      }),
      transformResponse: () => true,
      transformErrorResponse: () => false
    })
  })
});

export const {
  useListAddonsQuery,
  useFindAddonByIdQuery,
  useInstallByIdMutation,
  useUninstallByIdMutation
} = api;
