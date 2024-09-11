import { PaperStatus, PaperStatusValues } from "@/interfaces/Paper";
import {
  BookCheckIcon,
  ClockIcon,
  FileCheckIcon,
  FileXIcon,
} from "lucide-react";

type PaperStatusMapValue = {
  icon: React.ReactElement;
  label: string;
};

export const PaperStatusIconMap: Record<PaperStatus, PaperStatusMapValue> = {
  APPROVED: {
    icon: <FileCheckIcon className="w-4 h-4" />,
    label: PaperStatusValues.APPROVED,
  },
  PENDING: {
    icon: <ClockIcon className="w-4 h-4" />,
    label: PaperStatusValues.PENDING,
  },
  REJECTED: {
    icon: <FileXIcon className="w-4 h-4" />,
    label: PaperStatusValues.REJECTED,
  },
  COMPLETED: {
    icon: <BookCheckIcon className="w-4 h-4" />,
    label: PaperStatusValues.COMPLETED,
  },
};
