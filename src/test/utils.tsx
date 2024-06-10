/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { PropsWithChildren, ReactElement } from "react";

import { SetupBroker } from "@polarexpress/dataAccess/broker";
import AddonPage from "@polarexpress/pages/addonPage";
import { type RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { type AppStore, type RootState, makeStore } from "../dataAccess/store";
import { HttpResponse, http } from "msw";
import { longAddonList } from "@polarexpress/mockData/addons";
import { server } from "@polarexpress/test/setup";
import { AddonCategory } from "@polarexpress/types/addon";
import { getInstallCounts } from "./mockingUtils";

/**
 * This type extends the default options for React Testing Library's render
 * function. It allows for additional configuration such as specifying an
 * initial Redux state and a custom store instance.
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  /**
   * Defines a specific portion or the entire initial state for the Redux store.
   * This is particularly useful for initializing the state in a controlled
   * manner during testing, allowing components to be rendered with
   * predetermined state conditions.
   */
  preloadedState?: Partial<RootState>;

  /**
   * Allows the use of a specific Redux store instance instead of a default or
   * global store. This flexibility is beneficial when testing components with
   * unique store requirements or when isolating tests from a global store
   * state. The custom store should be configured to match the structure and
   * middleware of the store used by the application.
   *
   * @default makeStore(preloadedState)
   */
  store?: AppStore;
}

/**
 * Renders the given React element with Redux Provider and custom store. This
 * function is useful for testing components that are connected to the Redux
 * store.
 *
 * @param   ui                    - The React component or element to render.
 * @param   extendedRenderOptions - Optional configuration options for
 *   rendering. This includes `preloadedState` for initial Redux state and
 *   `store` for a specific Redux store instance. Any additional properties are
 *   passed to React Testing Library's render function.
 *
 * @returns                       An object containing the Redux store used in
 *   the render, User event API for simulating user interactions in tests, and
 *   all of React Testing Library's query functions for testing the component.
 */
export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
  initialEntries: string[] = ["/"],
  authorized: boolean = true
) => {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = makeStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      {!authorized || <SetupBroker />}
      <MemoryRouter initialEntries={initialEntries}> {children} </MemoryRouter>
    </Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
};

/**
 * Renders the individual page of an addon.
 *
 * @param   id Id of addon to be rendered.
 *
 * @returns    An object containing functions to query the rendered page.
 */
export const setupPageWithId = (id: string, authorized: boolean = true) => {
  return renderWithProviders(
    <Routes>
      <Route element={<AddonPage />} path="/addons/:id" />
    </Routes>,
    {},
    [`/addons/${id}`],
    authorized
  );
};

/**
 * Compares the order of add-on cards based on a custom comparison function.
 *
 * @param addOnCards      An array of HTML elements representing the add-on
 *   cards.
 * @param compareFunction A comparison function that determines the order of
 *   add-on cards. It should return true if its first parameter should come
 *   before its second parameter in the sorted order.
 */
export const compareAddonOrder = (
  addOnCards: HTMLElement[],
  compareFunction: (nameI: string, nameJ: string) => boolean
) => {
  for (const [i, card] of addOnCards.entries()) {
    const nameI = card.querySelector("h1")?.textContent;
    if (nameI === null || nameI === undefined) {
      continue;
    }

    for (const otherCard of addOnCards.slice(i + 1)) {
      const nameJ = otherCard.querySelector("h1")?.textContent;
      if (nameJ === null || nameJ === undefined) {
        continue;
      }

      if (compareFunction(nameI, nameJ)) {
        expect(card.compareDocumentPosition(otherCard)).toBe(
          Node.DOCUMENT_POSITION_FOLLOWING
        );
      }
    }
  }
};

/**
 * Sets up an MSW handler for mocking the `/addons/get` endpoint with
 * `longAddonList` instead of `shortAddonList`.
 */
export const setupLongAddonListHandler = () => {
  server.use(
    http.post(
      `${import.meta.env.VITE_API_BASE}/addons/get`,
      async ({ request }) => {
        const { category, page = 0 } = (await request.json()) as {
          category?: AddonCategory;
          page?: number;
        };

        const filteredAddons = category
          ? longAddonList.filter(addon => addon.category === category)
          : longAddonList;

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
      }
    )
  );
};
