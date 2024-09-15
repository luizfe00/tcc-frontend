import { Interest } from "@/interfaces";
import { InterestCard, InterestCardActions } from "./InterestCard/InterestCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from "@/user/user.store";

export interface InterestListProps extends InterestCardActions {
  interests?: Interest[];
  owner?: boolean;
  readonly?: boolean;
  themeOwner?: boolean;
}

export const InterestList = ({
  interests = [],
  owner,
  readonly,
  onApprove,
  onReject,
  onDelete,
  themeOwner,
}: InterestListProps) => {
  const userPaper = useUserStore((state) => state.user?.orienteePaper);
  const showPaperInProgressMessage = !!userPaper;

  return (
    <ScrollArea className="max-h-4/5">
      <div className="flex flex-col gap-y-4">
        {!interests.length ? (
          <span className="text-xs">
            {showPaperInProgressMessage
              ? "Você já tem um trabalho em andamento"
              : "Você ainda não tem um interesse"}
          </span>
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
              themeOwner={themeOwner}
            />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
