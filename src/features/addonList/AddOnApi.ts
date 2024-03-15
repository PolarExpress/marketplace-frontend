/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Should contain functions to interact with backend API for fetching add-on data.
import type { Addon, AddonCategory } from "../../types/AddOnTypes";

// Asynchronous function to fetch addon list from the backend
export const fetchAddons = async (
  page?: number,
  category?: AddonCategory
): Promise<Addon[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page.toString());
    if (category) queryParams.append("category", category);

    const url = `http://localhost:3000/addons?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch addons");
    }
    const addons: Addon[] = await response.json();
    console.log(addons);
    return addons;
  } catch (error) {
    console.error("Failed to fetch addons:", error);
    throw error; // You might want to handle this more gracefully
  }
};
