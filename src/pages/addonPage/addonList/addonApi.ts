/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { emptySplitApi } from "@polarexpress/dataAccess/store/api";
import type { Addon, AddonCategory } from "@polarexpress/types/addon";

/**
 * Automatically creates react hooks for interacting with add-on related endpoints.
 * Appends to the split api creator.
 */
const addonApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    // Fetches a list of addons from the server, optionally filtered by page and category.
    getAddons: build.query<
      Addon[],
      { page?: number; category?: AddonCategory }
    >({
      query: ({ page, category }) => ({
        url: "/addons/get",
        method: "POST",
        body: { page, category }
      }),
      transformResponse(response: { addons: Addon[] }) {
        return response.addons;
      }
    }),
    // Gets the addon corresponding to the given id from the server
    getAddonById: build.query<Addon, string>({
      query: id => ({
        url: "/addons/get-by-id",
        method: "POST",
        body: { id }
      }),
      transformResponse(response: { addon: Addon }) {
        return response.addon;
      }
    }),
    // Gets the readMe of the given addon id
    getAddonReadmeById: build.query<string, string>({
      query: id => ({
        url: "/addons/get-readme",
        method: "POST",
        body: { id }
      }),
      transformResponse(response: { readme: string }) {
        return response.readme;
      }
    }),
    // Searches addons in database using given search term
    searchAddons: build.query<
      Addon[],
      { searchTerm: string; page?: number; category?: AddonCategory }
    >({
      query: ({ searchTerm, page, category }) => ({
        url: "/addons/search",
        method: "POST",
        body: { searchTerm, page, category }
      }),
      transformResponse(response: { addons: Addon[] }) {
        return response.addons;
      }
    })
  }),
  overrideExisting: false
});

// Exports automatically generated hooks.
export const {
  useGetAddonsQuery,
  useGetAddonByIdQuery,
  useGetAddonReadmeByIdQuery,
  useSearchAddonsQuery
} = addonApi;
