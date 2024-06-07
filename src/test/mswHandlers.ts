/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { shortAddonList } from "@polarexpress/mockData/addons";
import { AddonCategory } from "@polarexpress/types/addon";
import { HttpResponse, http, passthrough } from "msw";
import { getInstallCounts } from "./mockingUtils";

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
      ? shortAddonList.filter(addon => addon.category === category)
      : shortAddonList;

    if (searchTerm) {
      filteredAddons = filteredAddons.filter(addon =>
        addon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const installCounts = getInstallCounts();
    const updatedAddons = filteredAddons.map(addon => ({
      ...addon,
      installCount: installCounts[addon._id] || 0
    }));

    const pageSize = 20;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedAddons = updatedAddons.slice(startIndex, endIndex);
    const totalPages = Math.ceil(updatedAddons.length / pageSize);

    return HttpResponse.json({ addons: paginatedAddons, totalPages });
  }),

  http.post(`${baseUrl}/addons/get-by-id`, async ({ request }) => {
    const body = (await request.json()) as { id: string };
    const addonId = body.id;

    const addon = shortAddonList.find(addon => addon._id === addonId);
    const installCounts = getInstallCounts();
    const addonWithInstallCount = addon
      ? { ...addon, installCount: installCounts[addon._id] || 0 }
      : undefined;

    return addonWithInstallCount
      ? HttpResponse.json({ addon: addonWithInstallCount })
      : HttpResponse.json();
  }),

  http.post(`${baseUrl}/addons/get-readme`, async ({ request }) => {
    const body = (await request.json()) as {
      id: string;
    };
    const addonId = body.id;

    const addon = shortAddonList.find(addon => addon._id === addonId);

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
