import { User } from "./Models";

export type PaperPerMonthQuery = {
  year: number;
  month: number;
  totalPapers: number;
  ptccCount: number;
  ptccApprovedCount: number;
  tccCount: number;
  tccApprovedCount: number;
};

export type StageBI = {
  stagesCount: number;
  stagesViewedCount: number;
  stagesRespondedCount: number;
};

export type CategoryInterestsQuery = {
  id: string;
  name: string;
  count: number;
};

export type InterestBI = {
  interestsCount: number;
  interestsApprovedCount: number;
  categoriesWithMostInterests: CategoryInterestsQuery[];
  categoriesWithLeastInterests: CategoryInterestsQuery[];
};

export type ThemeInterestsQuery = {
  id: string;
  label: string;
  interestCount: number;
};

export type ThemeBI = {
  themeCount: number;
  themeActiveCount: number;
  studentThemeCount: number;
  studentActiveThemeCount: number;
  professorThemeCount: number;
  professorActiveThemeCount: number;
  themesWithMostInterests: ThemeInterestsQuery[];
  themesWithLeastInterests: ThemeInterestsQuery[];
  professorThemeStats: ProfessorsThemeStatsQuery[];
};

export type ProfessorsThemeStatsQuery = {
  professorId: string;
  professorName: string;
  professorEmail: string;
  professorEnrollment: string;
  totalThemes: number;
  activeThemes: number;
  inactiveThemes: number;
};

export type PaperPerProfessorQuery = {
  professorName: string;
  professorEmail: string;
  totalPapers: number;
  ptccCount: number;
  ptccApprovedCount: number;
  tccCount: number;
  tccApprovedCount: number;
};

export type PaperBI = {
  totalPapers: number;
  ptccCount: number;
  ptccApprovedCount: number;
  tccCount: number;
  tccApprovedCount: number;
  paperPerMonth: PaperPerMonthQuery[];
  professorPaperBI: PaperPerProfessorQuery[];
};

export type CategoryThemesQuery = {
  id: string;
  name: string;
  themeCount: number;
  paperCount: number;
};

export type CategoryBI = {
  categoriesWithMostThemes: CategoryThemesQuery[];
  categoriesWithLeastThemes: CategoryThemesQuery[];
  categoriesWithMostPapers: CategoryThemesQuery[];
  categoriesWithLeastPapers: CategoryThemesQuery[];
};

export type DashboardBI = {
  papers: PaperBI;
  interests: InterestBI;
  themes: ThemeBI;
  categories: CategoryBI;
};

export type DashboardBIQuery = {
  startDate: string;
  endDate: string;
};

export type ProfessorCategoryStatsQuery = {
  name: string;
  themeCount: number;
  paperCount: number;
  activeThemes: number;
  inactiveThemes: number;
  ptccPapers: number;
  tccPapers: number;
  completedPapers: number;
  pendingPapers: number;
};

export type ProfessorInterestStatsQuery = {
  totalInterests: number;
  approvedInterests: number;
  pendingInterests: number;
};

export type ProfessorPaperStatsQuery = {
  totalPapers: number;
  approvedPapers: number;
  pendingPapers: number;
  ptccPapers: number;
  tccPapers: number;
  ptccApprovedPapers: number;
  tccApprovedPapers: number;
};

export type ProfessorThemeStatsByMonthQuery = {
  active: {
    completed: number;
    pending: number;
    rejected: number;
  };
  inactive: number;
};

export type ProfessorThemeStatsQuery = {
  totalThemes: number;
  activeThemes: number;
  inactiveThemes: number;
  themesByMonth: Record<string, ProfessorThemeStatsByMonthQuery>;
};

export type ProfessorDashboardBIResponse = {
  professor: User;
  categories: ProfessorCategoryStatsQuery[];
  interests: ProfessorInterestStatsQuery;
  papers: ProfessorPaperStatsQuery;
  themes: ProfessorThemeStatsQuery;
};

export type AnonymizedProfessor = {
  academicUnitCode: number;
  registration: number;
  status: string;
  titration: string;
};

export type GetProfessorsConfigDashboardResponse = {
  professors: AnonymizedProfessor[];
};

export type Prerequisites = {
  minCredits: number;
  minPeriods: number;
  preRequisites: string[];
};
