import { User, Paper, UserRoles } from "./Models";

export type SignInResponse = {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  interestId: string | string[] | null;
  role: UserRoles;
  token: string;
};

export type CreateThemeResponse = {
  id: string;
  label: string;
  summary: string;
  duration: number;
  studentId: string | null;
  professorId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type GetThemesResponse = Theme[];

export type Theme = {
  id: string;
  label: string;
  summary: string;
  duration: number;
  owner: User;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  paperProposition: Paper | null;
  paper: Paper | null;
  interests: Interest[];
};

export type Interest = {
  createdAt: string;
  id: string;
  ownerId: string;
  text: string;
  themeId: string;
  updatedAt: string;
  owner: User;
};
