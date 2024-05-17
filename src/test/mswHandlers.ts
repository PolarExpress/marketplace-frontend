/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { addonList } from "@polarexpress/mockData/addons";
import { AddonCategory } from "@polarexpress/types/addon";
import { panic } from "@polarexpress/utils";
import { HttpResponse, http, passthrough } from "msw";

const baseUrl = import.meta.env.VITE_API_BASE ?? panic("testing environment variable missing: VITE_API_BASE");

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
    const { category, searchTerm } = body;

    let filteredAddons = category
      ? addonList.filter(addon => addon.category === category)
      : addonList;

    filteredAddons = searchTerm
      ? addonList.filter(addon =>
          addon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : filteredAddons;

    return HttpResponse.json({ addons: filteredAddons });
  }),

  http.post(`${baseUrl}/addons/get-by-id`, async ({ request }) => {
    const body = (await request.json()) as {
      id: string;
    };
    const addonId = body.id;

    const addon = addonList.find(addon => addon._id === addonId);

    return addon ? HttpResponse.json({ addon: addon }) : HttpResponse.json();
  }),

  http.post(`${baseUrl}/addons/get-readme`, async ({ request }) => {
    const body = (await request.json()) as {
      id: string;
    };
    const addonId = body.id;

    const addon = addonList.find(addon => addon._id === addonId);

    return addon
      ? HttpResponse.json({ readme: `# README for ${addon.name}` })
      : HttpResponse.json();
  }),

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
