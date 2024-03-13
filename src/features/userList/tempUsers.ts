import type {User} from "../../types/UserTypes";

const firstUser: User = {
  id: "user-1",
  name: "user one",
  email: "userone@gmail.com",
  // author?:
  installedAddons: []
};

const secondUser: User = {
  id: "user-2",
  name: "user two",
  email: "usertwo@gmail.com",
  // author?:
  installedAddons: []
};

const thirdUser: User = {
  id: "user-3",
  name: "user three",
  email: "userthree@gmail.com",
  // author?:
  installedAddons: []
};

export const userList: User[] = [firstUser,secondUser,thirdUser];