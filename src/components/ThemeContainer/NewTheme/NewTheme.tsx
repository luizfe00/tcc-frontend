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
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Theme } from "@/interfaces";
import { addDays } from "date-fns";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import { useUserStore } from "@/stores/user/user.store";

interface NewThemeFormValues {
  label: string;
  startDate?: Date;
  duration: string;
  summary: string;
}

export interface NewThemeFormProps {
  form: UseFormReturn<NewThemeFormValues>;
  open?: boolean;
  handleClose?: (open: boolean) => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  theme?: Theme;
}

export const NewThemeForm = ({
  form,
  open = false,
  handleClose,
  onSubmit = () => {},
  theme,
}: NewThemeFormProps) => {
  const user = useUserStore((state) => state.user);

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
            onSubmit={onSubmit}
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
              {user?.role === "STUDENT" && (
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Data de Início</FormLabel>
                      <FormControl>
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onSelect={field.onChange}
                          datePickerProps={{
                            disabled: {
                              before: addDays(new Date(), 1),
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input placeholder="Dias" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
              {user?.role === "STUDENT"
                ? "Defina a data de início e a duração para produção do seu tema em dias."
                : "Defina a duração para produção do seu tema em dias."}
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
