import { SignInResponse } from "./ServiceResponse";

export type UserRoles = "STUDENT" | "TEACHER" | "COORDINATOR";
export type PaperType = "PTCC" | "TCC";

export type User = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  categories: Category[];
  professorActive?: boolean;
  papers?: Paper[];
  themes?: Theme[];
  interests?: Interest[];
} & SignInResponse;

export type Category = {
  id: string;
  name: string;
  description: string;
  themes?: Theme[];
  users?: User[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

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
  categories: Category[];
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
  type: PaperType;
  orientee?: User;
  advisor?: User;
  theme?: Theme;
  themeId?: string;
  stages?: PaperStage[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  approvals?: Approval[];
};

export type PaperStage = {
  id?: string;
  label: string;
  paper: Paper;
  viewed: boolean;
  message?: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
};

export type Approval = {
  id?: string;
  createdAt?: string;
  response?: string;
  approval?: boolean;
  paperId?: string;
  paper?: Paper;
  type?: PaperType;
};
