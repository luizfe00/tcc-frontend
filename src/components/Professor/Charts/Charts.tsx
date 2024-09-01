import { ProfessorDashboardBIResponse } from "@/interfaces/Dashboard";
import { CategoriesCharts } from "./CategoriesCharts/CategoriesCharts";
import { InterestsChart } from "./InterestChart/InterestsChart";
import PapersChart from "./PapersChart/PapersChart";
import { ThemesChart } from "./ThemesChart/ThemesChart";

export interface ChartsProps {
  data: ProfessorDashboardBIResponse;
}

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2 md:flex-row">
        <ThemesChart data={data.themes} />
        <PapersChart data={data.papers} />
        <InterestsChart data={data.interests} />
      </div>
      {/* <CategoriesCharts data={data.categories} /> */}
    </div>
  );
};
