import { Paper } from "@/interfaces";
import { PaperDetails } from "../../Paper/PaperDetails/PaperDetails";
import { Card, CardContent } from "@/components/ui/card";

export interface StudentPaperViewProps {
  papers?: Paper[];
}

export const StudentPaperView = ({ papers = [] }: StudentPaperViewProps) => {
  return (
    <div className="flex items-center justify-center pt-8">
      <Card className="min-w-[50%]">
        <CardContent className="p-8">
          {papers?.length ? <PaperDetails paper={papers?.[0]} /> : <></>}
        </CardContent>
      </Card>
    </div>
  );
};
