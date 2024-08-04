import { FieldErrors, FieldValues } from "react-hook-form";

export interface FormControl<T extends FieldValues> {
  errors: FieldErrors<T>;
}
