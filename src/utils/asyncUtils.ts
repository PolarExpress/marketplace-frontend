/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/**
 * Creates a delay of the specified number of milliseconds.
 * @example
 * // Usage:
 * delay(20).then(...);
 * @param ms The number of milliseconds to delay for.
 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
