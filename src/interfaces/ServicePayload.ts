export type ServicePayload = {
  username: string;
  password: string;
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
  message?: string;
};

export type UpdateStagePayload = {
  id: string;
  viewed?: boolean;
  feedback?: string;
};

export type CreateNewThemePayload = {
  summary: string;
  label: string;
  startDate: string;
  endDate: string;
};

export type CreateNewInterestPayload = {
  themeId: string;
  text: string;
};

export type UpdatePaperPayload = {
  documentUrl?: string;
  paperId: string;
};
