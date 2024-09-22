import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Interest } from "@/interfaces";
import { MailIcon, PenIcon } from "lucide-react";
import clsx from "clsx";
import { formatDate } from "@/utils/DateUtil";
import { handleSendEmail } from "@/services/emailService";

export interface InterestCardActions {
  onApprove?: (interest: Interest) => void;
  onReject?: (interest: Interest) => void;
  onDelete?: (interest: Interest) => void;
}

export interface InterestCardProps extends InterestCardActions {
  interest: Interest;
  owner?: boolean;
  readonly?: boolean;
  themeOwner?: boolean;
}

export const InterestCard = ({
  interest,
  owner,
  readonly = false,
  themeOwner = false,
  onApprove = () => {},
  onReject = () => {},
}: InterestCardProps) => {
  return (
    <Card className="p-3 cursor-default">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <span className="text sm font-medium">
            {themeOwner ? interest.owner.name : interest?.theme?.label}
          </span>
          <span className="text-sm font-medium">
            {formatDate(interest.createdAt)}
          </span>
        </div>
        <Separator />
        <p className="text-left text-sm">{interest.text}</p>
      </div>
      <div className="flex gap-2 justify-end">
        {owner ? (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8"
              disabled={readonly}
              onClick={() =>
                handleSendEmail(
                  interest.owner.email,
                  "Tema de Interesse",
                  interest.text
                )
              }
            >
              <MailIcon className="w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              disabled={readonly}
            >
              <PenIcon className="w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="w-8 h-8"
              disabled={readonly}
            >
              <TrashIcon className="w-5" />
            </Button>
          </>
        ) : themeOwner ? (
          <>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onReject(interest)}
              disabled={readonly}
            >
              Recusar
            </Button>
            <Button
              size="sm"
              onClick={() => onApprove(interest)}
              disabled={readonly}
            >
              Aceitar
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};
