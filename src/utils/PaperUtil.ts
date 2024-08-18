import { PaperStatusIcons } from "@/constants/Paper";
import { Approval } from "@/interfaces";
import { PaperStatusLabel, PaperStatusValues } from "@/interfaces/Paper";

export const getPaperApprovalStatusLabel = (
  approvals: Approval[]
): PaperStatusLabel => {
  if (!approvals.length) return PaperStatusValues.ongoing;
  if (approvals.length === 2) {
    if (approvals[1].approval) return PaperStatusValues.approved;
    return PaperStatusValues.ongoing;
  }
  const pending = approvals.some((approval) => approval.approval == null);
  if (pending) return PaperStatusValues.waiting;
  const rejected = approvals.some((approval) => approval.approval === false);
  if (rejected) return PaperStatusValues.rejected;
  return PaperStatusValues.ongoing;
};

export const getPaperApprovalStatusIcon = (approvals: Approval[]) => {
  if (!approvals.length) return PaperStatusIcons.ongoing;
  if (approvals.length === 2) {
    if (approvals[1].approval) return PaperStatusIcons.approved;
    return PaperStatusIcons.ongoing;
  }
  const pending = approvals.some((approval) => approval.approval == null);
  if (pending) return PaperStatusIcons.waiting;
  const rejected = approvals.some((approval) => approval.approval === false);
  if (rejected) return PaperStatusIcons.rejected;
  return PaperStatusIcons.ongoing;
};
