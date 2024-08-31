import { GetDashboardDataResponse } from "@/interfaces";
import axiosInstace from "./axios";
import { ProfessorDashboardBIResponse } from "@/interfaces/Dashboard";

export const getDashboardData = async () => {
  const { data } = await axiosInstace.get<GetDashboardDataResponse>(
    "/dashboard"
  );
  return data;
};

export const getProfessorBIData = async (id: string) => {
  const { data } = await axiosInstace.get<ProfessorDashboardBIResponse>(
    `/dashboard/professor/${id}`
  );
  return data;
};
