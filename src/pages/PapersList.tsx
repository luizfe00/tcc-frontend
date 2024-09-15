import { PapersView } from "@/components/DashboardOverview/PapersView/PapersView";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import React from "react";
export const PapersListPage = () => {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <div className="p-4 flex flex-col gap-4 w-full">
        <PapersView />
      </div>
    </div>
  );
};
