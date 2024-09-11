import { UserRoles } from "@/interfaces";
import { isFuture } from "date-fns";
import { z } from "zod";

export const getNewThemeSchema = (userRole?: UserRoles) => {
  return z.object({
    label: z
      .string({ required_error: "É necessário informar um título." })
      .min(5, "Título deve conter ao menos 5 caracteres."),
    summary: z
      .string({ required_error: "É necessário informar um resumo." })
      .min(10, "Resumo deve conter ao menos 10 caracteres"),
    startDate: z
      .date({ required_error: "É necessário informar uma data de início." })
      .refine((data) => isFuture(data), "Data de inicio deve estar no futuro.")
      .optional()
      .refine(
        (data) => {
          if (userRole === "STUDENT" && !data) {
            return false;
          }
          return true;
        },
        { message: "Data de início é obrigatória para estudantes." }
      ),
    duration: z
      .string({
        required_error: "É necessário informar uma duração.",
      })
      .refine((data) => {
        const duration = parseInt(data);
        return !isNaN(duration) && duration >= 30 && duration <= 180;
      }, "Duração deve ser um número inteiro positivo maior ou igual a 30 e menor ou igual a 180."),
  });
};
