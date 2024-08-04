import { Paper, UserRoles, Theme, PaperStage } from "./Models";

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

export type ApproveInterestResponse = Paper;

export type GetUserPapersResponse = Paper[];

export type CreateStageResponse = PaperStage;
