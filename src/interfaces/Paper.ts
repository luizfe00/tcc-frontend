export type PaperStatus = "ongoing" | "waiting" | "approved" | "rejected";
export type PaperStatusLabel =
  | "Aprovado"
  | "Em andamento"
  | "Rejeitado"
  | "Aguardando";

export const PaperStatusValues: Record<PaperStatus, PaperStatusLabel> = {
  approved: "Aprovado",
  ongoing: "Em andamento",
  rejected: "Rejeitado",
  waiting: "Aguardando",
} as const;
