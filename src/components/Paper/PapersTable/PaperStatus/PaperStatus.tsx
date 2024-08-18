import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Approval } from "@/interfaces";
import { PaperStatus, PaperStatusValues } from "@/interfaces/Paper";
import {
  ClockIcon,
  FileCheckIcon,
  FileXIcon,
  NotebookPenIcon,
} from "lucide-react";
import React from "react";

export type PaperStatusProps = {
  approvals?: Approval[];
};

type PaperStatusMapValue = {
  icon: React.ReactElement;
  label: string;
};

const PaperStatusIconMap: Record<PaperStatus, PaperStatusMapValue> = {
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

export const PaperStatusContainer: React.FC<PaperStatusProps> = ({
  approvals = [],
}) => {
  const paperStatus = React.useMemo(() => {
    if (!approvals.length) return PaperStatusIconMap.ongoing;
    if (approvals.length === 2) {
      if (approvals[1].approval) return PaperStatusIconMap.approved;
      return PaperStatusIconMap.ongoing;
    }
    const pending = approvals.some((approval) => approval.approval == null);
    if (pending) return PaperStatusIconMap.waiting;
    const rejected = approvals.some((approval) => approval.approval === false);
    if (rejected) return PaperStatusIconMap.rejected;
    return PaperStatusIconMap.ongoing;
  }, [approvals]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full h-full flex justify-center items-center">
          {paperStatus?.icon}
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-xs">{paperStatus?.label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
