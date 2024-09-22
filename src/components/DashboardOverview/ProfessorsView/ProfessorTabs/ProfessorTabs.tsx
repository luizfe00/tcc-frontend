import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfessorsTable } from "../ProfessorsTable";
import { ProfessorsConfig } from "../ProfessorsConfig/ProfessorsConfig";

export const ProfessorTabs = () => {
  return (
    <Tabs defaultValue="list">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="list">Resumo</TabsTrigger>
        <TabsTrigger value="config">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <ProfessorsTable />
      </TabsContent>
      <TabsContent value="config">
        <ProfessorsConfig />
      </TabsContent>
    </Tabs>
  );
};
