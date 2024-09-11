import { Tabs } from "../Tabs/Tabs";
import { SummaryView } from "./SummaryView/SummaryView";
import { PapersView } from "./PapersView/PapersView";
import { ThemesView } from "./ThemesView/ThemesView";

export const DashboardOverview = () => {
  return (
    <Tabs
      tabs={[
        {
          content: <SummaryView />,
          label: "Dashboard",
          value: "dashboard",
        },
        {
          content: <PapersView />,
          label: "Trabalhos",
          value: "papers",
        },
        {
          content: <ThemesView />,
          label: "Temas",
          value: "themes",
        },
      ]}
      tabsContainerClassName="flex flex-col gap-4"
    />
  );
};
