import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createnewTheme } from "@/services/themeService";
import { CreateNewThemePayload, Theme } from "@/interfaces";
import { addDays, addMonths } from "date-fns";
import { DatePicker } from "@/components/DatePicker/DatePicker";

export interface NewThemeProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  theme?: Theme;
}

const zodSchema = z
  .object({
    label: z
      .string({ required_error: "É necessário informar um título." })
      .min(5, "Título deve conter ao menos 5 caracteres."),
    summary: z
      .string({ required_error: "É necessário informar um resumo." })
      .min(10, "Resumo deve conter ao menos 10 caracteres"),
    startDate: z
      .date()
      .refine(
        (data) => data > addDays(new Date(), -1),
        "Data de inicio deve estar no futuro."
      ),
    endDate: z.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Data de fim deve ser maior que Data de início.",
    path: ["endDate"],
  });

export type NewThemeForm = z.infer<typeof zodSchema>;

export const NewTheme = ({
  theme,
  open = false,
  onOpenChange,
}: NewThemeProps) => {
  const prismaClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["newTheme"],
    mutationFn: createnewTheme,
    onSuccess: (data) => {
      prismaClient.setQueryData(["userThemes"], (oldData: Theme[]) => {
        return [...oldData, data];
      });
      toast({ description: "Tema criado com sucesso", duration: 2500 });
      form.reset(undefined, { keepDirtyValues: false });
      if (onOpenChange) onOpenChange(false);
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "Ocorreu um erro ao criar o tema.",
        variant: "destructive",
        duration: 2500,
      });
    },
  });

  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: theme
      ? {
          endDate: new Date(theme.endDate),
          startDate: new Date(theme.startDate),
          label: theme.label,
          summary: theme.summary,
        }
      : {},
  });

  const onSubmit = (data: NewThemeForm) => {
    const newFormPayload: CreateNewThemePayload = {
      endDate: data.endDate.toISOString(),
      startDate: data.startDate.toISOString(),
      label: data.label,
      summary: data.summary,
    };
    mutation.mutate(newFormPayload);
  };

  const handleClose = (open: boolean) => {
    form.reset(undefined, { keepDirtyValues: false });
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  const startDateValue = form.watch("startDate");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo tema</DialogTitle>
          <DialogDescription>
            Crie um novo tema de seu interesse para que outros usuários possam
            definir um interesse.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe um titulo pro seu tema"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grow flex gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Date de Início</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        selected={field.value}
                        onSelect={field.onChange}
                        datePickerProps={{
                          disabled: {
                            before: new Date(),
                          },
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Data de Fim</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        selected={field.value}
                        onSelect={field.onChange}
                        datePickerProps={{
                          defaultMonth: addMonths(startDateValue, 1),
                          disabled: {
                            before:
                              addDays(startDateValue, 30) ||
                              addDays(new Date(), 30),
                          },
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
              Expectativa para data de início e fim da produção do trabalho.
            </FormDescription>
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Descreva o seu tema para os outros usuários.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"sm"}>
              {theme ? "Salvar" : "Criar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
