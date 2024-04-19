/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { User } from "@polarexpress/types/user";

const userOne: User = {
  _id: "user-one",
  installedAddons: [],
  userId: "user-one"
};

const userTwo: User = {
  _id: "user-two",
  installedAddons: [],
  userId: "user-two"
};

const userThree: User = {
  _id: "user-three",
  installedAddons: [],
  userId: "user-three"
};

export const userList: User[] = [userOne, userTwo, userThree];
