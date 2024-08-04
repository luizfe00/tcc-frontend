import { SignInResponse } from "./ServiceResponse";

export type UserRoles = "STUDENT" | "TEACHER" | "COORDINATOR";
export type User = SignInResponse;
export type Paper = {
  id: string;
  documentUrl: string;
  approved: boolean;
  studentId: string;
  professorId: string;
  themeId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  role: UserRoles;
};
