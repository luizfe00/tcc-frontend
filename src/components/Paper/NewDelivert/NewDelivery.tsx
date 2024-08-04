import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateStagePayload } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewStage } from "@/services/stageService";

export interface NewDeliveryProps {
  paperId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const zodSchema = z.object({
  label: z.string().min(5),
  message: z.string().min(5),
});

export const NewDelivery = ({
  onOpenChange = () => {},
  open,
  paperId,
}: NewDeliveryProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
  });
  const mutation = useMutation({
    mutationKey: ["createNewStage"],
    mutationFn: createNewStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paperStages"] });
      toast({ description: "Envio criado com sucesso.", duration: 2500 });
    },
  });

  const handleSubmit = async (data: z.infer<typeof zodSchema>) => {
    try {
      const body: CreateStagePayload = {
        label: data.label,
        paperId,
      };

      mutation.mutate(body);
      onOpenChange(false);
      form.resetField("label");
      form.resetField("message");
    } catch (error) {
      toast({
        description: "Ocorreu um erro ao criar sua entrada",
        variant: "destructive",
        duration: 2500,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Entrega</DialogTitle>
          <DialogDescription>
            Crie uma nova entrada para correção do orientador.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-3 flex flex-col justify-center"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe um titulo para sua entrega."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Envie uma mensagem explicativa para sua entrega
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"sm"}>
              Enviar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
