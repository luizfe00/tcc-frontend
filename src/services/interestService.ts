import { ENDPOINT } from "@/constants/Endpoints";
import axiosInstace from "./axios";
import { Interest } from "@/interfaces";

export const getUserInterests = async () => {
  const interests = await axiosInstace.get<Interest[]>(
    `/${ENDPOINT.GET_USER_INTERESTS}`
  );
  return interests.data;
};
