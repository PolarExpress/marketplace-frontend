/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/** All possible HTTP methods. */
export type HTTPMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

/**
 * Send a request to the specified URL using the specified HTTP method.
 * @param url The URL to send the request to.
 * @param method The HTTP method to use.
 * @param [body={}] The body of the request. Optional.
 */
export async function sendRequest<T>(
  url: string,
  method: HTTPMethod,
  body = {}
): Promise<T> {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const requestOptions = {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  return response.json() as T;
}
