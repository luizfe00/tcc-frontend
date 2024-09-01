import { PaperStatus, PaperStatusValues } from "@/interfaces/Paper";
import {
  ClockIcon,
  FileCheckIcon,
  FileXIcon,
  NotebookPenIcon,
} from "lucide-react";

type PaperStatusMapValue = {
  icon: React.ReactElement;
  label: string;
};

export const PaperStatusIconMap: Record<PaperStatus, PaperStatusMapValue> = {
  approved: {
    icon: <FileCheckIcon className="w-4 h-4" />,
    label: PaperStatusValues.approved,
  },
  ongoing: {
    icon: <NotebookPenIcon className="w-4 h-4" />,
    label: PaperStatusValues.ongoing,
  },
  rejected: {
    icon: <FileXIcon className="w-4 h-4" />,
    label: PaperStatusValues.rejected,
  },
  waiting: {
    icon: <ClockIcon className="w-4 h-4" />,
    label: PaperStatusValues.waiting,
  },
};
