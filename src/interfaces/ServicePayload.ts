export type ServicePayload = {
  username: string;
  password: string;
};

export type CreateThemePayload = {
  label: string;
  duration: number;
  summary: string;
};

export type ApproveInterestPayload = {
  documentUrl?: string;
  professorId: string;
  studentId: string;
  interestId: string;
  themeId: string;
};

export type CreateStagePayload = {
  label: string;
  paperId: string;
};
