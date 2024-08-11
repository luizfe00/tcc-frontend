import { PapersGeneralView } from "@/components/Charts/PapersGeneralView";
import { ThemesGeneralView } from "@/components/Charts/ThemesGeneralView";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const DashboardPage = () => {
  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <div>
        <div className="flex flex-col">
          <span className="font-medium text-muted-foreground">Pendências</span>
          <span className="text-xs text-muted-foreground">
            Artigos produzidos pendentes de aprovação.
          </span>
          <Separator className="mt-1" />
        </div>
      </div>
      <div className="flex gap-4">
        <ThemesGeneralView />
        <PapersGeneralView />
      </div>
    </div>
  );
};
