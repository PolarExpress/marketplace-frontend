/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */
// Contains functions to interact with backend API for fetching add-on data.
import type { Addon, AddonCategory } from "../../types/AddOnTypes";

/**
 * Fetches a list of addons from the server, optionally filtered by page and category.
 *
 * @param {number} [page] - The desired page of results (for pagination).
 * @param {AddonCategory} [category] - The category of addons to filter by.
 * @returns {Promise<Addon[]>} - A Promise that resolves with an array of Addon objects.
 * @throws {Error} - If the fetch request fails or the response indicates an error.
 */
export const fetchAddons = async (
  page?: number,
  category?: AddonCategory
): Promise<Addon[]> => {
  try {
    // Construct query parameters for filtering
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page.toString());
    if (category) queryParams.append("category", category);

    // Build the fetch URL with query parameters
    const url = `http://localhost:3000/addons?${queryParams.toString()}`;

    // Make the fetch request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response);

    // Basic error handling
    if (!response.ok) {
      throw new Error("Failed to fetch addons");
    }

    // Parse JSON response
    const addons: Addon[] = await response.json();
    console.log(addons);
    return addons;
  } catch (error) {
    console.error("Failed to fetch addons:", error);
    throw error;
  }
};
