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

export interface NewThemeProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface NewThemeForm {
  label: string;
  summary: string;
  duration: number;
}

const zodSchema = z.object({
  label: z
    .string({ required_error: "É necessário informar um título." })
    .min(5, "Título deve conter ao menos 5 caracteres."),
  summary: z
    .string({ required_error: "É necessário informar um resumo." })
    .min(10, "Resumo deve conter ao menos 10 caracteres"),
  duration: z.coerce
    .number({ required_error: "É necessário informar um período." })
    .min(30, "Período deve ter ao menos 30 dias de duração"),
});

export const NewTheme = ({ open = false, onOpenChange }: NewThemeProps) => {
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = async (data: NewThemeForm) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <div className="flex gap-2 w-full">
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
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="w-1/5">
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              Criar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
