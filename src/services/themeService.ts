import { GetThemesResponse } from "@/interfaces";
import { ENDPOINT } from "../constants/Endpoints";
import axiosInstace from "./axios";

export const getAllStudentThemes = async () => {
  const { data } = await axiosInstace.get<GetThemesResponse>(
    `/${ENDPOINT.GET_STUDENT_THEMES}`
  );

  return data;
};

export const getAllProfessorThemes = async () => {
  const { data } = await axiosInstace.get<GetThemesResponse>(
    `/${ENDPOINT.GET_PROFESSOR_THEMES}`
  );

  return data;
};

export const getUserThemes = async () => {
  const { data } = await axiosInstace.get<GetThemesResponse>(
    `/${ENDPOINT.GET_USER_THEMES}`
  );

  return data;
};
