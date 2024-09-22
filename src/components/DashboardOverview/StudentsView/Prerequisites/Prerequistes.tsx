import {
  getConfig,
  getSubjects,
  updateConfig,
} from "@/services/dashboardService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PrerequisitesForm } from "./PrerequisitesForm";
import { toast } from "@/components/ui/use-toast";
import { DashboardStore } from "@/stores/dashboard/dashboard.store";

export const Prerequistes = () => {
  const { data: subjects } = useQuery({
    queryKey: ["dashboard-subjects"],
    queryFn: getSubjects,
  });
  useQuery({
    queryKey: ["config"],
    queryFn: getConfig,
  });
  const { mutate: updateConfiguration } = useMutation({
    mutationKey: ["update-config"],
    mutationFn: updateConfig,
    onSuccess: () => {
      toast({
        title: "Configurações atualizadas com sucesso",
        variant: "default",
      });
    },
  });

  const handleSubmit = (data: PrerequisitesForm) => {
    updateConfiguration({
      minCredits: data.minCredits
        ? Number(data.minCredits)
        : DashboardStore.getState().minCredits,
      minPeriods: data.minPeriods
        ? Number(data.minPeriods)
        : DashboardStore.getState().minPeriods,
      preRequisites: data.preRequisites
        ? data.preRequisites.join(",")
        : DashboardStore.getState().preRequisites,
    });
  };

  const subjectsData =
    subjects
      ?.filter((subject) => subject.curriculumComponentTypeEnum === "NORMAL")
      .map((subject) => ({
        value: subject.subjectCode.toString(),
        label: subject.name,
      })) ?? [];

  return <PrerequisitesForm onSubmit={handleSubmit} subjects={subjectsData} />;
};
