/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { User } from "../types/UserTypes";

const userOne: User = {
  _id: "user-one",
  userId: "user-one",
  installedAddons: []
};

const userTwo: User = {
  _id: "user-two",
  userId: "user-two",
  installedAddons: []
};

const userThree: User = {
  _id: "user-three",
  userId: "user-three",
  installedAddons: []
};

export const userList: User[] = [userOne, userTwo, userThree];
