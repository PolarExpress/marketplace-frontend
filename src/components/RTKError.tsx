/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";

interface ErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

/**
 * A reusable component for displaying errors returned from RTK Query endpoints.
 * Distinguishes between network-related errors (`FetchBaseQueryError`) and
 * application-level errors (`SerializedError`).
 *
 * @param {FetchBaseQueryError | SerializedError} props.error - The error object to display.
 * @returns {JSX.Element} - A JSX element rendering the appropriate error message.
 */
const RTKError = ({ error }: ErrorProps) => {
  if ("status" in error) {
    // You can access all properties of `FetchBaseQueryError` here
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);

    return <div>An error has occurred: {errMsg}</div>;
  } else {
    // You can access all properties of `SerializedError` here
    return <div>{error.message}</div>;
  }
};

export default RTKError;
