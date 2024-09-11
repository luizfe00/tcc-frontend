import React from "react";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs as TabsUI,
} from "@/components/ui/tabs";

export interface TabProps {
  tabs: {
    label: string;
    value: string;
    content: React.ReactNode;
  }[];
  tabsContainerClassName?: string;
}

export const Tabs = ({ tabs, tabsContainerClassName }: TabProps) => {
  return (
    <TabsUI defaultValue={tabs[0].value} className={tabsContainerClassName}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="w-full">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsUI>
  );
};
