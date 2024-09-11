import { PaperStatusIconMap } from "@/constants/Paper";
import { Approval } from "@/interfaces";

export const getPaperStatus = (approvals: Approval[]) => {
  if (!approvals.length) return PaperStatusIconMap.PENDING;
  if (approvals.length === 2) {
    if (approvals[1].approval) return PaperStatusIconMap.APPROVED;
    return PaperStatusIconMap.PENDING;
  }
  const pending = approvals.some((approval) => approval.approval == null);
  if (pending) return PaperStatusIconMap.PENDING;
  const rejected = approvals.some((approval) => approval.approval === false);
  if (rejected) return PaperStatusIconMap.REJECTED;
  return PaperStatusIconMap.COMPLETED;
};
