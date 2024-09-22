import { CreateNewThemePayload, GetThemesResponse, Theme } from "@/interfaces";
import { ENDPOINT } from "../constants/Endpoints";
import axiosInstace from "./axios";
import { useUserStore } from "@/stores/user/user.store";

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

  useUserStore.setState({ themes: data });

  return data;
};

export const createnewTheme = async (theme: CreateNewThemePayload) => {
  const { data } = await axiosInstace.post<Theme>(
    `/${ENDPOINT.CREATE_THEME}`,
    theme
  );
  return data;
};
