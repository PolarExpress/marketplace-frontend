import type { User } from "../../types/UserTypes";

const userOne: User = {
  id: "user-one",
  name: "user one",
  // author?:
  email: "userone@gmail.com",
  installedAddons: []
}

const userTwo: User = {
  id: "user-two",
  name: "user two",
  // author?:
  email: "usertwo@gmail.com",
  installedAddons: []
}

const userThree: User = {
  id: "user-three",
  name: "user three",
  // author?:
  email: "userthree@gmail.com",
  installedAddons: []
}

export const userList: User[] = [userOne, userTwo, userThree];