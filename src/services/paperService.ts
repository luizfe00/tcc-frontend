import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import {
  Approval,
  GetUserPapersResponse,
  Paper,
  UpdatePaperPayload,
} from "@/interfaces";

export const getUserPapers = async () => {
  const { data } = await axiosInstace.get<GetUserPapersResponse>(
    `/${ENDPOINT.GET_USER_PAPERS}`
  );
  return data;
};

export const getPaperDetails = async (paperId: string) => {
  if (paperId === "") return;
  const { data } = await axiosInstace.get<Paper>(
    `/${ENDPOINT.GET_PAPER_DETAILS.replace(":id", paperId)}`
  );
  return data;
};

export const updatePaper = async (paper: UpdatePaperPayload) => {
  await axiosInstace.put(
    `/${ENDPOINT.UPDATE_PAPER.replace(":id", paper.paperId)}`,
    { documentUrl: paper.documentUrl }
  );
};

export const submitPaper = async (paperId: string) => {
  const { data } = await axiosInstace.post<Approval>(
    `${ENDPOINT.SUBMIT_PAPER}`,
    {
      paperId,
    }
  );
  return data;
};
