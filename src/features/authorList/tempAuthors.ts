import type {Author} from "../../types/AuthorTypes";
import { userList } from "../userList/tempUsers";
import { addonList } from "../addonList/tempAddons";

const authorOne: Author = {
  id: "author-one",
  user: userList[0],
  createdAddons: [addonList[0],addonList[1]]
};

const authorTwo: Author = {
  id: "author-two",
  user: userList[2],
  createdAddons: [addonList[2]]
};

export const authorList: Author[] = [authorOne,authorTwo];