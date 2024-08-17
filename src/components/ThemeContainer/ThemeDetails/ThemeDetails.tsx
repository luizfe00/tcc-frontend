import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CreateNewInterestPayload, Interest, Theme } from "@/interfaces";
import { createInterest } from "@/services/interestService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface ThemeDetailsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  theme: Theme;
  disabled?: boolean;
}

const zodSchema = z.object({
  text: z.string(),
});

type NewInterestForm = z.infer<typeof zodSchema>;

export const ThemeDetailsDialog: React.FC<ThemeDetailsDialogProps> = ({
  onOpenChange = () => {},
  open,
  theme,
  disabled = false,
}: ThemeDetailsDialogProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["newInterest"],
    mutationFn: createInterest,
    onSuccess: (data) => {
      queryClient.setQueryData(["userInterests"], (oldData: Interest[]) => {
        return [...oldData, data];
      });
      form.reset();
      toast({
        description: "Interesse enviado com sucesso!",
        duration: 2500,
      });
      onOpenChange(false);
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "Ocorreu um erro ao enviar interesse",
        variant: "destructive",
        duration: 2500,
      });
    },
  });

  const form = useForm<NewInterestForm>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleNewInterest = (data: NewInterestForm) => {
    const body: CreateNewInterestPayload = {
      text: data.text,
      themeId: theme.id,
    };

    mutation.mutate(body);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>{theme.label}</DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>
              {theme.owner.name} - {theme.owner.email}
            </span>
            <span>
              De {format(theme.startDate, "dd/MM/yyyy")} até{" "}
              {format(theme.endDate, "dd/MM/yyyy")}
            </span>
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">{theme.summary}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleNewInterest)}>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea disabled={disabled} {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Envie uma mensagem demonstrando seu interesse pelo tema
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-2">
              <Button variant="outline" type="submit" disabled={disabled}>
                Enviar interesse
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
