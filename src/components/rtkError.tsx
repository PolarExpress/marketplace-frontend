/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";

interface ErrorProperties {
  error: FetchBaseQueryError | SerializedError;
}

/**
 * A reusable component for displaying errors returned from RTK Query endpoints.
 * Distinguishes between network-related errors (`FetchBaseQueryError`) and
 * application-level errors (`SerializedError`).
 *
 * @param   props.error The error object to display.
 *
 * @returns             A JSX element rendering the appropriate error message.
 */
const RTKError = ({ error }: ErrorProperties) => {
  if ("status" in error) {
    // You can access all properties of `FetchBaseQueryError` here
    const errorMessage =
      "error" in error ? error.error : JSON.stringify(error.data);

    return (
      <div data-testid="fetch-error">An error has occurred: {errorMessage}</div>
    );
  } else {
    // You can access all properties of `SerializedError` here
    return <div data-testid="serialized-error">{error.message}</div>;
  }
};

export default RTKError;
