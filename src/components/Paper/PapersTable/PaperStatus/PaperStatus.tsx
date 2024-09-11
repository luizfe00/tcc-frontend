import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Approval } from "@/interfaces";
import { getPaperStatus } from "@/utils/PaperUtil";

import React from "react";

export type PaperStatusProps = {
  approvals?: Approval[];
};

export const PaperStatusContainer: React.FC<PaperStatusProps> = ({
  approvals = [],
}) => {
  const paperStatus = React.useMemo(
    () => getPaperStatus(approvals),
    [approvals]
  );

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
