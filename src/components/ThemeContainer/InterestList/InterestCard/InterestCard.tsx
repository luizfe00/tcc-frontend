import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Interest } from "@/interfaces";
import { getUserFirstName } from "@/utils/StringUtil";

export interface InterestCardProps {
  interest: Interest;
}

export const InterestCard = ({ interest }: InterestCardProps) => {
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
        <Button size="sm" variant="destructive">
          Rejeitar
        </Button>
        <Button size="sm">Aceitar</Button>
      </div>
    </Card>
  );
};
