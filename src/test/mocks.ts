/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { http, HttpResponse } from "msw";
import { AddonCategory, type Addon } from "../types/AddOnTypes";

const mockAddons: Addon[] = [
  {
    id: "1",
    name: "Mock Addon 1",
    summary: "Mock Summary 1",
    category: AddonCategory.VISUALISATION
  },
  {
    id: "2",
    name: "Mock Addon 2",
    summary: "Mock Summary 2",
    category: AddonCategory.VISUALISATION
  }
];

const baseUrl = import.meta.env.VITE_API_BASE;

export const handlers = [
  http.get(`${baseUrl}/addons`, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const page = params.get("page");

    return page === "0" ? HttpResponse.json(mockAddons) : HttpResponse.json([]);
  }),
  http.get(`${baseUrl}/addons/:id`, ({ params }) =>
    HttpResponse.json(mockAddons.find(addon => addon.id === params.id))
  )
];
