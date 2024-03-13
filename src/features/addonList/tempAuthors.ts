import type { Author } from "../../types/AuthorTypes";
import { userList } from "./tempUsers";

const authorOne: Author = {
  id: "author-one",
  user: userList[0]
}

const authorTwo: Author = {
  id: "author-two",
  user: userList[2]
}

export const authorList: Author[]= [authorOne,authorTwo]