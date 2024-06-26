/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";

import { handlers } from "./mswHandlers";
import { initializeInstalled } from "./mockingUtils";

// Set up http handlers during testing
export const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.close());

beforeEach(() => {
  vi.restoreAllMocks();
  server.resetHandlers();
  initializeInstalled();
});
