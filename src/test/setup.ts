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

// Set up http handlers during testing (npm test)
export const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.close());

beforeEach(() => {
  vi.restoreAllMocks();
});
