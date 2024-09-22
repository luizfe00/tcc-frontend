import { SystemConfig } from "@/interfaces";

export type DashboardStoreActions = {
  setConfigParam: (param: keyof SystemConfig, value: string | number) => void;
  setConfig: (config: SystemConfig) => void;
};
