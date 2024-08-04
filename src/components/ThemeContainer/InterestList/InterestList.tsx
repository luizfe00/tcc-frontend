import { Interest } from "@/interfaces";
import { InterestCard } from "./InterestCard/InterestCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface InterestListProps {
  interests?: Interest[];
}

export const InterestList = ({ interests = [] }: InterestListProps) => {
  return (
    <ScrollArea className="max-h-[400px]">
      <div className="flex flex-col gap-y-4">
        {!interests.length ? (
          <span className="text-xs">Você ainda não tem um interesse</span>
        ) : (
          interests.map((interest) => (
            <InterestCard key={interest.id} interest={interest} />
          ))
        )}
      </div>
    </ScrollArea>
  );
};
