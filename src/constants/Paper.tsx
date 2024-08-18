import { PaperStatus } from "@/interfaces/Paper";
import {
  ClockIcon,
  FileCheckIcon,
  FileXIcon,
  NotebookPenIcon,
} from "lucide-react";

export const PaperStatusIcons: Record<PaperStatus, React.ReactElement> = {
  approved: <FileCheckIcon className="w-4 h-4" />,
  ongoing: <NotebookPenIcon className="w-4 h-4" />,
  rejected: <FileXIcon className="w-4 h-4" />,
  waiting: <ClockIcon className="w-4 h-4" />,
};
