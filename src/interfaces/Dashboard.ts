export type PaperPerMonth = {
  year: string;
  month: string;
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

export type InterestBI = {
  interestsCount: number;
  interestsApprovedCount: number;
};

export type ThemeBI = {
  themeCount: number;
  themeActiveCount: number;
  studentThemeCount: number;
  studentActiveThemeCount: number;
  professorThemeCount: number;
  professorActiveThemeCount: number;
};
