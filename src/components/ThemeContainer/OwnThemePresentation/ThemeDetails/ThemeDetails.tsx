import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ApproveInterestPayload, Interest, Theme } from "@/interfaces";
import { InterestList } from "../../InterestList/InterestList";
import { useMutation } from "@tanstack/react-query";
import { approveInterest } from "@/services/interestService";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export interface ThemeDetailsProps {
  theme: Theme;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ThemeDetails = ({
  theme,
  open,
  onOpenChange,
}: ThemeDetailsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const approveMutation = useMutation({
    mutationFn: approveInterest,
    mutationKey: ["approveInterest"],
    onSuccess: () => {
      toast({ description: "Trabalho de TCC criado com sucesso." });
      navigate("/papers");
    },
    onError: () => {
      console.log("error");
      toast({
        variant: "destructive",
        title: "Uh oh! Houve um problema.",
        description: "Ocorreu um problema ao tentar aceitar um interesse.",
        duration: 2500,
      });
    },
  });
  const showNoInterestMessage = theme.interests.length === 0;

  const handleApprove = async (interest: Interest) => {
    const professorId =
      interest.owner.role !== "STUDENT" ? interest.ownerId : theme.ownerId;
    const studentId =
      interest.owner.role === "STUDENT" ? interest.ownerId : theme.ownerId;

    const body: ApproveInterestPayload = {
      professorId,
      studentId,
      themeId: theme.id,
      interestId: interest.id,
    };

    approveMutation.mutate(body);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>{theme.label}</DialogTitle>
          <DialogDescription>{theme.summary}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-sm font-medium text-gray-600">
              Interesses
            </span>
            <Separator />
          </div>
          {showNoInterestMessage ? (
            <span className="text-xs">
              Seu tema não possui nenhum interesse até o momento.
            </span>
          ) : (
            <InterestList
              interests={theme.interests}
              onApprove={handleApprove}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
