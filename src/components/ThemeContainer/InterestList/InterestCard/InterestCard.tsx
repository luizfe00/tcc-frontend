import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Interest } from "@/interfaces";
import { getUserFirstName } from "@/utils/StringUtil";

export interface InterestCardActions {
  onApprove?: (interest: Interest) => void;
  onReject?: (interest: Interest) => void;
  onDelete?: (interest: Interest) => void;
}

export interface InterestCardProps extends InterestCardActions {
  interest: Interest;
  owner?: boolean;
}

export const InterestCard = ({
  interest,
  owner,
  onApprove = () => {},
  onReject = () => {},
}: InterestCardProps) => {
  return (
    <Card className="p-3">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <span className="text sm font-medium">
            {getUserFirstName(interest.owner.name)}
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
          <Button variant="destructive" size="icon" className="w-8 h-8">
            <TrashIcon className="w-5" />
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onReject(interest)}
            >
              Rejeitar
            </Button>
            <Button size="sm" onClick={() => onApprove(interest)}>
              Aceitar
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
