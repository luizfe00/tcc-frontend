import Navbar from "@/components/Navbar/Navbar";
import { ProfessorOverview } from "@/components/Professor/ProfessorOverview";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProfessorBIData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const ProfessorDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: professorData, isLoading } = useQuery({
    queryKey: ["professor", id],
    queryFn: () => getProfessorBIData(id ?? ""),
    enabled: !!id,
  });

  return (
    <div className="flex gap-8">
      <Sidebar />
      <div className="flex flex-col gap-y-4 p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/professors">Professores</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{professorData?.professor.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProfessorOverview data={professorData} />
      </div>
    </div>
  );
};
