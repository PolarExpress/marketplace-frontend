/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { emptySplitApi } from "@polarexpress/dataAccess/store/api";
import type { Addon, AddonCategory } from "@polarexpress/types/addon";
import { SortOptions } from "@polarexpress/types/sorting";

/**
 * Automatically creates react hooks for interacting with add-on related
 * endpoints. Appends to the split api creator.
 */
const addonApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    // Gets the addon corresponding to the given id from the server
    getAddonById: build.query<Addon, string>({
      query: id => ({
        body: { id },
        method: "POST",
        url: "/addons/get-by-id"
      }),
      transformResponse(response: { addon: Addon }) {
        return response.addon;
      }
    }),
    // Gets the readMe of the given addon id
    getAddonReadmeById: build.query<string, string>({
      query: id => ({
        body: { id },
        method: "POST",
        url: "/addons/get-readme"
      }),
      transformResponse(response: { readme: string }) {
        return response.readme;
      }
    }),
    // Fetches a list of addons from the server, optionally filtered by page and category.
    getAddons: build.query<
      { addons: Addon[]; totalPages: number },
      {
        category?: AddonCategory;
        page?: number;
        searchTerm?: string;
        sort?: SortOptions;
      }
    >({
      query: body => ({
        body: body,
        method: "POST",
        url: "/addons/get"
      })
    })
  }),
  overrideExisting: false
});

// Exports automatically generated hooks.
export const {
  useGetAddonByIdQuery,
  useGetAddonReadmeByIdQuery,
  useGetAddonsQuery,
  useLazyGetAddonsQuery
} = addonApi;
