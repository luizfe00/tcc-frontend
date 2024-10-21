import React, { useState } from "react";
import { Approval } from "@/interfaces";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { PendingApprovalDetails } from "../PendingApprovalDetails/PendingApprovalDetails";

export type PendingApprovalCardProps = {
  approval: Approval;
};

export const PendingApprovalCard: React.FC<PendingApprovalCardProps> = ({
  approval,
}) => {
  const documentUrl =
    approval.paper?.type === "PTCC"
      ? approval.paper?.ptccDocumentUrl
      : approval.paper?.tccDocumentUrl;
  const [showApprovalDetails, setShowApprovalDetails] = useState(false);

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    window.open(documentUrl, "_blank");
  };

  return (
    <>
      <Card
        className="w-[400px] cursor-pointer hover:bg-muted"
        onClick={() => setShowApprovalDetails((prev) => !prev)}
      >
        <CardContent>
          <div className="pt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {approval.paper?.theme?.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(approval.createdAt ?? "", "dd/MM/yyyy")}
              </span>
            </div>
            <Separator className="mt-1 mb-2" />
            <div className="flex flex-col">
              <p className="text-sm">
                <span className="font-semibold">Orientando:</span>{" "}
                {approval.paper?.orientee?.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Orientador:</span>{" "}
                {approval.paper?.advisor?.name}
              </p>
            </div>
            <div className="flex gap-x-4 items-center">
              <label
                htmlFor={`"document_link"#${approval.id}`}
                className="text-sm text-muted-foreground"
              >
                Link para documento:
              </label>
              <Button
                id={`"document_link"#${approval.id}`}
                variant="link"
                className="p-0 h-8 overflow-hidden"
                onClick={handleLinkClick}
              >
                <span className="block text-ellipsis text-left whitespace-nowrap overflow-hidden line-clamp-1">
                  {documentUrl}
                </span>
              </Button>
            </div>
            <span className="block text-xs text-muted-foreground w-full text-right font-semibold">
              {approval.type}
            </span>
          </div>
        </CardContent>
      </Card>
      <PendingApprovalDetails
        approval={approval}
        onOpenChange={setShowApprovalDetails}
        open={showApprovalDetails}
      />
    </>
  );
};
