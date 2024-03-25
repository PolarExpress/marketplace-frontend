/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Initialize an empty api service that we'll inject endpoints into later as needed.
 * RTK Query documentation advises to maintain a single API slice per base URL.
 * This API slice will be injected with endpoints in other files.
 */
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  endpoints: () => ({})
});
