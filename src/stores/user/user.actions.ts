import { Interest, Theme, User } from "@/interfaces";

export type UserActions = {
  setUser: (user: User) => void;
  setInterests: (interests: Interest[]) => void;
  setThemes: (themes: Theme[]) => void;
};
