export type PaperStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
export type PaperStatusLabel =
  | "Aprovado"
  | "Concluído"
  | "Rejeitado"
  | "Aguardando";

export const PaperStatusValues: Record<PaperStatus, PaperStatusLabel> = {
  APPROVED: "Aprovado",
  PENDING: "Aguardando",
  REJECTED: "Rejeitado",
  COMPLETED: "Concluído",
} as const;
