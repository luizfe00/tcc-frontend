import { GetDashboardDataResponse } from "@/interfaces";
import axiosInstace from "./axios";

export const getDashboardData = async () => {
  const { data } = await axiosInstace.get<GetDashboardDataResponse>(
    "/dashboard"
  );
  return data;
};
