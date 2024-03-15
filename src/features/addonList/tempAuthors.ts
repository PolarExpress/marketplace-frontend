/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Author } from "../../types/AuthorTypes";
import { userList } from "./tempUsers";
import { addonList} from "./tempAddons";

const authorOne: Author = {
  id: "author-one",
  user: userList[0],
  //createdAddons: [addonList[0], addonList[1]]
};

const authorTwo: Author = {
  id: "author-two",
  user: userList[2],
  //createdAddons: [addonList[2]]
};

export const authorList: Author[]= [authorOne,authorTwo];