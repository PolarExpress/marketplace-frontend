/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Author } from "../types/AuthorTypes";
import { userList } from "./tempUsers";

const authorOne: Author = {
  _id: "author-one",
  userId: userList[0].userId
};

const authorTwo: Author = {
  _id: "author-two",
  userId: userList[2].userId
};

export const authorList: Author[] = [authorOne, authorTwo];
