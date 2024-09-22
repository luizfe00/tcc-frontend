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

export type CurriculumComponentType =
  | "NORMAL"
  | "ESTAGIO_SUPERVISIONADO"
  | "MONOGRAFIA"
  | "PRATICA_DE_ENSINO"
  | "TRABALHO_DE_GRADUACAO"
  | "ATIVIDADE_COMPLEMENTAR";

export type SubjectResponse = {
  subjectCode: number;
  name: string;
  weeklyTheoreticalHours: number;
  weeklyPracticalHours: number;
  credits: number;
  totalHours: number;
  passingAvarageGrade: number;
  academicUnitCode: number;
  status: "ATIVO" | "INATIVO";
  computeCre: string;
  curriculumComponentTypeEnum: CurriculumComponentType;
};

export type SystemConfig = {
  minCredits: number;
  minPeriods: number;
  preRequisites: string;
  activeProfessors: string;
  reminderTemplate: string;
  reminderDaysBefore: number;
};
