import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Approval } from "@/interfaces";
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

export type PaperStatus = "Ongoing" | "Approved" | "Submitted" | "Rejected";

type PaperStatusMapValue = {
  icon: React.ReactElement;
  label: string;
};

const PaperStatusIconMap: Record<PaperStatus, PaperStatusMapValue> = {
  Approved: {
    icon: <FileCheckIcon className="w-4 h-4" />,
    label: "Aprovado",
  },
  Ongoing: {
    icon: <NotebookPenIcon className="w-4 h-4" />,
    label: "Em produção",
  },
  Rejected: {
    icon: <FileXIcon className="w-4 h-4" />,
    label: "Rejeitado",
  },
  Submitted: {
    icon: <ClockIcon className="w-4 h-4" />,
    label: "Aguardando",
  },
};

export const PaperStatus: React.FC<PaperStatusProps> = ({ approvals = [] }) => {
  const paperStatus = React.useMemo(() => {
    if (!approvals.length) return PaperStatusIconMap.Ongoing;
    if (approvals.length === 2) {
      if (approvals[1].approval) return PaperStatusIconMap.Approved;
      return PaperStatusIconMap.Ongoing;
    }
    const pending = approvals.some((approval) => approval.approval == null);
    if (pending) return PaperStatusIconMap.Submitted;
    const rejected = approvals.some((approval) => approval.approval === false);
    if (rejected) return PaperStatusIconMap.Rejected;
    return PaperStatusIconMap.Ongoing;
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
