/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

export interface Author {
  /**
   * MongoDB object id.
   */
  _id: string;
  /**
   * UserId corresponding to the author.
   */
  userId: string;
}
