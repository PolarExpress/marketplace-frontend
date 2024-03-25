/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { http, HttpResponse } from "msw";
import { addonList } from "../temp/tempAddons";

const baseUrl = import.meta.env.VITE_API_BASE;

/**
 * Define mocking routes
 */
export const handlers = [
  http.get(`${baseUrl}/addons`, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const page = params.get("page");

    return page === "0" ? HttpResponse.json(addonList) : HttpResponse.json([]);
  }),
  http.get(`${baseUrl}/addons/:id`, ({ params }) =>
    HttpResponse.json(addonList.find(addon => addon.id === params.id))
  )
];
