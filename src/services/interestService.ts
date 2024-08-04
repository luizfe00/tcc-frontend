import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import {
  ApproveInterestPayload,
  ApproveInterestResponse,
  Interest,
} from "@/interfaces";

export const getUserInterests = async () => {
  const interests = await axiosInstace.get<Interest[]>(
    `/${ENDPOINT.GET_USER_INTERESTS}`
  );
  return interests.data;
};

export const approveInterest = async (
  approvedInterestBody: ApproveInterestPayload
) => {
  const approvedInterest = await axiosInstace.post<ApproveInterestResponse>(
    `/${ENDPOINT.APPROVE_INTEREST}`,
    approvedInterestBody
  );
  return approvedInterest;
};
