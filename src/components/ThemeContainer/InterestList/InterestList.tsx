import { Interest } from "@/interfaces";
import { InterestCard, InterestCardActions } from "./InterestCard/InterestCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface InterestListProps extends InterestCardActions {
  interests?: Interest[];
  owner?: boolean;
  readonly?: boolean;
}

export const InterestList = ({
  interests = [],
  owner,
  readonly,
  onApprove,
  onReject,
  onDelete,
}: InterestListProps) => {
  return (
    <ScrollArea className="max-h-4/5">
      <div className="flex flex-col gap-y-4">
        {!interests.length ? (
          <span className="text-xs">Você ainda não tem um interesse</span>
        ) : (
          interests.map((interest) => (
            <InterestCard
              key={interest.id}
              interest={interest}
              onApprove={onApprove}
              onReject={onReject}
              onDelete={onDelete}
              owner={owner}
              readonly={readonly}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
