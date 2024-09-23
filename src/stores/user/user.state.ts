import { Interest, Theme, User } from "@/interfaces";

export type UserState = {
  user?: User;
  interests: Interest[];
  themes: Theme[];
};
