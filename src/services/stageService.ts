import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import { CreateStagePayload, PaperStage } from "@/interfaces";

export const getPaperStages = async (paperId: string) => {
  const { data } = await axiosInstace.get<PaperStage[]>(
    `/${ENDPOINT.LIST_PAPER_STAGES}`.replace(":id", paperId)
  );
  return data;
};

export const createNewStage = async (stage: CreateStagePayload) => {
  const { data } = await axiosInstace.post<PaperStage>(
    `/${ENDPOINT.CREATE_STAGE}`,
    stage
  );
  return data;
};
