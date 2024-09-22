import { create } from "zustand";
import { DashboardStoreState } from "./dashboard.state";
import { DashboardStoreActions } from "./dashboard.actions";

export const DashboardStore = create<
  DashboardStoreState & DashboardStoreActions
>((set) => ({
  minCredits: 0,
  minPeriods: 0,
  preRequisites: "",
  activeProfessors: "",
  reminderTemplate: "",
  reminderDaysBefore: 0,
  setConfigParam: (param, value) => {
    set((state) => ({
      ...state,
      [param]: value,
    }));
  },
  setConfig: (config) => {
    set((state) => ({
      ...state,
      ...config,
    }));
  },
}));
