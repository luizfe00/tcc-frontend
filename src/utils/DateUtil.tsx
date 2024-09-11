import { format } from "date-fns";

export const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }
  return format(date, "dd/MM/yyyy");
};
