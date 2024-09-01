import { PaperStatusIconMap } from "@/constants/Paper";
import { Approval } from "@/interfaces";

export const getPaperStatus = (approvals: Approval[]) => {
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
};
