import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import { Approval } from "@/interfaces";

export const getPendingApprovals = async () => {
  const { data } = await axiosInstace.get<Approval[]>(
    `/${ENDPOINT.GET_PENDING_APPROVALS}`
  );
  return data;
};
