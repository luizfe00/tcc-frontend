import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import { GetUserPapersResponse, Paper } from "@/interfaces";

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
