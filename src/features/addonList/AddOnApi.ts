/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */
import { emptySplitApi } from "../../services/api";
import type { Addon, AddonCategory } from "../../types/AddOnTypes";

/**
 * Automatically creates react hooks for interacting with add-on related endpoints.
 * Appends to the split api creator.
 */
const addOnApi = emptySplitApi.injectEndpoints({
  endpoints: build => ({
    // Fetches a list of addons from the server, optionally filtered by page and category.
    getAddons: build.query<
      Addon[],
      { page?: number; category?: AddonCategory }
    >({
      query: ({ page, category }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append("page", page.toString());
        if (category) queryParams.append("category", category);
        return `/addons?${queryParams.toString()}`;
      }
    }),
    // Gets the addon corresponding to the given id from the server
    getAddonById: build.query<Addon, string>({
      query: id => `/addons/${id}`
    }),
    // Gets the readMe of the given addon id
    getAddonReadmeById: build.query<string, string>({
      query: id => ({
        url: `/addons/${id}/readme`,
        responseHandler: "text"
      })
    })
  }),
  overrideExisting: false
});

// Exports automatically generated hooks.
export const {
  useGetAddonsQuery,
  useGetAddonByIdQuery,
  useGetAddonReadmeByIdQuery
} = addOnApi;
