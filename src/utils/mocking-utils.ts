/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

export async function importBroker() {
  return import(
    import.meta.env.VITE_MOCKING ? "../broker/broker.mock" : "../broker/broker"
  );
}
