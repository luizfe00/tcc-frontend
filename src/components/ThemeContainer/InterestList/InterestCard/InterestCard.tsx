import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Interest } from "@/interfaces";
import { getUserFirstName } from "@/utils/StringUtil";

export interface InterestCardActions {
  onApprove?: (interest: Interest) => void;
  onReject?: (interest: Interest) => void;
}

export interface InterestCardProps extends InterestCardActions {
  interest: Interest;
}

export const InterestCard = ({
  interest,
  onApprove = () => {},
  onReject = () => {},
}: InterestCardProps) => {
  return (
    <Card className="p-3">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <span>{getUserFirstName(interest.owner.name)}</span>
          <span>{interest.createdAt}</span>
        </div>
        <Separator />
        <p className="text-left text-sm">{interest.text}</p>
      </div>
      <div className="flex gap-2 justify-end">
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
      </div>
    </Card>
  );
};
