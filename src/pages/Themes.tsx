import { ThemesView } from "@/components/DashboardOverview/ThemesView/ThemesView";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import React from "react";

export const ThemesPage = () => {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <div className="p-4 flex flex-col gap-4 w-full">
        <ThemesView />
      </div>
    </div>
  );
};
