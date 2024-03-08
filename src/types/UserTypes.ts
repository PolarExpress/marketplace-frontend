import type { Addon } from "./AddOnTypes";

export interface User {
  id: string;
  email: string;

  installs?: Addon[];
}
