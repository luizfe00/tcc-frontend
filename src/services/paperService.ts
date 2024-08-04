import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import { GetUserPapersResponse } from "@/interfaces";

export const getUserPapers = async () => {
  const { data } = await axiosInstace.get<GetUserPapersResponse>(
    `/${ENDPOINT.GET_USER_PAPERS}`
  );
  return data;
};
