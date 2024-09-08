import { DashboardBI } from "./Dashboard";
import { Paper, UserRoles, Theme, PaperStage, User, PaperType } from "./Models";
import { PaperStatus } from "./Paper";

export type SignInResponse = {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  orienteePaper?: Paper;
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

export type PapersTable = {
  id: string;
  status: PaperStatus;
  tccDocumentUrl?: string;
  ptccDocumentUrl?: string;
  type: PaperType;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  advisor: Partial<User>;
  orientee: Partial<User>;
  theme: Partial<Theme>;
};

export type GetThemesResponse = Theme[];

export type ApproveInterestResponse = Paper;

export type GetUserPapersResponse = Paper[];

export type CreateStageResponse = PaperStage;

export type GetDashboardDataResponse = DashboardBI;

export type GetPapersResponse = PapersTable[];
