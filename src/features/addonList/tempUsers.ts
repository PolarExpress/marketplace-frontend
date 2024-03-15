/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { User } from "../../types/UserTypes";

const userOne: User = {
  id: "user-one",
  name: "user one",
  email: "userone@gmail.com",
  installedAddons: []
}

const userTwo: User = {
  id: "user-two",
  name: "user two",
  email: "usertwo@gmail.com",
  installedAddons: []
}

const userThree: User = {
  id: "user-three",
  name: "user three",
  email: "userthree@gmail.com",
  installedAddons: []
}

export const userList: User[] = [userOne, userTwo, userThree];