import { Select } from "@/components/Select/Select";
import { PaperStatusValues } from "@/interfaces/Paper";
import { FilterIcon } from "lucide-react";
import React from "react";

export interface ProfessorStatusFilterProps {
  onChange: (value: string) => void;
}

export const ProfessorStatusFilter = ({
  onChange,
}: ProfessorStatusFilterProps) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

  const statuses = [
    { value: PaperStatusValues.approved, label: "Aprovado" },
    { value: PaperStatusValues.rejected, label: "Rejeitado" },
    { value: PaperStatusValues.waiting, label: "Pendente" },
    { value: PaperStatusValues.ongoing, label: "Em andamento" },
  ];
  return (
    <div className="flex items-center justify-center gap-2">
      <span>Status</span>
      <Select
        data={statuses}
        trigger={<FilterIcon className="w-4 h-4" />}
        triggerClassName="p-0 h-4 border-none bg-transparent max-w-8"
        value={selectedStatus}
        onChange={(value) => {
          let valueToSet = value;
          setSelectedStatus((currentValue) => {
            if (value === currentValue) {
              valueToSet = "";
            }
            return valueToSet;
          });
          onChange(valueToSet);
        }}
        placeholder="Filtrar por status"
      />
    </div>
  );
};
