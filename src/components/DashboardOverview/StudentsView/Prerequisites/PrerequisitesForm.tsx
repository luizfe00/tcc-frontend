import { Combobox } from "@/components/Combobox/Combobox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DashboardStore } from "@/stores/dashboard/dashboard.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const zodSchema = z.object({
  minCredits: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Mínimo de créditos deve ser um número válido",
  }),
  minPeriods: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Mínimo de períodos deve ser um número válido",
  }),
  preRequisites: z.array(z.string()),
});

export type PrerequisitesForm = z.infer<typeof zodSchema>;

interface PrerequisitesFormProps {
  onSubmit: (data: PrerequisitesForm) => void;
  subjects: {
    value: string;
    label: string;
  }[];
}

export const PrerequisitesForm = ({
  onSubmit,
  subjects = [],
}: PrerequisitesFormProps) => {
  const dashboardState = DashboardStore((state) => state);
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      minCredits: dashboardState.minCredits.toString() || "",
      minPeriods: dashboardState.minPeriods.toString() || "",
      preRequisites: dashboardState.preRequisites.split(",") || [],
    },
  });

  const handleSubmit = (data: PrerequisitesForm) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3 flex flex-col justify-center"
        onSubmit={form.handleSubmit(handleSubmit, (erros) =>
          console.log(erros, form.getValues())
        )}
      >
        <FormField
          control={form.control}
          name="minCredits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mínimo de créditos</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mínimo de créditos..."
                  {...field}
                  value={dashboardState.minCredits.toString()}
                  onChange={(e) => {
                    field.onChange(e);
                    dashboardState.setConfigParam(
                      "minCredits",
                      Number(e.target.value)
                    );
                  }}
                />
              </FormControl>
              <FormDescription>
                Mínimo de créditos necessários para que o aluno esteja apto a
                produzir um trabalho de conclusão de curso.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minPeriods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mínimo de períodos</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mínimo de períodos..."
                  {...field}
                  value={dashboardState.minPeriods.toString()}
                  onChange={(e) => {
                    field.onChange(e);
                    dashboardState.setConfigParam(
                      "minPeriods",
                      Number(e.target.value)
                    );
                  }}
                />
              </FormControl>
              <FormDescription>
                Mínimo de períodos necessários para que o aluno esteja apto a
                produzir um trabalho de conclusão de curso.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preRequisites"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Pré-requisitos</FormLabel>
              <FormControl className="w-full">
                <Combobox
                  data={subjects}
                  placeholder="Pré-requisitos..."
                  {...field}
                  value={
                    dashboardState.preRequisites
                      ? dashboardState.preRequisites.split(",")
                      : []
                  }
                  onChange={(value) => {
                    field.onChange(value);
                    dashboardState.setConfigParam(
                      "preRequisites",
                      value.join(",")
                    );
                  }}
                />
              </FormControl>
              <FormDescription>
                Pré-requisitos necessários para que o aluno esteja apto a
                produzir um trabalho de conclusão de curso.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 flex-wrap">
          {dashboardState.preRequisites
            ? dashboardState.preRequisites.split(",").map((preRequisite) => (
                <Badge variant={"outline"} key={preRequisite}>
                  <CircleX
                    className="w-4 h-4 mr-2 hover:cursor-pointer"
                    onClick={() => {
                      const updatedPreRequisites = dashboardState.preRequisites
                        .split(",")
                        .filter(
                          (prerequisite) => prerequisite !== preRequisite
                        );
                      dashboardState.setConfigParam(
                        "preRequisites",
                        updatedPreRequisites.join(",")
                      );
                    }}
                  />
                  {
                    subjects.find((subject) => subject.value === preRequisite)
                      ?.label
                  }
                </Badge>
              ))
            : null}
        </div>
        <Button type="submit" size={"sm"}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};
