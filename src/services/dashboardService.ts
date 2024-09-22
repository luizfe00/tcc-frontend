import {
  SystemConfig,
  GetDashboardDataResponse,
  GetPapersResponse,
  SubjectResponse,
  Theme,
  User,
} from "@/interfaces";
import axiosInstace from "./axios";
import {
  AnonymizedProfessor,
  ProfessorDashboardBIResponse,
} from "@/interfaces/Dashboard";
import { DashboardStore } from "@/stores/dashboard/dashboard.store";

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

export const getPapers = async () => {
  const { data } = await axiosInstace.get<GetPapersResponse>(`/papers/all`);
  return data;
};

export const getThemes = async () => {
  const { data } = await axiosInstace.get<Theme[]>(`/themes/all`);
  return data;
};

export const getProfessors = async () => {
  const { data } = await axiosInstace.get<AnonymizedProfessor[]>(
    `/dashboard/teachers?academicUnitCode=14110000`
  );
  return data;
};

export const getSubjects = async () => {
  const { data } = await axiosInstace.get<SubjectResponse[]>(
    `/dashboard/subjects?academicUnitCode=14110000`
  );
  return data;
};

export const getConfig = async () => {
  const { data } = await axiosInstace.get<SystemConfig>(`/config`);
  DashboardStore.getState().setConfig(data);
  return data;
};

export const updateConfig = async (config: Partial<SystemConfig>) => {
  const { data } = await axiosInstace.put<SystemConfig>(`/config`, config);
  return data;
};

export const getStudents = async () => {
  const { data } = await axiosInstace.get<User[]>(`dashboard/students`);
  return data;
};
