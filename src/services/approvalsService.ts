import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import { Approval } from "@/interfaces";

export const getPendingApprovals = async () => {
  const { data } = await axiosInstace.get<Approval[]>(
    `/${ENDPOINT.GET_PENDING_APPROVALS}`
  );
  return data;
};

export const updateApproval = async (approval: Approval) => {
  const { data } = await axiosInstace.put<Approval>(
    `/approval/${approval.id}`,
    {
      approval: approval.approval,
      response: approval.response,
      paperId: approval.paperId,
    }
  );
  return data;
};
