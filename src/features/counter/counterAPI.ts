/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
};
