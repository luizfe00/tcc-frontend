import dayjs from "dayjs";
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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PaperStage } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePendingFeedback } from "@/services/stageService";
import { toast } from "@/components/ui/use-toast";

export interface PendingStageDetailsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  stage?: PaperStage;
}

const zodSchema = z.object({
  feedback: z.string().min(5),
});

type PendingStageFeedback = z.infer<typeof zodSchema>;

export const PendingStageDetails = ({
  open,
  onOpenChange,
  stage,
}: PendingStageDetailsProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["viewPending"],
    mutationFn: updatePendingFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingFeedback"] });
      toast({ description: "Feedback enviado.", duration: 2500 });
    },
  });

  const handleOpenPendingDetails = async (data?: PendingStageFeedback) => {
    try {
      mutation.mutate({
        id: stage?.id ?? "",
        viewed: true,
        feedback: data?.feedback,
      });
    } catch (error) {
      toast({
        description: "Ocorreu um erro ao atualizar o envio",
        variant: "destructive",
        duration: 2500,
      });
    }
  };

  const form = useForm<PendingStageFeedback>({
    resolver: zodResolver(zodSchema),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>{stage?.paper.theme?.label}</DialogTitle>
          <DialogDescription>
            {stage?.paper.orientee?.name} -{" "}
            {dayjs(stage?.createdAt).format("DD/MM/YYYY")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <span className="text-sm">{stage?.label}</span>
          <div>
            <span className="text-sm font-medium text-gray-500">
              Link para documento:
            </span>
            <span>{stage?.paper?.documentUrl}</span>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOpenPendingDetails)}
              className="space-y-3 flex flex-col justify-center"
            >
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Envie uma mensagem de feedback.
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
