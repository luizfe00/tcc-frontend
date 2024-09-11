import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Interest, Theme } from "@/interfaces";
import { getUserFirstName } from "@/utils/StringUtil";
import { MailIcon, PenIcon } from "lucide-react";
import { useUserStore } from "@/user/user.store";
import clsx from "clsx";

export interface InterestCardActions {
  onApprove?: (interest: Interest) => void;
  onReject?: (interest: Interest) => void;
  onDelete?: (interest: Interest) => void;
}

export interface InterestCardProps extends InterestCardActions {
  interest: Interest;
  owner?: boolean;
  readonly?: boolean;
}

export const InterestCard = ({
  interest,
  owner,
  readonly = false,
  onApprove = () => {},
  onReject = () => {},
}: InterestCardProps) => {
  const userState = useUserStore((state) => state);

  const showActions = owner && !userState.user?.orienteePaper?.id;

  return (
    <Card className="p-3 cursor-default">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <span className="text sm font-medium">
            {!owner ? interest.owner.name : interest?.theme?.label}
          </span>
          <span className="text-sm font-medium">
            {dayjs(interest.createdAt).format("DD/MM/YYYY")}
          </span>
        </div>
        <Separator />
        <p className="text-left text-sm">{interest.text}</p>
      </div>
      <div className="flex gap-2 justify-end">
        {owner ? (
          <>
            <a
              href={`mailto:${interest.owner.email}`}
              className={clsx([
                readonly && "pointer-events-none cursor-default",
              ])}
            >
              <Button
                variant="secondary"
                size="icon"
                className="w-8 h-8"
                disabled={readonly}
              >
                <MailIcon className="w-4" />
              </Button>
            </a>
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
        ) : showActions ? (
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
