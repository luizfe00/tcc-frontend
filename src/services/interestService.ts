import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import {
  ApproveInterestPayload,
  ApproveInterestResponse,
  CreateNewInterestPayload,
  Interest,
} from "@/interfaces";
import { useUserStore } from "@/stores/user/user.store";

export const getUserInterests = async () => {
  const { data } = await axiosInstace.get<Interest[]>(
    `/${ENDPOINT.GET_USER_INTERESTS}`
  );
  useUserStore.getState().setInterests(data);
  return data;
};

export const approveInterest = async (
  approvedInterestBody: ApproveInterestPayload
) => {
  const { data } = await axiosInstace.post<ApproveInterestResponse>(
    `/${ENDPOINT.APPROVE_INTEREST}`,
    approvedInterestBody
  );
  return data;
};

export const createInterest = async (newInterest: CreateNewInterestPayload) => {
  const { data } = await axiosInstace.post<Interest>(
    `${ENDPOINT.CREATE_INTEREST}`,
    newInterest
  );
  return data;
};

export const deleteInterest = async (interestId: string) => {
  const { data } = await axiosInstace.delete<void>(`interest/${interestId}`);
  return data;
};
