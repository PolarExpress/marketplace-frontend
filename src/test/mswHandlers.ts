/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { longAddonList } from "@polarexpress/mockData/addons";
import { AddonCategory } from "@polarexpress/types/addon";
import { HttpResponse, http, passthrough } from "msw";

const baseUrl = import.meta.env.VITE_API_BASE;

/**
 * Define mocking routes. Roughly corresponds to backend handlers.
 */
export const handlers = [
  http.post(`${baseUrl}/addons/get`, async ({ request }) => {
    const body = (await request.json()) as {
      category?: AddonCategory;
      page?: number;
      searchTerm?: string;
    };
    const { category, page = 0, searchTerm } = body;

    let filteredAddons = category
      ? longAddonList.filter(addon => addon.category === category)
      : longAddonList;

    filteredAddons = searchTerm
      ? longAddonList.filter(addon =>
          addon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : filteredAddons;

    const pageSize = 20;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedAddons = filteredAddons.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredAddons.length / pageSize);

    return HttpResponse.json({ addons: paginatedAddons, totalPages });
  }),

  http.post(`${baseUrl}/addons/get-by-id`, async ({ request }) => {
    const body = (await request.json()) as {
      id: string;
    };
    const addonId = body.id;

    const addon = longAddonList.find(addon => addon._id === addonId);

    return addon ? HttpResponse.json({ addon: addon }) : HttpResponse.json();
  }),

  http.post(`${baseUrl}/addons/get-readme`, async ({ request }) => {
    const body = (await request.json()) as {
      id: string;
    };
    const addonId = body.id;

    const addon = longAddonList.find(addon => addon._id === addonId);

    return addon
      ? HttpResponse.json({ readme: `# README for ${addon.name}` })
      : HttpResponse.json();
  }),

  // Mocks a request to the User Management Server
  http.get(`${import.meta.env.VITE_UMS_URL}/headers`, () => {
    return HttpResponse.json({
      impersonateID: "",
      jwt: "JWT",
      sessionID: "8a762387-270b-43c2-9d77-4fbdc6460b7c",
      userID: "5d6894e9-7a40-4dd1-bd07-ad28456350e2",
      username: "Username"
    });
  }),

  http.all("*", () => {
    return passthrough();
  })
];
