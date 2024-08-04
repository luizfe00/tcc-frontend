import { Interest } from "@/interfaces";
import { InterestCard, InterestCardActions } from "./InterestCard/InterestCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface InterestListProps extends InterestCardActions {
  interests?: Interest[];
}

export const InterestList = ({
  interests = [],
  onApprove,
  onReject,
}: InterestListProps) => {
  return (
    <ScrollArea className="max-h-[400px]">
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
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
