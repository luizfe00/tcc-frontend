import { toast } from "@/components/ui/use-toast";
import { CreateNewThemePayload, Theme } from "@/interfaces";
import { createnewTheme } from "@/services/themeService";
import { useUserStore } from "@/user/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewThemeForm } from "./NewTheme";
import { getNewThemeSchema } from "./util/NewThemeUtil";

export interface NewThemeProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  theme?: Theme;
}

export const NewTheme = ({ open, onOpenChange, theme }: NewThemeProps) => {
  const userState = useUserStore((state) => state.user);
  const zodSchema = getNewThemeSchema(userState?.role);

  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: theme
      ? {
          duration: theme.duration.toString(),
          startDate: new Date(theme.startDate),
          label: theme.label ?? "",
          summary: theme.summary,
        }
      : {
          label: "",
          summary: "",
          duration: "30",
        },
  });

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

  const onSubmit = (data: z.infer<typeof zodSchema>) => {
    const newFormPayload: CreateNewThemePayload = {
      duration: Number(data.duration),
      startDate: data?.startDate?.toISOString(),
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

  return (
    <NewThemeForm
      open={open}
      form={form}
      handleClose={handleClose}
      onSubmit={form.handleSubmit(onSubmit)}
      theme={theme}
    />
  );
};
