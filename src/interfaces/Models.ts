import { SignInResponse } from "./ServiceResponse";

export type UserRoles = "STUDENT" | "TEACHER" | "COORDINATOR";
export type PaperType = "PTCC" | "TCC";
export type User = SignInResponse;

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
  startDate: string;
  endDate: string;
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

export type Paper = {
  id?: string;
  documentUrl?: string;
  approved: boolean;
  type: PaperType;
  orientee?: User;
  advisor?: User;
  theme?: Theme;
  stages?: PaperStage[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type PaperStage = {
  id?: string;
  label: string;
  paper: Paper;
  createdAt: string;
  updatedAt: string;
};
